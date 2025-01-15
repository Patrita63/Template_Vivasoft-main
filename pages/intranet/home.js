import React, { useEffect, useState } from "react";
import NavIntranetMenu from '../../components/NavIntranetMenu';
import DynamicBreadCrumbs from '../../components/DynamicBreadCrumbs';

import { Box } from "@mui/material";
import styles from './Home.module.css';

const IntranetHome = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // This ensures the component knows it's running on the client
    }, []);

    return (
        <>
          {/* NavIntranetMenu */}
          {isClient && (
            <div>
                <NavIntranetMenu />
            </div>
          )}
          {/* Breadcrumbs */}
          <Box sx={{ margin: '16px' } }>
            <DynamicBreadCrumbs className={styles.MarginTop} aria-label="breadcrumb" />
          </Box>
        </>
      );
}

export default IntranetHome;