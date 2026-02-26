export type LevelCode = 'E' | 'D' | 'C' | 'B';

export const LEVEL_ORDER: LevelCode[] = ['E', 'D', 'C', 'B'];

export const LEVEL_INDEX_BY_CODE: Record<LevelCode, number> = {
  E: 0,
  D: 1,
  C: 2,
  B: 3,
};

export const LEVEL_LABELS: Record<LevelCode, string> = {
  E: 'E Level',
  D: 'D Level',
  C: 'C Level',
  B: 'B Level',
};

export type XYCoordinate = [number, number];
export type PolygonRing = XYCoordinate[];
export type PolygonCoordinates = PolygonRing[];

interface GeoJSONFeatureCollection<TProperties, TGeometry> {
  type: 'FeatureCollection';
  features: Array<GeoJSONFeature<TProperties, TGeometry>>;
}

interface GeoJSONFeature<TProperties, TGeometry> {
  type: 'Feature';
  properties: TProperties;
  geometry: TGeometry | null;
}

interface PointGeometry {
  type: 'Point';
  coordinates: XYCoordinate;
}

interface LineStringGeometry {
  type: 'LineString';
  coordinates: XYCoordinate[];
}

interface MultiLineStringGeometry {
  type: 'MultiLineString';
  coordinates: XYCoordinate[][];
}

interface PolygonGeometry {
  type: 'Polygon';
  coordinates: PolygonCoordinates;
}

interface MultiPolygonGeometry {
  type: 'MultiPolygon';
  coordinates: PolygonCoordinates[];
}

export interface BlockProperties {
  OBJECTID: number;
  PlaceNode: number;
  PlaceName: string;
  PersonName: string;
  Contact: string;
  Email: string;
  Details: string;
  PlaceType: string;
}

export interface PlaceProperties {
  OBJECTID: number;
  PlaceNode: number;
}

export interface RouteProperties {
  OBJECTID: number;
  SHAPE_Leng: number;
}

export interface IndoorRoom {
  id: string;
  levelCode: LevelCode;
  levelIndex: number;
  objectId: number;
  placeNode: number;
  placeName: string;
  personName: string;
  contact: string;
  email: string;
  details: string;
  placeType: string;
  searchText: string;
  geometry: PolygonCoordinates[];
}

export interface IndoorBlockFeature {
  levelCode: LevelCode;
  properties: BlockProperties;
  geometry: PolygonCoordinates[];
}

export interface IndoorPlaceFeature {
  levelCode: LevelCode;
  properties: PlaceProperties;
  coordinate: XYCoordinate;
}

export interface IndoorRouteFeature {
  levelCode: LevelCode;
  properties: RouteProperties;
  segments: XYCoordinate[][];
}

export interface IndoorLevelData {
  levelCode: LevelCode;
  levelIndex: number;
  blocks: IndoorBlockFeature[];
  places: IndoorPlaceFeature[];
  routes: IndoorRouteFeature[];
  rooms: IndoorRoom[];
  placeNodeToCoordinate: Map<number, XYCoordinate>;
  placeNodeToRoom: Map<number, IndoorRoom>;
}

export interface RoomSearchEntry {
  roomId: string;
  levelCode: LevelCode;
  placeNode: number;
  searchText: string;
  room: IndoorRoom;
}

export interface RoomSearchIndex {
  entries: RoomSearchEntry[];
  search: (query: string, limit?: number) => IndoorRoom[];
}

export interface IndoorGISData {
  levels: Record<LevelCode, IndoorLevelData>;
  allRooms: IndoorRoom[];
  roomSearchIndex: RoomSearchIndex;
}

type BlocksFeatureCollection = GeoJSONFeatureCollection<BlockProperties, PolygonGeometry | MultiPolygonGeometry>;
type PlacesFeatureCollection = GeoJSONFeatureCollection<PlaceProperties, PointGeometry>;
type RouteFeatureCollection = GeoJSONFeatureCollection<RouteProperties, LineStringGeometry | MultiLineStringGeometry>;

let cachedIndoorDataPromise: Promise<IndoorGISData> | null = null;

const normalizeText = (value: string): string => value.trim().toLowerCase();

const normalizeCoordinate = (coordinate: XYCoordinate): XYCoordinate => [
  Number(coordinate[0]),
  Number(coordinate[1]),
];

const asPolygonCoordinates = (
  geometry: PolygonGeometry | MultiPolygonGeometry | null,
): PolygonCoordinates[] => {
  if (!geometry) {
    return [];
  }

  if (geometry.type === 'Polygon') {
    return [geometry.coordinates.map((ring) => ring.map(normalizeCoordinate))];
  }

  return geometry.coordinates.map((polygon) => polygon.map((ring) => ring.map(normalizeCoordinate)));
};

const asRouteSegments = (
  geometry: LineStringGeometry | MultiLineStringGeometry | null,
): XYCoordinate[][] => {
  if (!geometry) {
    return [];
  }

  if (geometry.type === 'LineString') {
    return [geometry.coordinates.map(normalizeCoordinate)];
  }

  return geometry.coordinates.map((line) => line.map(normalizeCoordinate));
};

const fetchGeoJSON = async <T>(path: string): Promise<T> => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as T;
};

const createRoomId = (levelCode: LevelCode, objectId: number, placeNode: number): string =>
  `${levelCode}-${placeNode}-${objectId}`;

export const createRoomSearchIndex = (rooms: IndoorRoom[]): RoomSearchIndex => {
  const entries: RoomSearchEntry[] = rooms.map((room) => ({
    roomId: room.id,
    levelCode: room.levelCode,
    placeNode: room.placeNode,
    searchText: room.searchText,
    room,
  }));

  return {
    entries,
    search: (query: string, limit = 25) => {
      const normalized = normalizeText(query);
      if (!normalized) {
        return entries.slice(0, limit).map((entry) => entry.room);
      }

      const filtered = entries
        .filter((entry) => entry.searchText.includes(normalized))
        .sort((a, b) => {
          const aStarts = a.searchText.startsWith(normalized) ? 0 : 1;
          const bStarts = b.searchText.startsWith(normalized) ? 0 : 1;
          if (aStarts !== bStarts) {
            return aStarts - bStarts;
          }
          return a.room.placeName.localeCompare(b.room.placeName, undefined, { sensitivity: 'base' });
        });

      return filtered.slice(0, limit).map((entry) => entry.room);
    },
  };
};

const loadLevelData = async (levelCode: LevelCode): Promise<IndoorLevelData> => {
  const blocksPath = `/geojson/${levelCode}_Level_Blocks.geojson`;
  const placesPath = `/geojson/${levelCode}_Level_Places.geojson`;
  const routePath = `/geojson/${levelCode}_Level_Route.geojson`;

  const [blocksJson, placesJson, routeJson] = await Promise.all([
    fetchGeoJSON<BlocksFeatureCollection>(blocksPath),
    fetchGeoJSON<PlacesFeatureCollection>(placesPath),
    fetchGeoJSON<RouteFeatureCollection>(routePath),
  ]);

  const places: IndoorPlaceFeature[] = placesJson.features
    .filter((feature) => feature.geometry?.type === 'Point')
    .map((feature) => ({
      levelCode,
      properties: feature.properties,
      coordinate: normalizeCoordinate(feature.geometry.coordinates),
    }));

  const placeNodeToCoordinate = new Map<number, XYCoordinate>();
  places.forEach((place) => {
    placeNodeToCoordinate.set(place.properties.PlaceNode, place.coordinate);
  });

  const blocks: IndoorBlockFeature[] = blocksJson.features.map((feature) => ({
    levelCode,
    properties: feature.properties,
    geometry: asPolygonCoordinates(feature.geometry),
  }));

  const rooms: IndoorRoom[] = blocks
    .map((block) => {
      const placeName = block.properties.PlaceName?.trim() ?? '';
      const personName = block.properties.PersonName?.trim() ?? '';
      const details = block.properties.Details?.trim() ?? '';
      const placeType = block.properties.PlaceType?.trim() ?? '';
      const objectId = Number(block.properties.OBJECTID);
      const placeNode = Number(block.properties.PlaceNode);
      const levelIndex = LEVEL_INDEX_BY_CODE[levelCode];

      return {
        id: createRoomId(levelCode, objectId, placeNode),
        levelCode,
        levelIndex,
        objectId,
        placeNode,
        placeName,
        personName,
        contact: block.properties.Contact?.trim() ?? '',
        email: block.properties.Email?.trim() ?? '',
        details,
        placeType,
        geometry: block.geometry,
        searchText: normalizeText([placeName, personName].filter(Boolean).join(' ')),
      };
    })
    .filter((room) => room.placeName || room.personName);

  const placeNodeToRoom = new Map<number, IndoorRoom>();
  rooms.forEach((room) => {
    if (!placeNodeToRoom.has(room.placeNode)) {
      placeNodeToRoom.set(room.placeNode, room);
    }
  });

  const routes: IndoorRouteFeature[] = routeJson.features
    .map((feature) => ({
      levelCode,
      properties: {
        OBJECTID: Number(feature.properties.OBJECTID),
        SHAPE_Leng: Number(feature.properties.SHAPE_Leng),
      },
      segments: asRouteSegments(feature.geometry),
    }))
    .filter((feature) => feature.segments.length > 0);

  return {
    levelCode,
    levelIndex: LEVEL_INDEX_BY_CODE[levelCode],
    blocks,
    places,
    routes,
    rooms,
    placeNodeToCoordinate,
    placeNodeToRoom,
  };
};

export const loadIndoorGISData = async (): Promise<IndoorGISData> => {
  if (!cachedIndoorDataPromise) {
    cachedIndoorDataPromise = (async () => {
      const levelEntries = await Promise.all(LEVEL_ORDER.map(async (levelCode) => [levelCode, await loadLevelData(levelCode)] as const));

      const levels = Object.fromEntries(levelEntries) as Record<LevelCode, IndoorLevelData>;
      const allRooms = LEVEL_ORDER.flatMap((levelCode) => levels[levelCode].rooms);
      const roomSearchIndex = createRoomSearchIndex(allRooms);

      return {
        levels,
        allRooms,
        roomSearchIndex,
      };
    })();
  }

  return cachedIndoorDataPromise;
};

export const getAllRooms = async (): Promise<IndoorRoom[]> => {
  const data = await loadIndoorGISData();
  return data.allRooms;
};

export const getLevelCodeByIndex = (levelIndex: number): LevelCode | undefined =>
  LEVEL_ORDER.find((levelCode) => LEVEL_INDEX_BY_CODE[levelCode] === levelIndex);

export const getLevelDataByIndex = async (levelIndex: number): Promise<IndoorLevelData | undefined> => {
  const code = getLevelCodeByIndex(levelIndex);
  if (!code) {
    return undefined;
  }

  const data = await loadIndoorGISData();
  return data.levels[code];
};

export const resetIndoorGISDataCache = (): void => {
  cachedIndoorDataPromise = null;
};
