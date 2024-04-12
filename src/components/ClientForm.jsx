import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ScheduleList } from "./ScheduleList";
import { NotesList } from "./NotesList";
import { JsonModal } from "./JsonModal";
import { z } from "zod";

// "The ClientForm component, when called with a client prop, displays all the client information and allows for editing or exporting it as JSON.
//If no client is passed, it displays the fields for filling in and handles adding a new client."
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
    //validate if client was passed as props to update formData
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
    //function to send our formData to create or edit our client
    event.preventDefault();

    try {
      const clientSchema = z.object({
        //validate specific inputs
        firstName: z.string().min(1, { message: "First Name is required" }),
        lastName: z.string().min(1, { message: "Last Name is required" }),
        company: z.string().min(1, { message: "Company is required" }),
        email: z.string().email("Invalid email format"),
        status: z.string().min(1, { message: "Status is required" }),
        address: z.string().min(1, { message: "Address is required" }),
        phone: z.string().min(1, { message: "Phone is required" }),
      });

      // Validate form data
      clientSchema.parse(formData);

      // If validation passes, create or edit the client
      if (!client) {
        actions.createClient(formData);
      } else {
        actions.editClient(formData);
      }

      // Redirect to the clients page
      navigate("/clients");
    } catch (error) {
      if (error instanceof z.ZodError) {
        // If there are validation errors, set the errors state
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  const onFormFieldChange = (e) => {
    //modify our formData when user change an especific value
    const { name, value } = e.target || e;
    setFormData({ ...formData, [name]: value });
  };

  const onClickExportJson = () => {
    //set the modal display to show it
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
              helperText={errors.status}
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
