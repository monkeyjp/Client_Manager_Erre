import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import { TextField, Button, FormControl } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const ScheduleList = ({ formData, onChange }) => {
  const [dateTitle, setDateTitle] = useState("");
  const [selectedDate, setSeletedDate] = useState(dayjs());

  const scheduleColumns = [
    { id: "date", label: "Date", width: 250 },
    { id: "title", label: "Title", minWidth: 250 },
    { id: "actions", label: "Actions", minWidth: 100 },
  ];

  // Handle click event to add a new event to the schedule
  const onAddDateClick = () => {
    const newDates = [...formData.schedule];
    newDates.push({
      title: dateTitle,
      date: selectedDate,
    });
    onChange(newDates);
    setDateTitle("");
  };

  // Handle click event to delete an event from the schedule
  const onDeleteDateClick = (index) => {
    const newDates = formData.schedule.filter((date, i) => i !== index);
    onChange(newDates);
  };

  return (
    <>
      <TableContainer>
        <h3>Schedule</h3>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {scheduleColumns.map((column) => (
                <TableCell key={column.id} align="left" width={column.width}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.schedule &&
              formData.schedule.map((event, index) => (
                <TableRow key={index}>
                  <TableCell align="left">
                    {dayjs(event.date).format("LLLL")}
                  </TableCell>
                  <TableCell align="left">{event.title}</TableCell>
                  <TableCell align="left">
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        onDeleteDateClick(index);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container spacing={2} sx={{ marginTop: "16px" }}>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Basic date time picker"
                  value={dayjs(selectedDate)}
                  onChange={(value) => {
                    setSeletedDate(value.format());
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid item xs={7}>
          <TextField
            required
            fullWidth
            label="Description"
            name="noteTitle"
            value={dateTitle}
            onChange={(e) => {
              setDateTitle(e.target.value);
            }}
            sx={{ marginTop: "8px" }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={onAddDateClick}
            sx={{ marginTop: "8px" }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
