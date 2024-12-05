import * as React from 'react';
import { useEffect, useState } from 'react';

// next image
import Head from 'next/head'; // Importa il componente Head di Next.js
// import Image from 'next/image';

import styles from './Popup.module.css';
// components
import LayoutEnUs from '../../components/LayoutEnUs';
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
    <LayoutEnUs>
      <Head>
        <title>Vivasoft Consulting and Learning</title>
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
          <div className='text-center flex flex-col justify-center  xl:text-left h-full container mx-auto'>
            {/* Modal popup MUI fullScreen in <Dialog */}
            <Dialog open={isPopupOpened} onClose={handleClose} fullWidth maxWidth="sm">
              <DialogTitle>This site uses cookies <IconButton style={{float:'right'}} onClick={closePopup}><CloseIcon color="primary"></CloseIcon></IconButton></DialogTitle>
              <DialogContent>
                <DialogContentText>
                On our site we use technical and analytical cookies. These are necessary for the correct functioning of our site and to provide us with information on how it is used.
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button variant='outlined' onClick={goToImpostazioni}>Settings</Button>
                <Button color="success" className={styles.PopupButtonSuccess} variant='contained' onClick={cookiesAcceptedFirtPopup}>I understand, I accept</Button>
                {/* <Button color="error" className={styles.PopupButtonError} variant='contained' onClick={closePopup}>Close</Button> */}
              </DialogActions>
              
            </Dialog>

            <Dialog open={isPopupSettingsOpened} onClose={handlePopupSettingsClose} fullWidth maxWidth="sm">
              <DialogTitle>Cookies settings<IconButton style={{float:'right'}} onClick={closeSettingsPopup}><CloseIcon color="primary"></CloseIcon></IconButton></DialogTitle>
              <DialogContent>
                <Stack spacing={2} margin={2}>
                  {/* <FormControlLabel control={<Checkbox></Checkbox>} label="Agree terms & conditions"></FormControlLabel> */}
                  {/* <FormControlLabel control={<Checkbox></Checkbox>} label="Accetto termini e condizioni"></FormControlLabel> */}
                  <FormControlLabel control={<Checkbox defaultChecked disabled></Checkbox>} label="Tecnici"></FormControlLabel>
                  <span className={styles.TextAlignJustify}>Technical cookies are essential for the correct functioning of this site and are used for reasons related to navigation, saving preferences and loading images.</span>
                  <FormControlLabel control={<Checkbox defaultChecked disabled></Checkbox>} label="Analitici"></FormControlLabel>
                  <span className={styles.TextAlignJustify}>Analytical cookies are used to analyze and evaluate the performance of this website and provide information on how it is used. The data collected through these cookies are aggregated to perform analyses and are used for improvements and optimizations.</span>
                  <FormControlLabel control={<Checkbox></Checkbox>} label="Marketing"></FormControlLabel>
                  <span className={styles.TextAlignJustify}>Marketing cookies are used to track visitors across websites. We use them to show ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.</span>
                </Stack>
              </DialogContent>

              <DialogActions>
                <Button color="success" className={styles.PopupButtonSuccess} variant='contained' onClick={cookiesAcceptedPopupSettings}>Browse with selected cookies</Button>
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
              Consulting services and <br /> Learning{' '}
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
              Since 2014, we have been transforming the future of companies with innovative and customized solutions, designed to face and overcome every challenge.
              With our support, they optimize business processes, improve operations and achieve lasting results, always staying one step ahead.
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
    </LayoutEnUs>
  );
};

export default Home;
