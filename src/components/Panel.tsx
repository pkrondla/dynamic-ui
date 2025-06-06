import React from "react";
import Field from "./Field";
import { PanelConfig, FieldType, FieldConfig } from "../types/design";
import { Paper, Typography, Box } from "@mui/material";
import { Card, Typography as AntdTypography } from "antd";

interface Props {
  panel: PanelConfig;
  uiLib: "material" | "antd";
  isDesignMode: boolean;
  onFieldTypeChange?: (fieldId: string, newType: FieldType) => void;
  onTabOrderChange?: (fieldId: string, newTabOrder: number) => void;
  onFieldDragDrop?: (fieldId: string, sourcePanelId: string, targetPanelId: string, newTabOrder: number) => void;
  onToggleFieldVisibility?: (panelId: string, fieldId: string) => void;
  onOpenProperties?: (field: FieldConfig) => void;
}

const Panel: React.FC<Props> = ({
  panel,
  uiLib,
  isDesignMode,
  onFieldTypeChange,
  onTabOrderChange,
  onFieldDragDrop,
  onToggleFieldVisibility,
  onOpenProperties,
}) => {
  if (uiLib === "material") {
    return (
      <Paper 
        elevation={2} 
        sx={{
          flex: 1,
          minWidth: 300, 
          p: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {panel.title}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {panel.fields.map((field) => (
            <Field
              key={field.id}
              field={field}
              uiLib={uiLib}
              isDesignMode={isDesignMode}
              onFieldTypeChange={onFieldTypeChange}
              onTabOrderChange={onTabOrderChange}
              onFieldDragDrop={onFieldDragDrop}
              onToggleFieldVisibility={onToggleFieldVisibility}
              panelId={panel.id}
              onOpenProperties={onOpenProperties}
            />
          ))}
        </Box>
      </Paper>
    );
  }

  return (
    <Card 
      style={{
        flex: 1,
        minWidth: 300,
      }}
    >
      <AntdTypography.Title level={4}>{panel.title}</AntdTypography.Title>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {panel.fields.map((field) => (
          <Field
            key={field.id}
            field={field}
            uiLib={uiLib}
            isDesignMode={isDesignMode}
            onFieldTypeChange={onFieldTypeChange}
            onTabOrderChange={onTabOrderChange}
            onFieldDragDrop={onFieldDragDrop}
            onToggleFieldVisibility={onToggleFieldVisibility}
            panelId={panel.id}
            onOpenProperties={onOpenProperties}
          />
        ))}
      </div>
    </Card>
  );
};

export default Panel; 