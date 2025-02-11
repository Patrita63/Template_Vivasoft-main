import React, { useState, useEffect } from "react";
import EditAgendaCorsiForm from '../../../components/EditAgendaCorsiForm';
import NavIntranetMenu from '../../../components/NavIntranetMenu';
import DynamicBreadCrumbs from '../../../components/DynamicBreadCrumbs';
import Credits from "../../../components/Credits";
import styles from "../Home.module.css";
import { Box } from "@mui/material";

const EditAgendaCorsiPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const initialData = {
    Id: 1,
    DataInizio: '2023-10-01T09:00',
    DataFine: '2023-10-05T18:00',
    IdCatalogoCorsi: 101,
    IdLearningCenter: 201,
    ClienteFinale: 'Client A',
    Descrizione: 'Course Description',
    NumeroDiscenti: 20,
    IdTipoErogazione: 1,
    TotaleOre: 40,
    IsMTM: true,
    IsFinanziato: false,
    IsAcademy: true,
    IdStatoAgenda: 2,
    Note: 'Additional notes here...',
  };

  const handleSubmit = (formData) => {
    console.log('Form Data Submitted:', formData);
    // Perform your save/update logic here
  };

  return (
    <>
      {isClient && <NavIntranetMenu />}
      <Box sx={{ margin: "16px", "& .MuiBreadcrumbs-root": { color: "#fff" } }}>
        <DynamicBreadCrumbs className={styles.MarginTop} aria-label="breadcrumb" />
      </Box>
      <div>
      <EditAgendaCorsiForm initialData={initialData} onSubmit={handleSubmit} />
      </div>
      {/* Footer */}
      <footer className={styles.footer}>
        <Credits />
      </footer>
    </>
  );
};

export default EditAgendaCorsiPage;