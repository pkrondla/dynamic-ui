import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FieldConfig, FieldType } from "../types/design";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  Typography,
  SelectChangeEvent,
  Paper,
} from "@mui/material";
import {
  Input,
  Checkbox as AntdCheckbox,
  Select as AntdSelect,
  DatePicker,
  InputNumber,
  Form,
  Space,
  Card,
} from "antd";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
  field: FieldConfig;
  uiLib: "material" | "antd";
  isDesignMode: boolean;
  onFieldTypeChange?: (fieldId: string, newType: FieldType) => void;
  onTabOrderChange?: (fieldId: string, newTabOrder: number) => void;
  onFieldDragDrop?: (fieldId: string, sourcePanelId: string, targetPanelId: string, newTabOrder: number) => void;
  onToggleFieldVisibility?: (panelId: string, fieldId: string) => void;
  panelId: string;
  onOpenProperties?: (field: FieldConfig) => void;
}

const Field: React.FC<Props> = ({
  field,
  uiLib,
  isDesignMode,
  onFieldTypeChange,
  onTabOrderChange,
  onFieldDragDrop,
  onToggleFieldVisibility,
  panelId,
  onOpenProperties
}) => {
  const dragRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  console.log('Field Rendered: ' + field.id, { isDesignMode, onOpenProperties: !!onOpenProperties });

  const [{ isDragging }, drag] = useDrag({
    type: "FIELD",
    item: { id: field.id, panelId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: "FIELD",
    drop: (item: { id: string; panelId: string }) => {
      onFieldDragDrop?.(item.id, item.panelId, panelId, field.tabOrder);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(dragRef);
  drop(dropRef);

  if (!field.visible) {
    return null;
  }

  if (uiLib === "material") {
    return isDesignMode ? (
      <Paper
        ref={dropRef}
        elevation={1}
        sx={{
          p: 2,
          opacity: isDragging ? 0.5 : 1,
          bgcolor: isOver ? 'action.hover' : 'background.paper',
          transition: 'background-color 0.2s',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <button ref={dragRef} style={{ border: 'none', background: 'none', cursor: 'move', padding: 0 }}>
            <IconButton size="small">
              <DragIndicatorIcon />
            </IconButton>
          </button>
          <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
            {field.label}
            {field.required && <span style={{ color: 'error.main' }}> *</span>}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            {renderField(field, uiLib)}
          </Box>
          <IconButton size="small" onClick={() => {
            console.log('Settings icon clicked for field:', field.id);
            onOpenProperties?.(field);
          }} sx={{ flexShrink: 0 }}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Paper>
    ) : (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {field.label}
          {field.required && <span style={{ color: 'error.main' }}> *</span>}
        </Typography>
        {renderField(field, uiLib)}
      </Box>
    );
  }

  return isDesignMode ? (
    <Card
      ref={dropRef}
      size="small"
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isOver ? '#f0f0f0' : 'white',
        transition: 'background-color 0.2s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button ref={dragRef} style={{ border: 'none', background: 'none', cursor: 'move', padding: 0 }}>
          <DragIndicatorIcon />
        </button>
        <div style={{ flexShrink: 0, marginRight: 8 }}>
          {field.label}
          {field.required && <span style={{ color: 'red' }}> *</span>}
        </div>
        <div style={{ flexGrow: 1 }}>
          {renderField(field, uiLib)}
        </div>
        <IconButton size="small" onClick={() => {
          console.log('Settings icon clicked for field:', field.id);
          onOpenProperties?.(field);
        }}>
          <SettingsIcon />
        </IconButton>
      </div>
    </Card>
  ) : (
    <Form.Item
      label={
        <span>
          {field.label}
          {field.required && <span style={{ color: 'red' }}> *</span>}
        </span>
      }
    >
      {renderField(field, uiLib)}
    </Form.Item>
  );
};

const renderField = (field: FieldConfig, uiLib: "material" | "antd") => {
  if (uiLib === "material") {
    switch (field.type) {
      case "text":
        return <TextField fullWidth size="small" />;
      case "textarea":
        return <TextField fullWidth multiline rows={4} size="small" />;
      case "number":
        return <TextField type="number" fullWidth size="small" />;
      case "date":
        return <TextField type="date" fullWidth size="small" />;
      case "select":
        return (
          <FormControl fullWidth size="small">
            <Select>
              {field.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "checkbox":
        return <FormControlLabel control={<Checkbox />} label="" />;
      default:
        return null;
    }
  }

  switch (field.type) {
    case "text":
      return <Input />;
    case "textarea":
      return <Input.TextArea rows={4} />;
    case "number":
      return <InputNumber style={{ width: '100%' }} />;
    case "date":
      return <DatePicker style={{ width: '100%' }} />;
    case "select":
      return (
        <AntdSelect style={{ width: '100%' }}>
          {field.options?.map((option) => (
            <AntdSelect.Option key={option} value={option}>
              {option}
            </AntdSelect.Option>
          ))}
        </AntdSelect>
      );
    case "checkbox":
      return <AntdCheckbox />;
    default:
      return null;
  }
};

export default Field; 