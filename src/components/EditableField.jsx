import { useState } from "react";
import { TextField } from "@mui/material";

export const EditableField = ({ value, rowIndex, columnId, type }) => {
  const [editingValue, setEditingValue] = useState(value);
  const [editing, setEditing] = useState(false);

  // Function to handle click event to initiate editing
  const handleClick = () => {
    setEditing(true);
  };

  // Function to handle blur event to exit editing mode
  const handleBlur = () => {
    setEditing(false);
  };

  // Function to handle key press event, primarily to handle "Enter" key press to save changes
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setEditing(false);

      // Update the data based on the type of field (note or schedule)
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

  // Function to handle change event when editing the value
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
