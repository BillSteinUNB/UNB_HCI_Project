/**
 * Room hotspot positions for floor plan images.
 * Coordinates are percentages (0-100) relative to image dimensions.
 * This makes them scale-independent.
 */

export interface RoomHotspot {
  id: string;           // Matches MOCK_ROOMS id
  x: number;            // Left position as % of image width
  y: number;            // Top position as % of image height
  width: number;        // Width as % of image width
  height: number;       // Height as % of image height
}

export interface FloorImageConfig {
  imageSrc: string;                    // Path to floor plan image
  imageWidth: number;                  // Natural image width in pixels
  imageHeight: number;                 // Natural image height in pixels
  hotspots: RoomHotspot[];             // Clickable room regions
  youAreHere?: { x: number; y: number }; // "You Are Here" marker position (%)
}

/**
 * C-Level (First Floor) Configuration
 * 
 * Room positions are approximate and should be adjusted to match
 * the actual floor plan image. Use the browser dev tools to fine-tune
 * positions by hovering over rooms in the image.
 * 
 * The provided image shows a Gemini-generated floor plan with:
 * - Main entrance at southeast
 * - Central hallway running north-south
 * - Offices 101, 102 in northeast
 * - Conference room in northwest
 * - Server room in southwest
 * - Break room near center-south
 * - Restrooms in southeast
 */
export const FLOOR_IMAGE_CONFIGS: Record<string, FloorImageConfig> = {
  C: {
    imageSrc: '/floor-c.png',
    imageWidth: 1920,
    imageHeight: 2208,
    youAreHere: { x: 50, y: 80 }, // Near entrance
    hotspots: [
      // Main entrance / lobby area (southeast)
      { id: 'c-lobby', x: 70, y: 85, width: 15, height: 10 },
      
      // Offices in northeast (101, 102)
      { id: 'c127', x: 55, y: 10, width: 12, height: 8 },
      { id: 'c127a', x: 68, y: 10, width: 10, height: 8 },
      { id: 'c122', x: 80, y: 10, width: 12, height: 8 },
      
      // Classrooms along north side
      { id: 'c307', x: 8, y: 8, width: 12, height: 10 },
      { id: 'c314', x: 22, y: 8, width: 12, height: 10 },
      { id: 'c315', x: 36, y: 8, width: 12, height: 10 },
      
      // West side rooms
      { id: 'c111', x: 5, y: 25, width: 10, height: 12 },
      { id: 'c9', x: 5, y: 40, width: 10, height: 10 },
      { id: 'c10', x: 5, y: 52, width: 10, height: 10 },
      
      // Central area
      { id: 'c124', x: 60, y: 50, width: 12, height: 10 },
      { id: 'c123', x: 75, y: 50, width: 12, height: 10 },
      
      // ITC rooms (south side)
      { id: 'itc304', x: 8, y: 65, width: 12, height: 10 },
      { id: 'itc307', x: 22, y: 65, width: 12, height: 10 },
      { id: 'itc314', x: 36, y: 65, width: 12, height: 10 },
      { id: 'itc315', x: 50, y: 65, width: 12, height: 10 },
      
      // South side
      { id: 'csoffice', x: 55, y: 75, width: 12, height: 8 },
      { id: 'readingroom', x: 70, y: 75, width: 15, height: 10 },
      
      // Restrooms (southeast)
      { id: 'restroom-m', x: 85, y: 75, width: 8, height: 8 },
      { id: 'restroom-w', x: 85, y: 85, width: 8, height: 8 },
    ],
  },
  
  // Placeholder configs for other floors - will need actual images
  B: {
    imageSrc: '/floor-c.png', // Placeholder - need actual B-level image
    imageWidth: 1920,
    imageHeight: 2208,
    hotspots: [
      { id: 'b8', x: 10, y: 20, width: 15, height: 12 },
      { id: 'b17', x: 30, y: 20, width: 15, height: 12 },
      { id: 'b24', x: 50, y: 20, width: 15, height: 12 },
      { id: 'itb213', x: 70, y: 15, width: 18, height: 15 },
      { id: 'itb214', x: 70, y: 35, width: 18, height: 15 },
      { id: 'itb217', x: 10, y: 60, width: 18, height: 15 },
      { id: 'itb222', x: 35, y: 60, width: 18, height: 15 },
      { id: 'itb215', x: 60, y: 60, width: 15, height: 12 },
    ],
  },
  
  D: {
    imageSrc: '/floor-c.png', // Placeholder - need actual D-level image
    imageWidth: 1920,
    imageHeight: 2208,
    hotspots: [
      { id: 'itd405', x: 75, y: 30, width: 15, height: 10 },
      { id: 'itd414', x: 75, y: 45, width: 18, height: 12 },
      { id: 'itd415', x: 75, y: 60, width: 15, height: 10 },
      { id: 'itd418', x: 10, y: 25, width: 12, height: 10 },
      { id: 'itd419', x: 25, y: 25, width: 12, height: 10 },
      { id: 'itd420', x: 40, y: 25, width: 12, height: 10 },
      { id: 'itd421', x: 10, y: 45, width: 12, height: 10 },
      { id: 'itd422', x: 25, y: 45, width: 12, height: 10 },
      { id: 'itd423', x: 40, y: 45, width: 12, height: 10 },
    ],
  },
  
  E: {
    imageSrc: '/floor-c.png', // Placeholder - need actual E-level image
    imageWidth: 1920,
    imageHeight: 2208,
    hotspots: [
      { id: 'ite501', x: 10, y: 20, width: 15, height: 12 },
      { id: 'ite502', x: 30, y: 20, width: 15, height: 12 },
      { id: 'ite505', x: 50, y: 20, width: 15, height: 12 },
      { id: 'ite510', x: 70, y: 20, width: 15, height: 12 },
      { id: 'cs-square', x: 40, y: 50, width: 25, height: 20 },
      { id: 'cic', x: 70, y: 50, width: 18, height: 15 },
    ],
  },
};

/**
 * Get the floor image config for a given level.
 * Returns undefined if no config exists for that level.
 */
export function getFloorImageConfig(level: string): FloorImageConfig | undefined {
  return FLOOR_IMAGE_CONFIGS[level];
}
