import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { EditableField } from "./EditableField";
import Grid from "@mui/material/Grid";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const NotesList = ({ formData, onChange }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [selectedNoteType, setSelectedNoteType] = useState("needs");

  const onNoteChange = (e, index, fieldName) => {
    const { value } = e.target;
    const newNotes = [...formData.notes];
    newNotes[index][fieldName] = value;
    onChange(newNotes);
  };

  const notesColumns = [
    { id: "category", label: "Category", minWidth: 170 },
    { id: "title", label: "Title", minWidth: 170 },
    { id: "actions", label: "Actions", minWidth: 100 },
  ];

  const onAddNoteClick = () => {
    const newNotes = [...formData.notes];
    newNotes.push({
      title: noteTitle,
      category: selectedNoteType,
    });
    onChange(newNotes);
    setNoteTitle("");
  };

  const onDeleteNoteClick = (index) => {
    const newNotes = formData.notes.filter((note, i) => i !== index);
    onChange(newNotes);
  };

  return (
    <>
      <TableContainer>
        <h3>Notes</h3>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {notesColumns.map((column) => (
                <TableCell key={column.id} align="left">
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.notes &&
              formData.notes.map((note, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="left">
                      <Chip label={note.category} color={"primary"} />
                    </TableCell>
                    <TableCell align="left">{note.title}</TableCell>
                    <TableCell align="left">
                      <IconButton
                        aria-label="delete"
                        onClick={() => onDeleteNoteClick(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container spacing={2} sx={{ marginTop: "16px" }}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="notes-label">Notes</InputLabel>
            <Select
              labelId="notes-label"
              id="notes"
              name="notes"
              value={selectedNoteType}
              label="notes"
              onChange={(e) => {
                setSelectedNoteType(e.target.value);
              }}
            >
              <MenuItem value="needs">Needs</MenuItem>
              <MenuItem value="requirement">Requirement</MenuItem>
              <MenuItem value="preference">Preference</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <TextField
            required
            fullWidth
            label="Description"
            name="noteTitle"
            value={noteTitle}
            onChange={(e) => {
              setNoteTitle(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={onAddNoteClick}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
