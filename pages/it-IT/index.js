import * as React from 'react';
import { useEffect, useState } from 'react';

// next image
import Head from 'next/head'; // Importa il componente Head di Next.js
// import Image from 'next/image';

import Cookies from "js-cookie";

import styles from './Popup.module.css';
// components
import Layout from '../../components/Layout';
import ParticlesContainer from '../../components/ParticlesContainer';

// framer motion
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '../../variants';

// Modal popup MUI
// https://stackoverflow.com/questions/72506034/module-not-found-error-cant-resolve-mui-base
// npm install @mui/base
// import { Modal } from '@mui/base/Modal';

import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack } from "@mui/material";
// import FormControlContext from '@mui/material/FormControl/FormControlContext';
// ERROR
/* Collecting page data  .C:\Vivasoft\Template_Vivasoft\Template_Vivasoft-main\node_modules\@mui\material\FormControl\FormControlContext.js:1
import * as React from 'react'; */
import CloseIcon from "@mui/icons-material/Close";

const Home = () => {
  // COOKIES Management
  const [isPopupOpened, setIsPopupOpened]=useState(false);
  const [isPopupSettingsOpened, setIsPopupSettingsOpened]=useState(false);
  
  useEffect(() => {
    localStorage.setItem("isLanguageIta", 'true');
    // debugger;
    // const isPopupToShow = Boolean(localStorage.getItem("isCookiesAcceptedIT"));
    // Replace with:
    const isPopupToShow = Cookies.get("isCookiesAcceptedIT") === "true" ? true : false;
    console.log('isPopupToShow: ' + isPopupToShow);

    if(!isPopupToShow){
      openPopup();
    }
  }, [])
  
  const openPopup = () =>{
    setIsPopupOpened(true);
  } 

  // https://stackoverflow.com/questions/58597397/how-do-i-prevent-material-ui-dialog-from-being-dismissed-upon-clicking-the-backd
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") 
        return;
    closePopup();
  }

  const closePopup = () =>{
    setIsPopupOpened(false);
  } 

  const cookiesAcceptedFirtPopup = () =>{
    // localStorage.setItem("isCookiesAcceptedIT", true);
    // Replace with:
    Cookies.set("isCookiesAcceptedIT", true);
    setIsPopupOpened(false);
  } 

  const goToImpostazioni = () =>{
    setIsPopupSettingsOpened(true);
  } 

  const closeSettingsPopup = () =>{
    setIsPopupSettingsOpened(false);
  } 

  const cookiesAcceptedPopupSettings = () =>{
    // localStorage.setItem("isCookiesAcceptedIT", true);
    // Replace with:
    Cookies.set("isCookiesAcceptedIT", true);
    setIsPopupSettingsOpened(false);
  } 

  const handlePopupSettingsClose = (event, reason) => {
    if (reason && reason === "backdropClick") 
        return;
    closeSettingsPopup();
  }

  return (
    <Layout>
      <Head>
        <title>Vivasoft Consulenza e Formazione</title>
        <meta
          name="description"
          content="Dal 2014, plasmiamo il futuro delle aziende con soluzioni su misura, pensate per vincere ogni sfida.Grazie al nostro supporto, le aziende ottimizzano i processi, migliorano l’efficienza operativa e ottengono risultati concreti e duraturi, mantenendosi sempre un passo avanti.Tutto questo è reso possibile dalla formazione e dallo sviluppo che offriamo attraverso i nostri collaboratori, esperti nelle tecnologie più avanzate di Microsoft.Dall'utilizzo della scalabilità di Azure Cloud alla creazione di soluzioni dinamiche ed innovative con Microsoft Power Platform fino all'ottimizzazione della collaborazione aziendale con Microsoft SharePoint Online, forniamo le competenze indispensabili per trasformare il tuo team in un motore di innovazione.La nostra missione? Trasformare le sfide in opportunità.Con programmi formativi personalizzati, facciamo della tecnologia un vero vantaggio strategico per il tuo successo."
        />
        <meta name="keywords" content="Microsoft Azure, Microsoft 365, Microsoft Power Platform, Microsoft Power Apps, Microsoft Power BI, Microsoft Power Automate, Consulenza, Formazione, Microsoft" />
        <meta name="author" content="Vivasoft" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/favicon.ico?v=1" rel="shortcut icon" type="image/x-icon"></link>
        {/* Favicon in PNG per desktop e tab */}
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />  {/* Favicon più grande per schermi Retina */}
  <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />  {/* Una dimensione intermedia */}
      </Head>
      <div className='bg-primary/60 h-full'>
        {/* text */}
        <div className='w-full h-full bg-gradient-to-r from-primary via-black/10 to-black/10 xl:py-60 py-80'>
          <div className='text-center flex flex-col justify-center  xl:text-left h-full container mx-auto xl:pt-0 pt-20'>
            {/* Modal popup MUI fullScreen in <Dialog */}
            <Dialog open={isPopupOpened} onClose={handleClose} fullWidth maxWidth="sm">
              <DialogTitle>Questo sito utilizza cookies 🍪 <IconButton aria-label="Chiudi popup" style={{float:'right'}} onClick={closePopup}><CloseIcon color="primary"></CloseIcon></IconButton></DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Sul nostro sito utilizziamo cookies tecnici ed analitici. Questi sono necessari per il corretto funzionamento del nostro sito e per fornirci informazioni su come viene utilizzato.
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button variant='outlined' aria-label="Impostazioni cookie" onClick={goToImpostazioni}>Impostazioni</Button>
                <Button color="success" aria-label="Accetto Cookie" className={styles.PopupButtonSuccess} variant='contained' onClick={cookiesAcceptedFirtPopup}>Ho capito, accetto</Button>
                {/* <Button color="error" className={styles.PopupButtonError} variant='contained' onClick={closePopup}>Close</Button> */}
              </DialogActions>
              
            </Dialog>

            <Dialog open={isPopupSettingsOpened} onClose={handlePopupSettingsClose} fullWidth maxWidth="sm">
              <DialogTitle>Impostazioni dei cookies <IconButton style={{float:'right'}} onClick={closeSettingsPopup}><CloseIcon color="primary" title="Chiudi pannello cookies"></CloseIcon></IconButton></DialogTitle>
              <DialogContent>
                <Stack spacing={2} margin={2}>
                  {/* <FormControlLabel control={<Checkbox></Checkbox>} label="Agree terms & conditions"></FormControlLabel> */}
                  {/* <FormControlLabel control={<Checkbox></Checkbox>} label="Accetto termini e condizioni"></FormControlLabel> */}
                  <FormControlLabel control={<Checkbox defaultChecked disabled></Checkbox>} label="Tecnici"></FormControlLabel>
                  <span className={styles.TextAlignJustify}>I cookies tecnici sono essenziali per il corretto funzionamento di questo sito e vengono utilizzati per motivi legati alla navigazione, al salvataggio delle preferenze e al caricamento delle immagini.</span>
                  <FormControlLabel control={<Checkbox defaultChecked disabled></Checkbox>} label="Analitici"></FormControlLabel>
                  <span className={styles.TextAlignJustify}>I cookies analitici vengono utilizzati per analizzare e valutare le prestazioni di questo sito Web e fornire informazioni su come viene utilizzato. I dati raccolti tramite questi cookies vengono aggregati per eseguire delle analisi e sono utilizzati per miglioramenti ed ottimizzazioni.</span>
                  <FormControlLabel control={<Checkbox></Checkbox>} label="Marketing"></FormControlLabel>
                  <span className={styles.TextAlignJustify}>I cookies di marketing vengono utilizzati per tracciare i visitatori sui siti Web. Li utilizziamo per mostrare annunci pertinenti e coinvolgenti per il singolo utente e quindi di maggior valore per editori ed inserzionisti terzi.</span>
                </Stack>
              </DialogContent>

              <DialogActions>
                <Button color="success" className={styles.PopupButtonSuccess} variant='contained' onClick={cookiesAcceptedPopupSettings}  aria-label="Naviga con i cookies selezionati" title="Title">Naviga con i cookies selezionati</Button>
              </DialogActions>
              
            </Dialog>
            {/* title */}
            <motion.h1
              variants={fadeIn('down', 0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='h1'
            >
              Consulenza e <br /> Formazione{' '}
              <span className='text-accent'>Microsoft</span>
            </motion.h1>
            {/* subtitle */}
            <motion.p
              variants={fadeIn('down', 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
            >
              
              <span className='text-lg font-bold'>
                Dal 2014, plasmiamo il futuro delle aziende con soluzioni su misura, pensate per vincere ogni sfida. </span>
              <span className='text-lg'>Grazie al nostro supporto, le aziende ottimizzano i processi, migliorano l&apos;efficienza operativa e ottengono risultati concreti e duraturi, mantenendosi sempre un passo avanti. </span>
              <span className='text-lg'>Tutto questo è reso possibile dalla formazione e dallo sviluppo che offriamo attraverso i nostri collaboratori, esperti nelle tecnologie più avanzate di Microsoft. </span>
              <span className='text-lg'>Dall&apos;utilizzo della scalabilità di <span className='text-accent font-bold'>Azure Cloud</span> alla creazione di soluzioni dinamiche ed innovative con <span className='text-accent font-bold'>Microsoft Power Platform</span> fino all&apos;ottimizzazione della collaborazione aziendale con <span className='text-accent font-bold'>Microsoft SharePoint Online</span>, forniamo le competenze indispensabili per trasformare il tuo team in un motore di innovazione. </span>
              <span className='text-lg font-bold'> La nostra missione? Trasformare le sfide in opportunità. </span>
              <span className='text-lg'>Con programmi formativi personalizzati, facciamo della tecnologia un vero vantaggio strategico per il tuo successo.</span>
            </motion.p>
          </div>
        </div>
        {/* image */}
        <div className='w-[1200px] h-full absolute -right-40 bottom-0'>

          {/* bg img */}
          <div className='bg-none xl:bg-explosion xl:bg-auto xl:bg-center xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0' style={{ backgroundSize: '35%' }}></div>
          {/* particles */}
          <ParticlesContainer />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
