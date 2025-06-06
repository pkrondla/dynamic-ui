import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, SelectChangeEvent } from '@mui/material';
import { Select as AntdSelect, Checkbox as AntdCheckbox, InputNumber, Modal, Form, Input } from 'antd';
import { FieldConfig, FieldType } from '../types/design';

interface Props {
  open: boolean;
  onClose: () => void;
  field: FieldConfig;
  uiLib: "material" | "antd";
  onSave: (updatedField: FieldConfig) => void;
}

const FieldPropertiesDialog: React.FC<Props> = ({ open, onClose, field, uiLib, onSave }) => {
  const [editedField, setEditedField] = React.useState<FieldConfig>(field);

  React.useEffect(() => {
    setEditedField(field);
  }, [field]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedField(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<FieldType>) => {
    setEditedField(prev => ({ ...prev, type: e.target.value as FieldType }));
  };

  const handleAntdSelectChange = (value: FieldType) => {
    setEditedField(prev => ({ ...prev, type: value }));
  };

  const handleNumberInputChange = (value: number | null) => {
    setEditedField(prev => ({ ...prev, tabOrder: value || 0 }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedField(prev => ({ ...prev, visible: e.target.checked }));
  };

  const handleAntdCheckboxChange = (e: any) => {
    setEditedField(prev => ({ ...prev, visible: e.target.checked }));
  };

  const handleSave = () => {
    onSave(editedField);
  };

  if (uiLib === "material") {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Field Properties</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Label"
            type="text"
            fullWidth
            variant="standard"
            value={editedField.label}
            onChange={handleInputChange}
            name="label"
          />
           <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select
              value={editedField.type}
              label="Type"
              onChange={handleSelectChange}
            >
               <MenuItem value="text">Text</MenuItem>
                <MenuItem value="textarea">Textarea</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value="checkbox">Checkbox</MenuItem>
            </Select>
          </FormControl>
           <TextField
            margin="dense"
            label="Tab Order"
            type="number"
            fullWidth
            variant="standard"
            value={editedField.tabOrder}
            onChange={handleInputChange}
            name="tabOrder"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editedField.visible}
                onChange={handleCheckboxChange}
              />
            }
            label="Visible"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Modal
      title="Edit Field Properties"
      open={open}
      onOk={handleSave}
      onCancel={onClose}
    >
      <Form layout="vertical">
        <Form.Item label="Label">
          <Input
            value={editedField.label}
            onChange={handleInputChange}
            name="label"
          />
        </Form.Item>
        <Form.Item label="Type">
          <AntdSelect
            value={editedField.type}
            onChange={handleAntdSelectChange}
          >
            <AntdSelect.Option value="text">Text</AntdSelect.Option>
            <AntdSelect.Option value="textarea">Textarea</AntdSelect.Option>
            <AntdSelect.Option value="number">Number</AntdSelect.Option>
            <AntdSelect.Option value="date">Date</AntdSelect.Option>
            <AntdSelect.Option value="select">Select</AntdSelect.Option>
            <AntdSelect.Option value="checkbox">Checkbox</AntdSelect.Option>
          </AntdSelect>
        </Form.Item>
         <Form.Item label="Tab Order">
          <InputNumber
            value={editedField.tabOrder}
            onChange={handleNumberInputChange}
          />
        </Form.Item>
        <Form.Item label="Visible" valuePropName="checked">
          <AntdCheckbox
            checked={editedField.visible}
            onChange={handleAntdCheckboxChange}
          >
            Visible
          </AntdCheckbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FieldPropertiesDialog; 