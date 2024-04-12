import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ScheduleList } from "./ScheduleList";
import { NotesList } from "./NotesList";
import { JsonModal } from "./JsonModal";

export const ClientForm = ({ client }) => {
  const { actions } = useContext(Context);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    status: "",
    email: "",
    phone: "",
    address: "",
    notes: [],
    schedule: [],
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (client) {
      setFormData({
        id: client.id,
        firstName: client.firstName || "",
        lastName: client.lastName || "",
        company: client.company || "",
        status: client.status || "",
        email: client.email || "",
        phone: client.phone || "",
        address: client.address || "",
        notes: client.notes || [],
        schedule: client.schedule || [],
      });
    }
  }, [client]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!client) {
      actions.createClient(formData);
      navigate("/clients");
    } else {
      actions.editClient(formData);
      navigate("/clients");
    }
  };

  const onFormFieldChange = (e) => {
    const { name, value } = e.target || e;
    setFormData({ ...formData, [name]: value });
  };

  const onClickExportJson = () => {
    setIsModalOpen(true);
  };

  return (
    <div style={{ background: "white", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "end" }}>
        {client && (
          <Button
            variant="outlined"
            onClick={() => {
              onClickExportJson();
            }}
          >
            Export to Json
          </Button>
        )}

        <Button
          variant="contained"
          sx={{ marginLeft: "8px" }}
          onClick={() => {
            navigate("/clients");
          }}
        >
          Back to Clients
        </Button>
      </div>
      <h2>{client ? "Edit Client" : "Add New Client"}</h2>
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={formData.firstName}
              onChange={onFormFieldChange}
              error={errors.firstName ? true : false}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={onFormFieldChange}
              error={errors.lastName ? true : false}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="company"
              label="Company"
              name="company"
              type="text"
              autoComplete="company"
              value={formData.company}
              onChange={onFormFieldChange}
              error={errors.company ? true : false}
              helperText={errors.company}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="status"
              label="Status"
              name="status"
              type="status"
              autoComplete="status"
              value={formData.status}
              onChange={onFormFieldChange}
              error={errors.status ? true : false}
              helperText={errors.emstatusail}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={onFormFieldChange}
              error={errors.email ? true : false}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              type="text"
              autoComplete="phone"
              value={formData.phone}
              onChange={onFormFieldChange}
              error={errors.phone ? true : false}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              type="text"
              autoComplete="address"
              value={formData.address}
              onChange={onFormFieldChange}
              error={errors.address ? true : false}
              helperText={errors.address}
              sx={{ marginBottom: "5px" }}
            />
          </Grid>
        </Grid>

        <NotesList
          formData={formData}
          onChange={(newNotes) => {
            setFormData({ ...formData, notes: newNotes });
          }}
        />

        <ScheduleList
          formData={formData}
          onChange={(newDates) => {
            setFormData({ ...formData, schedule: newDates });
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {client ? "Edit Client" : "Add Client"}
        </Button>

        {isModalOpen && (
          <JsonModal
            isModalOpen={isModalOpen}
            formData={formData}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </Box>
    </div>
  );
};
