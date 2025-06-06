export type FieldType = "text" | "textarea" | "number" | "date" | "select" | "checkbox";

export interface Field {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  visible?: boolean;
  tabOrder: number;
  options?: string[];
}

export interface Panel {
  id: string;
  title: string;
  fields: Field[];
  layout?: {
    width?: number;
    height?: number;
    position?: "left" | "right" | "top" | "bottom";
  };
}

export interface Design {
  title: string;
  panels: PanelConfig[];
}

export interface FieldConfig {
  id: string;
  label: string;
  visible: boolean;
  tabOrder: number;
  type: FieldType;
  required?: boolean;
  validation?: "email" | string;
  format?: "currency" | string;
  options?: string[];
}

export interface PanelLayout {
  width: number; // width in percentage (1-100)
  row: number;   // row number (1-based)
  order: number; // order within the row
}

export interface PanelConfig {
  id: string;
  title: string;
  fields: FieldConfig[];
  layout: PanelLayout;
}

export interface ScreenDesign {
  screenTitle: string;
  panels: PanelConfig[];
}

export interface DragDropField {
  fieldId: string;
  sourcePanelId: string;
  targetPanelId: string;
  newTabOrder: number;
} 