import * as React from 'react';
import { useEffect, useState } from 'react';

// next image
import Head from 'next/head'; // Importa il componente Head di Next.js
// import Image from 'next/image';

import Cookies from "js-cookie";

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
  const [isPopupOpened, setIsPopupOpened]=useState(false);
  const [isPopupSettingsOpened, setIsPopupSettingsOpened]=useState(false);
  
  useEffect(() => {
    localStorage.setItem("isLanguageIta", 'true');
    // debugger;
    // const isPopupToShow = Boolean(localStorage.getItem("isCookiesAcceptedEN"));
    // Replace with:
    const isPopupToShow = Cookies.get("isCookiesAcceptedEN") === "true" ? true : false;
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
    // localStorage.setItem("isCookiesAcceptedEN", true);
    // Replace with:
    Cookies.set("isCookiesAcceptedEN", true);
    setIsPopupOpened(false);
  } 

  const goToImpostazioni = () =>{
    setIsPopupSettingsOpened(true);
  } 

  const closeSettingsPopup = () =>{
    setIsPopupSettingsOpened(false);
  } 

  const cookiesAcceptedPopupSettings = () =>{
    // localStorage.setItem("isCookiesAcceptedEN", true);
    // Replace with:
    Cookies.set("isCookiesAcceptedEN", true);
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
          content="Since 2014, we have been shaping the future of companies with tailor-made solutions designed to overcome every challenge.Thanks to our support, companies optimize processes, improve operational efficiency and achieve concrete and lasting results, always staying one step ahead. All this is made possible by the training and development we offer through our employees, experts in the most advanced technologies of Microsoft.From the use of the scalability of Azure Cloud to the creation of dynamic and innovative solutions with Microsoft Power Platform to the optimization of business collaboration with Microsoft SharePoint Online, We provide the skills you need to turn your team into an engine of innovation.Our mission? Turn challenges into opportunities.With customized training programs, we make technology a strategic advantage for your success."
        />
        <meta name="keywords" content="Microsoft Azure, Microsoft 365, Microsoft Power Platform, Microsoft Power Apps, Microsoft Power BI, Microsoft Power Automate, Consulting, Learning, Microsoft" />
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
              <DialogTitle>Our website is sweeter with cookies 🍪<IconButton aria-label="Chiudi popup" style={{float:'right'}} onClick={closePopup}><CloseIcon color="primary"></CloseIcon></IconButton></DialogTitle>
              <DialogContent>
                <DialogContentText>
                On our site we use technical and analytical cookies. These are necessary for the proper functioning of our website and to provide us with information about how it is used.
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button variant='outlined' aria-label="Cookies settings" onClick={goToImpostazioni}>Settings</Button>
                <Button color="success" aria-label="I accept  Cookies" className={styles.PopupButtonSuccess} variant='contained' onClick={cookiesAcceptedFirtPopup}>I understand, I accept</Button>
                {/* <Button color="error" className={styles.PopupButtonError} variant='contained' onClick={closePopup}>Close</Button> */}
              </DialogActions>
              
            </Dialog>

            <Dialog open={isPopupSettingsOpened} onClose={handlePopupSettingsClose} fullWidth maxWidth="sm">
              <DialogTitle>Cookies settings <IconButton style={{float:'right'}} onClick={closeSettingsPopup}><CloseIcon color="primary" title="Close cookies panel"></CloseIcon></IconButton></DialogTitle>
              <DialogContent>
                <Stack spacing={2} margin={2}>
                  {/* <FormControlLabel control={<Checkbox></Checkbox>} label="Agree terms & conditions"></FormControlLabel> */}
                  {/* <FormControlLabel control={<Checkbox></Checkbox>} label="Accetto termini e condizioni"></FormControlLabel> */}
                  <FormControlLabel control={<Checkbox defaultChecked disabled></Checkbox>} label="Technical"></FormControlLabel>
                  <span className={styles.TextAlignJustify}>Technical cookies are essential for the proper functioning of this site and are used for reasons related to navigation, saving preferences and loading images.</span>
                  <FormControlLabel control={<Checkbox defaultChecked disabled></Checkbox>} label="Analytical"></FormControlLabel>
                  <span className={styles.TextAlignJustify}>Analytical cookies are used to analyze and evaluate the performance of this website and provide information about how it is used. The data collected by these cookies are aggregated for analysis and used for improvements and optimizations.</span>
                  <FormControlLabel control={<Checkbox></Checkbox>} label="Marketing"></FormControlLabel>
                  <span className={styles.TextAlignJustify}>Marketing cookies are used to track visitors on websites. We use them to show ads that are relevant and engaging for the individual user and therefore of greater value to third-party publishers and advertisers.</span>
                </Stack>
              </DialogContent>

              <DialogActions>
                <Button color="success" className={styles.PopupButtonSuccess} variant='contained' onClick={cookiesAcceptedPopupSettings}  aria-label="Browse with cookies selected" title="Title">Browse with cookies selected</Button>
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
              Consulting and <br /> Training {' '}
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
              Since 2014, we have been shaping the future of companies with tailor-made solutions designed to meet every challenge.  </span>
              <span className='text-lg'>Thanks to our support, companies optimize processes, improve operational efficiency and achieve concrete and lasting results, always staying one step ahead. </span>
              <span className='text-lg'>All this is made possible by the training and development that we offer through our collaborators, experts in the most advanced technologies of Microsoft. </span>
              <span className='text-lg'>rom using the scalability of <span className='text-accent font-bold'>Azure Cloud</span> to creating dynamic and innovative solutions with  <span className='text-accent font-bold'>Microsoft Power Platform</span> to optimizing business collaboration with <span className='text-accent font-bold'>Microsoft SharePoint Online</span>, We provide the skills you need to turn your team into an engine of innovation. </span>
              <span className='text-lg font-bold'> Our mission? Turning challenges into opportunities. </span>
              <span className='text-lg'>With customized training programs, we make technology a real strategic advantage for your success.</span>
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
