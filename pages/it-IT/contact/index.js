// components
import Layout from '../../../components/Layout';
// import Circles from '/components/Circles';
import Head from 'next/head'; // Importa il componente Head di Next.js

// icons
import { BsArrowRight } from 'react-icons/bs';

// framer
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '../../../variants';

import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Typography,
  Radio,
  RadioGroup,
  FormControl, FormGroup, InputLabel, Input, styled, FormHelperText, Autocomplete, FormControlLabel, FormLabel,
  CircularProgress
} from "@mui/material";

import { useState, useEffect } from 'react';

// https://nextjs.org/docs/pages/api-reference/functions/use-router
import { useRouter } from 'next/router';
// import { NextResponse, NextRequest } from 'next/server'
// https://nextjs.org/docs/pages/building-your-application/routing/redirecting


const Contact = () => {
  const [loading, setLoading] = useState(false); // Track loading state
  // To navigate to another page
  const router = useRouter();

  let [fullname, setFullname] = useState('');
  let [mailAddress, setMailAddress] = useState('');
  let [mailSubject, setMailSubject] = useState('');
  let [mailBody, setMailBody] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setFullname('Patrizio Tardiolo Bonifazi');
    setMailAddress('p.tardiolobonifazi@vivasoft.it');
    setMailSubject('Invio Mail');
    setMailBody('Test from Contact');
  }, [])

  const nominativoInputChangedHandler = (event) => {
    /* console.log('nominativoInputFunction (event.target.value) = ' + event.target.value);
    debugger;
    fullname = event.target.value;
    console.log('nominativoInputFunction (fullname) = ' + fullname); */
    setFullname(event.target.value);
  }

  const mailAddressInputChangedHandler = (event) => {

    setMailAddress(event.target.value);
  }

  const mailSubjectInputChangedHandler = (event) => {

    setMailSubject(event.target.value);
  }

  const mailBodyInputChangedHandler = (event) => {

    setMailBody(event.target.value);
  }

  // const sendEmailAZ = async (fullname, mailAddress, mailSubject, mailBody) => {
  const sendEmailAZ = async (event) => {
    debugger;

    event.preventDefault();
    console.log(event.target);
    setLoading(true); // Start loading spinner
    // debugger;
    const dataMailFullName = fullname; // event.target.form[0].value; // event.target.nominativo.value;
    // alert('Nominativo = ' + dataMailFullName);
    const dataMailAddress = mailAddress; //event.target.form[1].value; //event.target.email.value;
    const dataMailSubject = mailSubject; //event.target.form[2].value; //event.target.subject.value;

    const body = `${dataMailFullName}  has sent an email from ${dataMailAddress} - Subject: ${dataMailSubject} - Body: ${mailBody}`
    // alert(body);

    const dataMailBody = body; // event.target.form[3].value; //event.target.body.value;
    console.log(`📧 Sending email: ${dataMailAddress}, Subject: ${dataMailSubject}, Body: ${body}, FullName: ${dataMailBody}`);

    try {
      const response = await fetch('/api/sendemail-acsazure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toEmail: mailAddress, subject: mailSubject, body: dataMailBody })
      });

      console.log("📤 API Response:", response);

      const result = await response.json();
      console.log("📩 API Result:", result);

      if (response.ok) {
        setLoading(false); // Stop loading
        setMessage('✅ Email sent successfully!');
        // Redirect to home page 
        router.push("/it-IT");
      } else {
        setLoading(false); // Stop loading
        console.error(`❌ Email failed: ${result.error || 'Unknown error'}`);
        setMessage(`❌ Failed to send email: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      setLoading(false); // Stop loading
      console.error("❌ Error in fetch:" + error.message);
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <Layout>
      <Head>
        <title>Vivasoft - Contattaci per soluzioni IT e Microsoft</title>
        <meta name="description" content="Hai domande? Contatta Vivasoft per ricevere consulenze su soluzioni IT, Power Apps, Power BI, Power Automate, e molto altro. Siamo qui per aiutarti." />
        <meta name="keywords" content="contatti Vivasoft, supporto IT, consulenza IT, soluzioni Microsoft, Power Apps, Power BI, Power Automate,C#, Python, React, assistenza clienti" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Vivasoft - Contattaci per soluzioni IT e Microsoft" />
        <meta property="og:description" content="Contattaci oggi per ricevere supporto sui nostri servizi IT, consulenze su Power Apps, Power BI, Power Automate e altre soluzioni Microsoft." />
        <meta property="og:image" content="/images/vivasoft-logo.jpg" />
        <meta property="og:url" content="https://www.vivasoft.it/contact" />
      </Head>
      <div className='h-full bg-primary py-40'>
        <div className='container mx-auto  text-center xl:text-left flex items-center justify-center overflow-hidden h-full'>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Spinner Overlay */}
            {loading && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  zIndex: 2,
                }}
              >
                <CircularProgress />
              </Box>
            )}

            {/* text & form */}
            <div className='flex flex-col w-full max-w-[700px] xl:pt-0 pt-20'>

              {/* text */}
              <motion.h2
                variants={fadeIn('up', 0.2)}
                initial='hidden'
                animate='show'
                exit='hidden'
                className='h2 text-center mt-40 xl:mt-5'
              >
                Richiedi<span className='text-accent'> info</span>
              </motion.h2>
              {/* form */}

              <motion.form
                variants={fadeIn('up', 0.4)}
                initial='hidden'
                animate='show'
                exit='hidden'
                className='flex-1 flex flex-col gap-6 w-full mx-auto'
              >

                {/* input group */}
                <div className='flex gap-x-6 w-full'>
                  <input type='text' placeholder='nome e cognome' name='nominativo' className='input' defaultValue={fullname} onChange={(event) => nominativoInputChangedHandler(event)} />
                  <input type='text' placeholder='email' name='email' className='input' defaultValue={mailAddress} onChange={(event) => mailAddressInputChangedHandler(event)} />
                </div>
                <input type='text' placeholder='soggetto' name='subject' className='input' defaultValue={mailSubject} onChange={(event) => mailSubjectInputChangedHandler(event)} />
                <textarea placeholder='messaggio' name='body' className='textarea xl:h-full h-20' defaultValue={mailBody} onChange={(event) => mailBodyInputChangedHandler(event)}></textarea>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="gdpr-checkbox"
                    className="accent-accent"

                  />
                  <label htmlFor="gdpr-checkbox" className="text-sm">
                    Acconsento al trattamento dei miei dati personali in conformità con la{' '}
                    <a href="/privacy-policy" className="text-accent" target="_blank">
                      Policy Privacy
                    </a>.
                  </label>
                </div>

                <button onClick={(event) => sendEmailAZ(event)} className='btn rounded-full border border-white/50 w-full px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group' aria-label="Invia email" >
                  <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
                    Invia
                  </span>
                  <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
                </button>

                {/* Mappa di Google */}
                <h3 className="mt-20 text-center text-2xl h3 text-accent">Dove <span className='text-white'>trovarci</span></h3>
                <div className="my-5 relative w-full">
                  <iframe
                    width="100%"
                    title="Mappa google"
                    height="400"
                    style={{
                      border: '4px solid #D1660C',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
                    }}
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBSVFfjhxqyHKGTAxKBfEX624qK_hkT_pc&q=Ing. Tardiolo Bonifazi Patrizio, Via+Copenaghen+10,Roma"
                    allowFullScreen
                    aria-hidden="false"
                    tabIndex="0"
                  ></iframe>
                </div>
              </motion.form>
            </div>
          </Box>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
