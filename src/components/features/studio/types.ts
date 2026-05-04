export type DrawingTool = 'cursor' | 'pen' | 'highlighter' | 'eraser' | 'shape' | 'text';
export type ShapeType  = 'rect' | 'circle' | 'line' | 'arrow';

// ── Object model ──────────────────────────────────────────────────────────────

export interface StrokeObject {
  id: string;
  type: 'stroke';
  tool: 'pen' | 'highlighter' | 'eraser';
  color: string;
  size: number;
  points: { x: number; y: number }[];
}

export interface ShapeObject {
  id: string;
  type: 'shape';
  shape: ShapeType;
  shapeStyle: 'outline' | 'filled';
  color: string;
  size: number;
  x1: number; y1: number;
  x2: number; y2: number;
}

export interface TextObject {
  id: string;
  type: 'text';
  text: string;
  color: string;
  fontSize: number;
  fontBold: boolean;
  fontItalic: boolean;
  x: number; y: number;
}

export type DrawingObject = StrokeObject | ShapeObject | TextObject;

// ── Tool options ──────────────────────────────────────────────────────────────

export interface DrawingOptions {
  tool:        DrawingTool;
  color:       string;
  size:        number;
  shape:       ShapeType;
  shapeStyle:  'outline' | 'filled';
  fontSize:    number;
  fontBold:    boolean;
  fontItalic:  boolean;
}

export interface CameraPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface CameraBackground {
  type: 'color' | 'image';
  value: string; // renk için hex, görsel için boş
  imageEl?: HTMLImageElement;
  src?: string;  // revoke için blob URL
}

export interface OverlayImage {
  id: string;
  imageEl: HTMLImageElement;
  src: string; // blob URL
  position: { x: number; y: number; w: number; h: number };
}
