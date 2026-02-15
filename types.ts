export enum TabType {
  I = 'I',
  LOVE = 'LOVE',
  YOU = 'YOU'
}

export interface PhotoItem {
  id: number;
  src: string;
  caption: string;
}

export interface FallingItem {
  id: number;
  x: number; // percentage 0-100
  delay: number;
  duration: number;
  scale: number;
  rotation: number;
  type: 'note' | 'heart' | 'mix';
}
