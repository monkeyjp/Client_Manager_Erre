import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

export const JsonModal = ({ isModalOpen, formData, setIsModalOpen }) => {
  const onClickClose = () => {
    setIsModalOpen(false);
  };
  return (
    <Dialog open={isModalOpen} onClose={onClickClose}>
      <DialogTitle>Client Information (JSON)</DialogTitle>
      <DialogContent>
        {/* use pre to mantain the format of the JSON */}
        <pre>
          <DialogContentText>
            {JSON.stringify(formData, null, 2)}
          </DialogContentText>
        </pre>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
