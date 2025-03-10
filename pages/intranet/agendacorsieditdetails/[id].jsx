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
        <EditAgendaCorsiForm onSubmit={handleSubmit} />
      {/* Footer */}
      <footer className={styles.footer}>
        <Credits />
      </footer>
    </>
  );
};


export default EditAgendaCorsiPage;