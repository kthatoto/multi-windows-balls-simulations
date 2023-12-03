export interface Vector {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Window {
  id: string;
  pos: Vector;
  size: {
    outer: Size;
    inner: Size;
  };
  main: 0 | 1;
  collisionIds: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Ball {
  id: string;
  radius: number;
  pos: Vector;
  velocity: Vector;
  createdAt: number;
  updatedAt: number;
  currentWindowId?: string;
}
