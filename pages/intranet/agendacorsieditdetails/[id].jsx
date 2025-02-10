import { useRouter } from 'next/router';

import Cookies from "js-cookie";

import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";


import NavIntranetMenu from '../../../components/NavIntranetMenu';
import DynamicBreadCrumbs from '../../../components/DynamicBreadCrumbs';
import Credits from "../../../components/Credits";

import styles from "../Home.module.css";

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function AgendaCorsiEditDetails() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);
  return (
    <>
      {isClient && <NavIntranetMenu />}
      <Box sx={{ margin: "16px", "& .MuiBreadcrumbs-root": { color: "#fff" } }}>
        <DynamicBreadCrumbs className={styles.MarginTop} aria-label="breadcrumb" />
      </Box>
      <div>
      AgendaCorsiEditDetails
      </div>
      {/* Footer */}
      <footer className={styles.footer}>
        <Credits />
      </footer>
    </>
  );
}