import React from "react";
import { ClientForm } from "../components/ClientForm";
import { Navbar } from "../components/navbar";

export const AddClient = () => {
  return (
    <>
      <Navbar />
      <ClientForm />;
    </>
  );
};
