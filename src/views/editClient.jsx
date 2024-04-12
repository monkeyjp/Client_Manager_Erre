import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ClientForm } from "../components/ClientForm";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/navbar";

export const EditClient = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);

  const client = actions.getClient(id);

  return (
    <div>
      <Navbar />
      <ClientForm client={client} />
    </div>
  );
};
