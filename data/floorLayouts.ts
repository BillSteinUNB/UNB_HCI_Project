export interface RoomSVGData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  labelSize?: 'sm' | 'md' | 'lg';
}

export interface FloorLayout {
  viewBox: string;
  rooms: RoomSVGData[];
  hallways: { x: number; y: number; width: number; height: number }[];
  youAreHere?: { x: number; y: number };
}

export const FLOOR_LAYOUTS: Record<string, FloorLayout> = {
  B: {
    viewBox: '0 0 1200 600',
    hallways: [
      { x: 100, y: 250, width: 1000, height: 100 },
      { x: 560, y: 100, width: 80, height: 400 },
    ],
    rooms: [
      { id: 'b8', x: 120, y: 140, width: 120, height: 80 },
      { id: 'b17', x: 280, y: 140, width: 120, height: 80 },
      { id: 'b24', x: 440, y: 140, width: 120, height: 80 },
      { id: 'itb213', x: 640, y: 120, width: 170, height: 100 },
      { id: 'itb214', x: 840, y: 120, width: 170, height: 100 },
      { id: 'itb217', x: 120, y: 380, width: 170, height: 100 },
      { id: 'itb222', x: 320, y: 380, width: 170, height: 100 },
      { id: 'itb215', x: 560, y: 390, width: 140, height: 80 },
    ],
  },

  C: {
    viewBox: '0 0 1400 900',
    youAreHere: { x: 700, y: 450 },
    hallways: [
      { x: 120, y: 360, width: 1160, height: 100 },
      { x: 640, y: 120, width: 100, height: 660 },
      { x: 220, y: 620, width: 940, height: 90 },
    ],
    rooms: [
      { id: 'c307', x: 120, y: 120, width: 110, height: 70 },
      { id: 'c314', x: 250, y: 120, width: 110, height: 70 },
      { id: 'c315', x: 380, y: 120, width: 110, height: 70 },
      { id: 'c317', x: 510, y: 120, width: 110, height: 70 },
      { id: 'c127a', x: 780, y: 120, width: 90, height: 60, labelSize: 'sm' },
      { id: 'c127', x: 890, y: 120, width: 100, height: 60 },
      { id: 'c122', x: 1010, y: 120, width: 110, height: 60 },
      { id: 'c112', x: 1140, y: 120, width: 110, height: 60 },
      { id: 'c111', x: 120, y: 210, width: 110, height: 70 },
      { id: 'c9', x: 250, y: 210, width: 90, height: 60 },
      { id: 'c10', x: 360, y: 210, width: 90, height: 60 },
      { id: 'c11', x: 470, y: 210, width: 90, height: 60 },
      { id: 'c13', x: 580, y: 210, width: 90, height: 60 },
      { id: 'c24', x: 780, y: 210, width: 95, height: 60 },
      { id: 'c25', x: 895, y: 210, width: 95, height: 60 },
      { id: 'c28', x: 1010, y: 210, width: 95, height: 60 },
      { id: 'readingroom', x: 1130, y: 210, width: 160, height: 80, labelSize: 'sm' },
      { id: 'studyhall', x: 1120, y: 620, width: 200, height: 90, labelSize: 'sm' },
      { id: 'c124', x: 980, y: 620, width: 130, height: 80 },
      { id: 'csoffice', x: 860, y: 620, width: 105, height: 70, labelSize: 'sm' },
      { id: 'c123', x: 740, y: 620, width: 110, height: 70 },
      { id: 'deanoffice', x: 620, y: 620, width: 110, height: 70, labelSize: 'sm' },
      { id: 'itc304', x: 120, y: 620, width: 100, height: 70 },
      { id: 'itc307', x: 230, y: 620, width: 105, height: 70 },
      { id: 'itc314', x: 345, y: 620, width: 95, height: 70 },
      { id: 'itc315', x: 450, y: 620, width: 95, height: 70 },
      { id: 'itc316', x: 555, y: 620, width: 80, height: 70, labelSize: 'sm' },
      { id: 'itc317', x: 120, y: 720, width: 150, height: 80 },
      { id: 'itc318', x: 285, y: 720, width: 90, height: 70 },
      { id: 'itc319', x: 385, y: 720, width: 90, height: 70 },
      { id: 'itc320', x: 485, y: 720, width: 90, height: 70 },
      { id: 'itc321', x: 585, y: 720, width: 90, height: 70 },
      { id: 'itc322', x: 685, y: 720, width: 90, height: 70 },
      { id: 'itc323', x: 785, y: 720, width: 100, height: 70 },
      { id: 'itd405', x: 1140, y: 300, width: 140, height: 75 },
      { id: 'itd414', x: 1140, y: 390, width: 180, height: 90 },
      { id: 'itd415', x: 1140, y: 490, width: 180, height: 90 },
      { id: 'itd418', x: 1140, y: 590, width: 90, height: 70 },
      { id: 'itd419', x: 1240, y: 590, width: 90, height: 70 },
      { id: 'itd420', x: 1140, y: 670, width: 90, height: 70 },
      { id: 'itd421', x: 1240, y: 670, width: 90, height: 70 },
      { id: 'itd422', x: 1140, y: 750, width: 90, height: 70 },
      { id: 'itd423', x: 1240, y: 750, width: 90, height: 70 },
    ],
  },

  D: {
    viewBox: '0 0 1200 700',
    hallways: [
      { x: 120, y: 300, width: 960, height: 90 },
      { x: 560, y: 120, width: 90, height: 460 },
    ],
    rooms: [
      { id: 'd414', x: 120, y: 150, width: 120, height: 75 },
      { id: 'd415', x: 260, y: 150, width: 120, height: 75 },
      { id: 'd124a', x: 400, y: 150, width: 95, height: 70 },
      { id: 'd124', x: 510, y: 150, width: 110, height: 70 },
      { id: 'd110', x: 640, y: 150, width: 110, height: 70 },
      { id: 'd108', x: 770, y: 150, width: 110, height: 70 },
      { id: 'd118', x: 900, y: 150, width: 110, height: 70 },
      { id: 'd117', x: 120, y: 410, width: 110, height: 70 },
      { id: 'd33', x: 240, y: 410, width: 110, height: 70 },
      { id: 'd124old', x: 360, y: 410, width: 110, height: 70, labelSize: 'sm' },
      { id: 'd128old', x: 480, y: 410, width: 110, height: 70, labelSize: 'sm' },
      { id: 'd135old', x: 600, y: 410, width: 110, height: 70, labelSize: 'sm' },
      { id: 'headrest', x: 730, y: 400, width: 170, height: 85 },
      { id: 'itsreception', x: 920, y: 400, width: 150, height: 85, labelSize: 'sm' },
      { id: 'eceoffice', x: 560, y: 520, width: 95, height: 65, labelSize: 'sm' },
      { id: 'coopoffice', x: 660, y: 520, width: 95, height: 65, labelSize: 'sm' },
      { id: 'civiloffice', x: 760, y: 520, width: 95, height: 65, labelSize: 'sm' },
      { id: 'chemoffice', x: 860, y: 520, width: 95, height: 65, labelSize: 'sm' },
    ],
  },

  E: {
    viewBox: '0 0 1200 600',
    hallways: [
      { x: 140, y: 250, width: 920, height: 90 },
      { x: 540, y: 120, width: 90, height: 360 },
    ],
    rooms: [
      { id: 'e211', x: 150, y: 130, width: 120, height: 75 },
      { id: 'e214', x: 290, y: 130, width: 120, height: 75 },
      { id: 'e224', x: 430, y: 130, width: 120, height: 75 },
      { id: 'e225', x: 570, y: 130, width: 120, height: 75 },
      { id: 'e4', x: 710, y: 130, width: 110, height: 70 },
      { id: 'e11', x: 840, y: 130, width: 110, height: 70 },
      { id: 'cssquare', x: 150, y: 370, width: 190, height: 90, labelSize: 'sm' },
      { id: 'cic', x: 360, y: 370, width: 160, height: 85 },
      { id: 'tmeoffice', x: 540, y: 370, width: 110, height: 70, labelSize: 'sm' },
      { id: 'mechoffice', x: 670, y: 370, width: 120, height: 70, labelSize: 'sm' },
      { id: 'geomaticsoffice', x: 810, y: 370, width: 150, height: 70, labelSize: 'sm' },
    ],
  },
};
