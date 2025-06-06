import React, { useState } from "react";
import DesignMode from "./DesignMode";
import RenderMode from "./RenderMode";
import { Paper } from "@mui/material";
import { ScreenDesign, Design } from "../types/design";
import designJson from "../data/customerMasterDesign.json";

interface Props {
  mode: "design" | "render";
}

const MaterialCustomerMaster: React.FC<Props> = ({ mode }) => {
  const [design, setDesign] = useState<ScreenDesign>(designJson as ScreenDesign);

  const designForDesignMode: Design = {
    title: design.screenTitle,
    panels: design.panels
  };

  return (
    <Paper style={{ padding: 24 }}>
      {mode === "design" ? (
        <DesignMode
          design={designForDesignMode}
          uiLib="material"
          onFieldTypeChange={(fieldId, newType) => {
            setDesign(prev => ({
              ...prev,
              panels: prev.panels.map(panel => ({
                ...panel,
                fields: panel.fields.map(field =>
                  field.id === fieldId ? { ...field, type: newType } : field
                )
              }))
            }));
          }}
          onTabOrderChange={(fieldId, newTabOrder) => {
            setDesign(prev => ({
              ...prev,
              panels: prev.panels.map(panel => ({
                ...panel,
                fields: panel.fields.map(field =>
                  field.id === fieldId ? { ...field, tabOrder: newTabOrder } : field
                )
              }))
            }));
          }}
          onFieldDragDrop={(fieldId, sourcePanelId, targetPanelId, newTabOrder) => {
            setDesign(prev => {
              const sourcePanel = prev.panels.find(p => p.id === sourcePanelId);
              const targetPanel = prev.panels.find(p => p.id === targetPanelId);
              if (!sourcePanel || !targetPanel) return prev;
              const field = sourcePanel.fields.find(f => f.id === fieldId);
              if (!field) return prev;
              return {
                ...prev,
                panels: prev.panels.map(panel => {
                  if (panel.id === sourcePanelId) {
                    return { ...panel, fields: panel.fields.filter(f => f.id !== fieldId) };
                  }
                  if (panel.id === targetPanelId) {
                    const newFields = [...panel.fields];
                    newFields.splice(newTabOrder - 1, 0, { ...field, tabOrder: newTabOrder });
                    return { ...panel, fields: newFields.map((f, i) => ({ ...f, tabOrder: i + 1 })) };
                  }
                  return panel;
                })
              };
            });
          }}
          onToggleFieldVisibility={(panelId, fieldId) => {
            setDesign(prev => ({
              ...prev,
              panels: prev.panels.map(panel =>
                panel.id === panelId
                  ? { ...panel, fields: panel.fields.map(field =>
                      field.id === fieldId ? { ...field, visible: !field.visible } : field
                    )}
                  : panel
              )
            }));
          }}
        />
      ) : (
        <RenderMode
          design={design}
          uiLib="material"
        />
      )}
    </Paper>
  );
};

export default MaterialCustomerMaster; 