import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Box, Card, CardContent, Typography, Button, Grid, Container } from "@mui/material";
import DynamicBreadCrumbs from "../../components/DynamicBreadCrumbs";
import Credits from "../../components/Credits";
import styles from "./Home.module.css";

const NavIntranetMenu = dynamic(() => import("../../components/NavIntranetMenu"), { ssr: false });

const features = [
    { title: "Azure Cloud", desc: "Approfitta della scalabilità e potenza del cloud per trasformare la tua azienda." },
    { title: "Microsoft Power Platform", desc: "Creazione di soluzioni dinamiche e innovative per le tue necessità operative." },
    { title: "SharePoint Online", desc: "Ottimizza la collaborazione aziendale con strumenti all'avanguardia." },
    { title: "Academy Custom C#", desc: "Creazione di corsi personalizzati in ambito full stack Microsoft." },
    { title: "Academy Custom React", desc: "Creazione di corsi personalizzati per sviluppare applicazioni web client-side." },
    { title: "Certificazione CKA", desc: "Erogazione del corso CKA Certified Kubernetes Administration." }
];

const IntranetHome = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => setIsClient(true), []);

    return (
        <>
            {isClient && <NavIntranetMenu />}
            
            <Box sx={{ margin: "16px" }}>
                <DynamicBreadCrumbs className={styles.MarginTop} aria-label="breadcrumb" />
            </Box>

            <Container>
                <header className={styles.header}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Benvenuto nell&apos;Intranet Aziendale di Vivasoft S.R.L.
                    </Typography>
                    <Typography variant="subtitle1">
                        Consulenza e Formazione Microsoft per il tuo successo
                    </Typography>
                </header>

                <section className={styles.hero}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Soluzioni Microsoft su misura per ogni sfida
                    </Typography>
                    <Typography variant="body1">
                        Scopri come ottimizzare i processi aziendali, migliorare l&apos;efficienza e ottenere risultati concreti e duraturi con il supporto dei nostri esperti Microsoft.
                    </Typography>
                </section>

                {/* Features Grid with Cards */}
                <Grid container spacing={3} sx={{ marginTop: "20px" }}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ minHeight: "120px", display: "flex", flexDirection: "column", justifyContent: "center", padding: "15px", textAlign: "center" }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ lineHeight: "1.4", color: "#555" }}>
                                        {feature.desc}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Call to Action */}
                <Box sx={{ textAlign: "center", marginTop: "40px" }}>
                    <Typography variant="body1" gutterBottom>
                        Vuoi trasformare la tecnologia in un vantaggio strategico? Inizia oggi stesso!
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        href="https://appsource.microsoft.com/en-us/marketplace/partner-dir/3be9add1-f9f0-44e0-b01c-fa585c33b214/overview/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Vai alla nostra pagina Microsoft | AppSource
                    </Button>
                </Box>
            </Container>

            {/* Footer */}
            <footer className={styles.footer}>
                <Credits />
            </footer>
        </>
    );
};

export default IntranetHome;
