import {
  IndoorGISData,
  IndoorLevelData,
  IndoorRoom,
  LEVEL_ORDER,
  LevelCode,
  XYCoordinate,
  loadIndoorGISData,
} from './indoorGISData';

type GraphEdge = {
  key: string;
  node: XYCoordinate;
  weight: number;
};

type GraphAdjacency = Map<string, GraphEdge[]>;

interface RouteGraph {
  adjacency: GraphAdjacency;
  nodes: Map<string, XYCoordinate>;
}

interface PriorityNode<T> {
  value: T;
  priority: number;
}

export type FacilityMode = 'stairs' | 'elevator';

export interface RouteSegmentResult {
  levelCode: LevelCode;
  fromPlaceNode: number;
  toPlaceNode: number;
  pathXY: XYCoordinate[];
  leafletPath: [number, number][];
  distance: number;
}

export interface RouteResult {
  type: 'same-level' | 'multi-level';
  totalDistance: number;
  segments: RouteSegmentResult[];
  transfer?: {
    fromLevel: LevelCode;
    toLevel: LevelCode;
    facilityName: string;
    facilityType: string;
    originFacilityPlaceNode: number;
    destinationFacilityPlaceNode: number;
  };
}

const ROUNDING_PRECISION = 10_000;

const roundCoord = (value: number): number => Math.round(value * ROUNDING_PRECISION) / ROUNDING_PRECISION;

const normalizeCoord = (coord: XYCoordinate): XYCoordinate => [roundCoord(coord[0]), roundCoord(coord[1])];

const coordKey = (coord: XYCoordinate): string => {
  const normalized = normalizeCoord(coord);
  return `${normalized[0]},${normalized[1]}`;
};

const euclideanDistance = (a: XYCoordinate, b: XYCoordinate): number => {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return Math.sqrt(dx * dx + dy * dy);
};

class MinPriorityQueue<T> {
  private heap: PriorityNode<T>[] = [];

  push(value: T, priority: number): void {
    this.heap.push({ value, priority });
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): PriorityNode<T> | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }

    const first = this.heap[0];
    const last = this.heap.pop();
    if (last && this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }

    return first;
  }

  get size(): number {
    return this.heap.length;
  }

  private bubbleUp(index: number): void {
    let current = index;
    while (current > 0) {
      const parent = Math.floor((current - 1) / 2);
      if (this.heap[parent].priority <= this.heap[current].priority) {
        break;
      }
      [this.heap[parent], this.heap[current]] = [this.heap[current], this.heap[parent]];
      current = parent;
    }
  }

  private bubbleDown(index: number): void {
    let current = index;
    while (true) {
      const left = current * 2 + 1;
      const right = current * 2 + 2;
      let smallest = current;

      if (left < this.heap.length && this.heap[left].priority < this.heap[smallest].priority) {
        smallest = left;
      }

      if (right < this.heap.length && this.heap[right].priority < this.heap[smallest].priority) {
        smallest = right;
      }

      if (smallest === current) {
        break;
      }

      [this.heap[current], this.heap[smallest]] = [this.heap[smallest], this.heap[current]];
      current = smallest;
    }
  }
}

const buildGraphFromLevelRoutes = (levelData: IndoorLevelData): RouteGraph => {
  const adjacency: GraphAdjacency = new Map();
  const nodes = new Map<string, XYCoordinate>();

  const addNode = (coord: XYCoordinate): string => {
    const normalized = normalizeCoord(coord);
    const key = coordKey(normalized);
    if (!adjacency.has(key)) {
      adjacency.set(key, []);
      nodes.set(key, normalized);
    }
    return key;
  };

  const addEdge = (from: XYCoordinate, to: XYCoordinate): void => {
    const fromKey = addNode(from);
    const toKey = addNode(to);
    const fromNode = nodes.get(fromKey);
    const toNode = nodes.get(toKey);

    if (!fromNode || !toNode) {
      return;
    }

    const weight = euclideanDistance(fromNode, toNode);
    adjacency.get(fromKey)?.push({ key: toKey, node: toNode, weight });
    adjacency.get(toKey)?.push({ key: fromKey, node: fromNode, weight });
  };

  levelData.routes.forEach((routeFeature) => {
    routeFeature.segments.forEach((line) => {
      if (line.length < 2) {
        return;
      }

      for (let i = 0; i < line.length - 1; i += 1) {
        addEdge(line[i], line[i + 1]);
      }
    });
  });

  return { adjacency, nodes };
};

const reconstructPath = (cameFrom: Map<string, string>, currentKey: string, nodes: Map<string, XYCoordinate>): XYCoordinate[] => {
  const path: XYCoordinate[] = [];
  let cursor: string | undefined = currentKey;

  while (cursor) {
    const node = nodes.get(cursor);
    if (node) {
      path.push(node);
    }
    cursor = cameFrom.get(cursor);
  }

  return path.reverse();
};

const calculatePathDistance = (path: XYCoordinate[]): number => {
  if (path.length < 2) {
    return 0;
  }

  let distance = 0;
  for (let i = 0; i < path.length - 1; i += 1) {
    distance += euclideanDistance(path[i], path[i + 1]);
  }
  return distance;
};

const toLeafletPath = (path: XYCoordinate[]): [number, number][] =>
  path.map(([x, y]) => [y, x]);

const startsWithIgnoreCase = (value: string, prefix: string): boolean =>
  value.trim().toLowerCase().startsWith(prefix.trim().toLowerCase());

export class IndoorRoutingEngine {
  private readonly graphs: Record<LevelCode, RouteGraph>;
  private readonly data: IndoorGISData;

  private constructor(data: IndoorGISData) {
    this.data = data;
    this.graphs = {
      E: buildGraphFromLevelRoutes(data.levels.E),
      D: buildGraphFromLevelRoutes(data.levels.D),
      C: buildGraphFromLevelRoutes(data.levels.C),
      B: buildGraphFromLevelRoutes(data.levels.B),
    };
  }

  static async create(): Promise<IndoorRoutingEngine> {
    const data = await loadIndoorGISData();
    return new IndoorRoutingEngine(data);
  }

  getRoomById(roomId: string): IndoorRoom | undefined {
    return this.data.allRooms.find((room) => room.id === roomId);
  }

  getRoomsForLevel(levelCode: LevelCode): IndoorRoom[] {
    return this.data.levels[levelCode].rooms;
  }

  findNearestFacility(levelCode: LevelCode, originPlaceNode: number, mode: FacilityMode): IndoorRoom | null {
    const level = this.data.levels[levelCode];
    const facilityPrefix = mode === 'stairs' ? 'steps' : 'lift';

    const candidates = level.rooms.filter((room) => startsWithIgnoreCase(room.placeType, facilityPrefix));
    if (candidates.length === 0) {
      return null;
    }

    let bestRoom: IndoorRoom | null = null;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (const candidate of candidates) {
      const path = this.findPathByPlaceNodes(levelCode, originPlaceNode, candidate.placeNode);
      if (!path || path.length === 0) {
        continue;
      }

      const distance = calculatePathDistance(path);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestRoom = candidate;
      }
    }

    return bestRoom;
  }

  routeByRoomIds(fromRoomId: string, toRoomId: string, mode: FacilityMode = 'stairs'): RouteResult | null {
    const origin = this.getRoomById(fromRoomId);
    const destination = this.getRoomById(toRoomId);
    if (!origin || !destination) {
      return null;
    }
    return this.routeByRooms(origin, destination, mode);
  }

  routeByRooms(origin: IndoorRoom, destination: IndoorRoom, mode: FacilityMode = 'stairs'): RouteResult | null {
    if (origin.levelCode === destination.levelCode) {
      const path = this.findPathByPlaceNodes(origin.levelCode, origin.placeNode, destination.placeNode);
      if (!path || path.length === 0) {
        return null;
      }

      const segment: RouteSegmentResult = {
        levelCode: origin.levelCode,
        fromPlaceNode: origin.placeNode,
        toPlaceNode: destination.placeNode,
        pathXY: path,
        leafletPath: toLeafletPath(path),
        distance: calculatePathDistance(path),
      };

      return {
        type: 'same-level',
        totalDistance: segment.distance,
        segments: [segment],
      };
    }

    const originFacility = this.findNearestFacility(origin.levelCode, origin.placeNode, mode);
    if (!originFacility) {
      return null;
    }

    const destinationCandidates = this.data.levels[destination.levelCode].rooms.filter(
      (room) => startsWithIgnoreCase(room.placeType, mode === 'stairs' ? 'steps' : 'lift'),
    );

    const matchingDestinationFacility = destinationCandidates.find(
      (room) => normalizeFacilityName(room.placeName) === normalizeFacilityName(originFacility.placeName),
    );

    const destinationFacility = matchingDestinationFacility
      ?? this.findNearestFacility(destination.levelCode, destination.placeNode, mode);

    if (!destinationFacility) {
      return null;
    }

    const firstPath = this.findPathByPlaceNodes(origin.levelCode, origin.placeNode, originFacility.placeNode);
    const secondPath = this.findPathByPlaceNodes(destination.levelCode, destinationFacility.placeNode, destination.placeNode);

    if (!firstPath || !secondPath || firstPath.length === 0 || secondPath.length === 0) {
      return null;
    }

    const firstSegment: RouteSegmentResult = {
      levelCode: origin.levelCode,
      fromPlaceNode: origin.placeNode,
      toPlaceNode: originFacility.placeNode,
      pathXY: firstPath,
      leafletPath: toLeafletPath(firstPath),
      distance: calculatePathDistance(firstPath),
    };

    const secondSegment: RouteSegmentResult = {
      levelCode: destination.levelCode,
      fromPlaceNode: destinationFacility.placeNode,
      toPlaceNode: destination.placeNode,
      pathXY: secondPath,
      leafletPath: toLeafletPath(secondPath),
      distance: calculatePathDistance(secondPath),
    };

    return {
      type: 'multi-level',
      totalDistance: firstSegment.distance + secondSegment.distance,
      segments: [firstSegment, secondSegment],
      transfer: {
        fromLevel: origin.levelCode,
        toLevel: destination.levelCode,
        facilityName: destinationFacility.placeName || destinationFacility.personName || 'Connector',
        facilityType: destinationFacility.placeType,
        originFacilityPlaceNode: originFacility.placeNode,
        destinationFacilityPlaceNode: destinationFacility.placeNode,
      },
    };
  }

  routeBetweenPlaceNodes(levelCode: LevelCode, fromPlaceNode: number, toPlaceNode: number): [number, number][] | null {
    const path = this.findPathByPlaceNodes(levelCode, fromPlaceNode, toPlaceNode);
    if (!path || path.length === 0) {
      return null;
    }
    return toLeafletPath(path);
  }

  private getClosestGraphNode(levelCode: LevelCode, point: XYCoordinate): XYCoordinate | null {
    const graph = this.graphs[levelCode];
    const normalized = normalizeCoord(point);
    const directKey = coordKey(normalized);
    const directNode = graph.nodes.get(directKey);
    if (directNode) {
      return directNode;
    }

    let closest: XYCoordinate | null = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    graph.nodes.forEach((node) => {
      const distance = euclideanDistance(node, normalized);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = node;
      }
    });

    return closest;
  }

  private findPathByPlaceNodes(levelCode: LevelCode, fromPlaceNode: number, toPlaceNode: number): XYCoordinate[] | null {
    const level = this.data.levels[levelCode];
    const startCoord = level.placeNodeToCoordinate.get(fromPlaceNode);
    const endCoord = level.placeNodeToCoordinate.get(toPlaceNode);
    if (!startCoord || !endCoord) {
      return null;
    }

    const startNode = this.getClosestGraphNode(levelCode, startCoord);
    const endNode = this.getClosestGraphNode(levelCode, endCoord);
    if (!startNode || !endNode) {
      return null;
    }

    return this.aStar(levelCode, startNode, endNode);
  }

  private aStar(levelCode: LevelCode, start: XYCoordinate, goal: XYCoordinate): XYCoordinate[] | null {
    const graph = this.graphs[levelCode];
    const startKey = coordKey(start);
    const goalKey = coordKey(goal);

    if (!graph.nodes.has(startKey) || !graph.nodes.has(goalKey)) {
      return null;
    }

    const openSet = new MinPriorityQueue<string>();
    openSet.push(startKey, 0);

    const cameFrom = new Map<string, string>();
    const gScore = new Map<string, number>([[startKey, 0]]);
    const fScore = new Map<string, number>([[startKey, euclideanDistance(start, goal)]]);
    const visited = new Set<string>();

    while (openSet.size > 0) {
      const current = openSet.pop();
      if (!current) {
        break;
      }

      const currentKey = current.value;
      if (visited.has(currentKey)) {
        continue;
      }

      if (currentKey === goalKey) {
        return reconstructPath(cameFrom, currentKey, graph.nodes);
      }

      visited.add(currentKey);
      const currentG = gScore.get(currentKey) ?? Number.POSITIVE_INFINITY;
      const neighbors = graph.adjacency.get(currentKey) ?? [];

      for (const neighbor of neighbors) {
        if (visited.has(neighbor.key)) {
          continue;
        }

        const tentativeG = currentG + neighbor.weight;
        const knownG = gScore.get(neighbor.key) ?? Number.POSITIVE_INFINITY;

        if (tentativeG < knownG) {
          cameFrom.set(neighbor.key, currentKey);
          gScore.set(neighbor.key, tentativeG);
          const goalNode = graph.nodes.get(goalKey);
          if (!goalNode) {
            continue;
          }
          const candidateF = tentativeG + euclideanDistance(neighbor.node, goalNode);
          fScore.set(neighbor.key, candidateF);
          openSet.push(neighbor.key, candidateF);
        }
      }
    }

    return null;
  }
}

const normalizeFacilityName = (value: string): string => value.trim().toLowerCase().replace(/\s+/g, ' ');

let cachedEnginePromise: Promise<IndoorRoutingEngine> | null = null;

export const getRoutingEngine = async (): Promise<IndoorRoutingEngine> => {
  if (!cachedEnginePromise) {
    cachedEnginePromise = IndoorRoutingEngine.create();
  }
  return cachedEnginePromise;
};

export const clearRoutingEngineCache = (): void => {
  cachedEnginePromise = null;
};

export const levelOrderForRouting: LevelCode[] = LEVEL_ORDER;
