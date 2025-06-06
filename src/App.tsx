import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DesignMode from "./components/DesignMode";
import RenderMode from "./components/RenderMode";
import customerMasterDesign from "./data/customerMasterDesign.json";
import { ScreenDesign, PanelConfig, FieldConfig, FieldType } from "./types/design";
import FieldPropertiesDialog from "./components/FieldPropertiesDialog";
import "./App.css";

function App() {
  const [design, setDesign] = React.useState<ScreenDesign>(customerMasterDesign as ScreenDesign);
  const [uiLib, setUiLib] = React.useState<"material" | "antd">("material");
  const [isDesignMode, setIsDesignMode] = React.useState(false);
  const [isPropertiesDialogOpen, setIsPropertiesDialogOpen] = React.useState(false);
  const [editingField, setEditingField] = React.useState<FieldConfig | null>(null);

  console.log('App Rendered', { isDesignMode, isPropertiesDialogOpen, editingField });

  const handleFieldTypeChange = (fieldId: string, newType: FieldType) => {
    setDesign((prevDesign: ScreenDesign) => ({
      ...prevDesign,
      panels: prevDesign.panels.map((panel: PanelConfig) => ({
        ...panel,
        fields: panel.fields.map((field: FieldConfig) =>
          field.id === fieldId ? { ...field, type: newType } : field
        ),
      })),
    }));
  };

  const handleTabOrderChange = (fieldId: string, newTabOrder: number) => {
    setDesign((prevDesign: ScreenDesign) => ({
      ...prevDesign,
      panels: prevDesign.panels.map((panel: PanelConfig) => ({
        ...panel,
        fields: panel.fields.map((field: FieldConfig) =>
          field.id === fieldId ? { ...field, tabOrder: newTabOrder } : field
        ),
      })),
    }));
  };

  const handleFieldDragDrop = (
    fieldId: string,
    sourcePanelId: string,
    targetPanelId: string,
    newTabOrder: number
  ) => {
    setDesign((prevDesign: ScreenDesign) => {
      const sourcePanel = prevDesign.panels.find((p: PanelConfig) => p.id === sourcePanelId);
      const targetPanel = prevDesign.panels.find((p: PanelConfig) => p.id === targetPanelId);
      if (!sourcePanel || !targetPanel) return prevDesign;

      const fieldToMove = sourcePanel.fields.find((f: FieldConfig) => f.id === fieldId);
      if (!fieldToMove) return prevDesign;

      // Handle drag within the same panel
      if (sourcePanelId === targetPanelId) {
        const updatedFields = [...sourcePanel.fields];
        const currentIndex = updatedFields.findIndex(f => f.id === fieldId);
        if (currentIndex === -1) return prevDesign; // Should not happen

        // Remove the field from its current position
        updatedFields.splice(currentIndex, 1);

        // Insert the field at the new position based on newTabOrder
        const insertIndex = updatedFields.findIndex(f => f.tabOrder >= newTabOrder);
        if (insertIndex === -1) {
          updatedFields.push({ ...fieldToMove, tabOrder: newTabOrder });
        } else {
          updatedFields.splice(insertIndex, 0, { ...fieldToMove, tabOrder: newTabOrder });
        }

        // Re-calculate tab orders for the target panel
        const reorderedFields = updatedFields.map((f: FieldConfig, index: number) => ({
            ...f,
            tabOrder: index + 1,
        }));

        return {
          ...prevDesign,
          panels: prevDesign.panels.map((panel: PanelConfig) =>
            panel.id === sourcePanelId ? { ...panel, fields: reorderedFields } : panel
          ),
        };
      }

      // Handle drag to a different panel (existing logic)
      return {
        ...prevDesign,
        panels: prevDesign.panels.map((panel: PanelConfig) => {
          if (panel.id === sourcePanelId) {
            // Remove field from source panel
            return {
              ...panel,
              fields: panel.fields.filter((f: FieldConfig) => f.id !== fieldId),
            };
          }
          if (panel.id === targetPanelId) {
            // Add field to target panel at the correct tab order position
            const newFields = [...panel.fields];
            const insertIndex = newFields.findIndex(f => f.tabOrder >= newTabOrder);
            if (insertIndex === -1) {
                newFields.push({ ...fieldToMove, tabOrder: newTabOrder });
            } else {
                newFields.splice(insertIndex, 0, { ...fieldToMove, tabOrder: newTabOrder });
            }
            // Re-calculate tab orders for the target panel
            const reorderedFields = newFields.map((f: FieldConfig, index: number) => ({
                ...f,
                tabOrder: index + 1,
            }));
            return {
              ...panel,
              fields: reorderedFields,
            };
          }
          return panel;
        }),
      };
    });
  };

  const handleToggleFieldVisibility = (panelId: string, fieldId: string) => {
    setDesign((prevDesign: ScreenDesign) => ({
      ...prevDesign,
      panels: prevDesign.panels.map((panel: PanelConfig) =>
        panel.id === panelId
          ? {
              ...panel,
              fields: panel.fields.map((field: FieldConfig) =>
                field.id === fieldId
                  ? { ...field, visible: !field.visible }
                  : field
              ),
            }
          : panel
      ),
    }));
  };

  const handleOpenProperties = (field: FieldConfig) => {
    console.log('Opening properties for field:', field);
    setEditingField(field);
    setIsPropertiesDialogOpen(true);
  };

  const handleCloseProperties = () => {
    console.log('Closing properties dialog');
    setIsPropertiesDialogOpen(false);
    setEditingField(null);
  };

  const handleSaveChanges = (updatedField: FieldConfig) => {
    console.log('Saving changes for field:', updatedField);
    setDesign(prevDesign => ({
      ...prevDesign,
      panels: prevDesign.panels.map(panel => ({
        ...panel,
        fields: panel.fields.map(field =>
          field.id === updatedField.id ? updatedField : field
        )
      }))
    }));
    handleCloseProperties();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div style={{ marginBottom: 16 }}>
          <button onClick={() => setUiLib(uiLib === "material" ? "antd" : "material")}>
            Switch to {uiLib === "material" ? "Ant Design" : "Material UI"}
          </button>
          <button onClick={() => setIsDesignMode(!isDesignMode)}>
            {isDesignMode ? "View Mode" : "Design Mode"}
          </button>
        </div>
        {isDesignMode ? (
          <DesignMode
            design={{
              title: design.screenTitle,
              panels: design.panels
            }}
            uiLib={uiLib}
            onFieldTypeChange={handleFieldTypeChange}
            onTabOrderChange={handleTabOrderChange}
            onFieldDragDrop={handleFieldDragDrop}
            onToggleFieldVisibility={handleToggleFieldVisibility}
            onOpenProperties={handleOpenProperties}
          />
        ) : (
          <RenderMode design={design} uiLib={uiLib} />
        )}

        {editingField && (
          <FieldPropertiesDialog
            open={isPropertiesDialogOpen}
            onClose={handleCloseProperties}
            field={editingField}
            uiLib={uiLib}
            onSave={handleSaveChanges}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default App; 