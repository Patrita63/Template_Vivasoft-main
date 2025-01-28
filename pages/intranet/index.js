import React, { useEffect, useState } from "react";
import NavIntranetMenu from '../../components/NavIntranetMenu';
import DynamicBreadCrumbs from '../../components/DynamicBreadCrumbs';

import { Box } from "@mui/material";
import styles from './Home.module.css';
import Credits from '../../components/Credits'; 

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

          <div className={styles.bodycontainer}>

            <header className={styles.header}>
              <h1>Benvenuto nell&apos;Intranet Aziendale di Vivasoft S.R.L.</h1>
              <p>Consulenza e Formazione Microsoft per il tuo successo</p>
            </header>

            <div className={styles.container}>
                <section className={styles.hero}>
                    <h1>Soluzioni Microsoft su misura per ogni sfida</h1>
                    <p>Scopri come ottimizzare i processi aziendali, migliorare l&apos;efficienza e ottenere risultati concreti e duraturi con il supporto dei nostri esperti Microsoft.</p>
                </section>

                <section className={styles.features}>
                    <div className={styles.feature}>
                        <h3>Azure Cloud</h3>
                        <p>Approfitta della scalabilità e potenza del cloud per trasformare la tua azienda.</p>
                    </div>
                    <div className={styles.feature}>
                        <h3>Microsoft Power Platform</h3>
                        <p>Creazione di soluzioni dinamiche e innovative per le tue necessità operative.</p>
                    </div>
                    <div className={styles.feature}>
                        <h3>SharePoint Online</h3>
                        <p>Ottimizza la collaborazione aziendale con strumenti all&apos;avanguardia.</p>
                    </div>
                </section>

                <section className={styles.features}>
                    <div className={styles.feature}>
                        <h3>Academy Custom C#</h3>
                        <p>Creazione di corsi personalizzati in ambito full stack Microsoft.</p>
                    </div>
                    <div className={styles.feature}>
                        <h3>Academy Custom React</h3>
                        <p>Creazione di corsi personalizzati per sviluppare applicazioni web in ottica client-side.</p>
                    </div>
                    <div className={styles.feature}>
                        <h3>Certificazione CKA Certified Kubernetes Administration</h3>
                        <p>Erogazione del corso CKA Certified Kubernetes Administration.</p>
                    </div>
                </section>

                <section className={styles.cta}>
                    <p>Vuoi trasformare la tecnologia in un vantaggio strategico? Inizia oggi stesso!</p>
                    {/* <Link href={'https://appsource.microsoft.com/en-us/marketplace/partner-dir/3be9add1-f9f0-44e0-b01c-fa585c33b214/overview/contact'} className='hover:text-accent transition-all duration-300' target='_blank'> */}
                    <a href="https://appsource.microsoft.com/en-us/marketplace/partner-dir/3be9add1-f9f0-44e0-b01c-fa585c33b214/overview/contac" target='_blank'>Vai nella nostra pagina Microsoft | AppSource</a>
                </section>
            </div>

            {/* <footer>
                <p>&copy; 2025 La Tua Azienda. Tutti i diritti riservati.</p>
            </footer> */}
            {/* Powered by */}
            <footer className={styles.footer}>
                <Credits />
            </footer>
          </div>
        </>
      );
}

export default IntranetHome;