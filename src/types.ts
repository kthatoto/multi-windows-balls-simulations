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
  size: Size;
  main: boolean;
}

export interface Windows {
  [id: string]: Window;
}

export interface Ball {
  id: string;
  radius: number;
  pos: Vector;
  velocity: Vector;
}
