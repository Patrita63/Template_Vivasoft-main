import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Box, Card, CardContent, Typography, Button, Container } from "@mui/material";
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
            
            <Box sx={{ margin: "16px", "& .MuiBreadcrumbs-root": { color: "#fff" } }}>
                <DynamicBreadCrumbs className={styles.MarginTop} aria-label="breadcrumb" />
            </Box>

            <Container>
                <header className={styles.header}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: "50px", fontWeight:"600", color:"#3BCE3F" }}>
                        Benvenuto nell&apos;Intranet Aziendale di Vivasoft S.R.L.
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: "30px", fontWeight:"700", color:"#FFFF00"}}>
                        {'"Consulenza e Formazione Microsoft per il tuo successo"'}
                    </Typography>
                </header>

                <section className={styles.hero}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontSize: "25px", fontWeight:"600", color:"#fff"}}>
                        Soluzioni su misura per ogni sfida
                    </Typography>
                    <Typography component="h3" sx={{ fontSize: "20px", fontWeight:"400", color:"#C9c9c9"}}>
                        Scopri come ottimizzare i processi aziendali, migliorare l&apos;efficienza e ottenere risultati concreti e duraturi con il supporto dei nostri esperti.
                    </Typography>
                </section>

                {/* Features Grid with Cards */}
                <Box
  sx={{
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
    gap: 3,
  }}
>
  {features.map((feature, index) => (
    <Card
      key={index}
      sx={{
        padding: "20px", // Aggiungi padding per più spazio
        textAlign: "center",
        borderRadius: "16px", // Angoli arrotondati per una forma più morbida
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Ombra leggera per un effetto di profondità
        backgroundColor: "#dbd9d9", // Colore di sfondo chiaro
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Transizione fluida
        '&:hover': {
          transform: "scale(1.05)", // Ingrandimento al passaggio del mouse
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // Ombra più marcata
          backgroundColor: "#e0f7fa", // Cambia colore di sfondo al passaggio del mouse
        },
      }}
    >
      <CardContent>
        {/* Se vuoi aggiungere un'icona o immagine, puoi farlo qui */}
        {/* <Image src="your-icon-url" alt="Feature Icon" width={50} height={50} /> */}
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px", color: "#264082" }}>
          {feature.title}
        </Typography>
        <Typography variant="body2" sx={{ lineHeight: "1.4", color: "#555" }}>
          {feature.desc}
        </Typography>
      </CardContent>
    </Card>
  ))}
</Box>


                {/* Call to Action */}
                <Box sx={{ textAlign: "center", marginTop: "35px" }}>
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
