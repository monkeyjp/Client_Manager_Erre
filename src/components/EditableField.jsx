import { useState } from "react";
import { TextField } from "@mui/material";

export const EditableField = ({ value, rowIndex, columnId, type }) => {
  const [editingValue, setEditingValue] = useState(value);
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setEditing(false);

      const newData =
        type === "note" ? [...formData.notes] : [...formData.schedule];
      newData[rowIndex] = { ...newData[rowIndex], [columnId]: editingValue };
      setFormData((prevFormData) => ({
        ...prevFormData,
        notes: type === "note" ? newData : prevFormData.notes,
        schedule: type === "schedule" ? newData : prevFormData.schedule,
      }));
    }
  };

  const handleChange = (e) => {
    setEditingValue(e.target.value);
  };

  return (
    <>
      {editing ? (
        <TextField
          value={editingValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      ) : (
        <div onClick={handleClick}>{value}</div>
      )}
    </>
  );
};
