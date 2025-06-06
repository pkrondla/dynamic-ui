import React from "react";
import { Design, FieldType, PanelConfig, FieldConfig } from "../types/design";
import Panel from "./Panel";

interface Props {
  design: Design;
  uiLib: "material" | "antd";
  onFieldTypeChange: (fieldId: string, newType: FieldType) => void;
  onTabOrderChange: (fieldId: string, newTabOrder: number) => void;
  onFieldDragDrop: (
    fieldId: string,
    sourcePanelId: string,
    targetPanelId: string,
    newTabOrder: number
  ) => void;
  onToggleFieldVisibility: (panelId: string, fieldId: string) => void;
  onOpenProperties?: (field: FieldConfig) => void;
}

const DesignMode: React.FC<Props> = ({
  design,
  uiLib,
  onFieldTypeChange,
  onTabOrderChange,
  onFieldDragDrop,
  onToggleFieldVisibility,
  onOpenProperties,
}) => {

  // Group panels by row and sort fields within each panel
  const panelsByRow = design.panels.reduce((acc, panel) => {
    const row = panel.layout.row;
    if (!acc[row]) {
      acc[row] = [];
    }
    // Sort fields within the panel by tabOrder
    const sortedFields = [...panel.fields].sort((a, b) => a.tabOrder - b.tabOrder);
    acc[row].push({ ...panel, fields: sortedFields });
    return acc;
  }, {} as Record<number, typeof design.panels>);

  // Sort panels within each row by order
  Object.keys(panelsByRow).forEach(row => {
    panelsByRow[Number(row)].sort((a, b) => a.layout.order - b.layout.order);
  });

  return (
    <div>
      <h2>Design Mode</h2>
      {/* Render panels and fields based on sorted layout */}
      {Object.entries(panelsByRow).map(([row, panels]) => (
        <div key={row} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          {panels.map((panel: PanelConfig) => (
            <div key={panel.id} style={{ flex: `${panel.layout.width}%` }}>
               <Panel
                key={panel.id}
                panel={panel}
                uiLib={uiLib}
                isDesignMode={true}
                onFieldTypeChange={onFieldTypeChange}
                onTabOrderChange={onTabOrderChange}
                onFieldDragDrop={onFieldDragDrop}
                onToggleFieldVisibility={onToggleFieldVisibility}
                onOpenProperties={onOpenProperties}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DesignMode; 