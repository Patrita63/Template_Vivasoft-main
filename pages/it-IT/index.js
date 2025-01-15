import * as React from 'react';
import { useEffect, useState } from 'react';

// next image
import Head from 'next/head'; // Importa il componente Head di Next.js
// import Image from 'next/image';

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
  const [isCookiesAccepted, setIsCookiesAccepted] = useState(false);
  const [isPopupOpened, setIsPopupOpened]=useState(false);
  const [isPopupSettingsOpened, setIsPopupSettingsOpened]=useState(false);
  
  useEffect(() => {
    window.localStorage.setItem("isLanguageIta", 'true');
    debugger;
    
    const isPopupToShow = Boolean(window.localStorage.getItem("isCookiesAccepted"));
    console.log('isPopupToShow: ' + isPopupToShow);
    setIsCookiesAccepted(isPopupToShow);

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
    localStorage.setItem("isCookiesAccepted", true);
    setIsPopupOpened(false);
  } 

  const goToImpostazioni = () =>{
    setIsPopupSettingsOpened(true);
  } 

  const closeSettingsPopup = () =>{
    setIsPopupSettingsOpened(false);
  } 

  const cookiesAcceptedPopupSettings = () =>{
    localStorage.setItem("isCookiesAccepted", true);
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
          content="Siamo un'azienda specializzata in consulenza e formazione con tecnologia Microsoft. Offriamo soluzioni innovative e siamo operativi dal 2014, pronti ad affrontare nuove sfide."
        />
        <meta name="keywords" content="Microsoft Azure, Microsoft 365, Microsoft Power Platform, Microsoft Power Apps, Microsoft Power BI, Microsoft Power Automate, Consulenza, Formazione, Microsoft" />
        <meta name="author" content="Vivasoft" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/favicon.ico?v=1" rel="shortcut icon" type="image/x-icon"></link>
      </Head>
      <div className='bg-primary/60 h-full'>
        {/* text */}
        <div className='w-full h-full bg-gradient-to-r from-primary via-black/30 to-black/10 py-80'>
          <div className='text-center flex flex-col justify-center  xl:text-left h-full container mx-auto xl:pt-0 pt-20'>
            {/* Modal popup MUI fullScreen in <Dialog */}
            <Dialog open={isPopupOpened} onClose={handleClose} fullWidth maxWidth="sm">
              <DialogTitle>Questo sito utilizza cookies <IconButton style={{float:'right'}} onClick={closePopup}><CloseIcon color="primary"></CloseIcon></IconButton></DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Sul nostro sito utilizziamo cookies tecnici ed analitici. Questi sono necessari per il corretto funzionamento del nostro sito e per fornirci informazioni su come viene utilizzato.
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button variant='outlined' onClick={goToImpostazioni}>Impostazioni</Button>
                <Button color="success" className={styles.PopupButtonSuccess} variant='contained' onClick={cookiesAcceptedFirtPopup}>Ho capito, accetto</Button>
                {/* <Button color="error" className={styles.PopupButtonError} variant='contained' onClick={closePopup}>Close</Button> */}
              </DialogActions>
              
            </Dialog>

            <Dialog open={isPopupSettingsOpened} onClose={handlePopupSettingsClose} fullWidth maxWidth="sm">
              <DialogTitle>Impostazioni dei cookies <IconButton style={{float:'right'}} onClick={closeSettingsPopup}><CloseIcon color="primary"></CloseIcon></IconButton></DialogTitle>
              <DialogContent>
                <Stack spacing={2} margin={2}>
                  {/* <FormControlLabel control={<Checkbox></Checkbox>} label="Agree terms & conditions"></FormControlLabel> */}
                  {/* <FormControlLabel control={<Checkbox></Checkbox>} label="Accetto termini e condizioni"></FormControlLabel> */}
                  <FormControlLabel control={<Checkbox defaultChecked disabled></Checkbox>} label="Tecnici"></FormControlLabel>
                  <span className={styles.TextAlignJustify}>I cookie tecnici sono essenziali per il corretto funzionamento di questo sito e vengono utilizzati per motivi legati alla navigazione, al salvataggio delle preferenze e al caricamento delle immagini.</span>
                  <FormControlLabel control={<Checkbox defaultChecked disabled></Checkbox>} label="Analitici"></FormControlLabel>
                  <span className={styles.TextAlignJustify}>I cookie analitici vengono utilizzati per analizzare e valutare le prestazioni di questo sito Web e fornire informazioni su come viene utilizzato. I dati raccolti tramite questi cookies vengono aggregati per eseguire delle analisi e sono utilizzati per miglioramenti ed ottimizzazioni.</span>
                  <FormControlLabel control={<Checkbox></Checkbox>} label="Marketing"></FormControlLabel>
                  <span className={styles.TextAlignJustify}>I cookie di marketing vengono utilizzati per tracciare i visitatori sui siti Web. Li utilizziamo per mostrare annunci pertinenti e coinvolgenti per il singolo utente e quindi di maggior valore per editori ed inserzionisti terzi.</span>
                </Stack>
              </DialogContent>

              <DialogActions>
                <Button color="success" className={styles.PopupButtonSuccess} variant='contained' onClick={cookiesAcceptedPopupSettings}>Naviga con i cookies selezionati</Button>
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
              initial='hidden'
              animate='show'
              exit='hidden'
              className='max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16'
            >
              Dal 2014, trasformiamo il futuro delle aziende con 
              soluzioni innovative e personalizzate, 
              progettate per affrontare e vincere ogni sfida. 
              Con il nostro supporto, ottimizzano i processi aziendali, migliorano operatività e raggiungono risultati duraturi, rimanendo sempre un passo avanti.
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
