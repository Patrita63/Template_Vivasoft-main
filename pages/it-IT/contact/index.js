import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import Head from 'next/head';
// components
import Layout from '../../../components/Layout';
import { BsArrowRight } from 'react-icons/bs';

// Particelle
import ParticlesContainer from '../../../components/ParticlesContainer';

// ✅ Validation Schema with Yup
const validationSchema = yup.object().shape({
  nominativo: yup.string().required('Nome e cognome sono obbligatori'),
  email: yup.string().email('Inserisci un indirizzo email valido').required('L’email è obbligatoria'),
  subject: yup.string().required('Il soggetto è obbligatorio'),
  body: yup.string().required('Il messaggio non può essere vuoto'),
  privacyPolicy: yup.boolean().oneOf([true], 'Devi accettare la Policy Privacy'),
});

// https://nextjs.org/docs/pages/api-reference/functions/use-router
import { useRouter } from 'next/router';
// import { NextResponse, NextRequest } from 'next/server'
// https://nextjs.org/docs/pages/building-your-application/routing/redirecting


const Contact = () => {
  const [loading, setLoading] = useState(false); // Track loading state
  // To navigate to another page
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange' // Ensures validation updates on user input
  });

  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true); // Start loading spinner
    console.log('Form Data:', data);

    // API call
    await sendEmailAZ(data);
  };

  // const sendEmailAZ = async (fullname, mailAddress, mailSubject, mailBody) => {
  const sendEmailAZ = async (data) => {
    debugger;

    const dataMailFullName = data.nominativo;
    const dataMailAddress = data.email;
    const dataMailSubject = data.subject;
    const dataPrivacyPolicy = data.privacyPolicy;

    const body = `${dataMailFullName}  has sent an email from ${dataMailAddress} - Subject: ${dataMailSubject} - Body: ${data.body} - Privacy Policy Accepted: ${dataPrivacyPolicy}`
    // alert(body);

    const dataMailBody = body;
    console.log(`📧 Sending email: ${dataMailAddress}, Subject: ${dataMailSubject}, Body: ${body}, FullName: ${dataMailBody}`);

    try {
      const response = await fetch('/api/sendemail-acsazure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toEmail: process.env.NEXT_PUBLIC_AZURE_MAIL_TO, subject: dataMailSubject, body: dataMailBody })
      });

      console.log("📤 API Response:", response);

      const result = await response.json();
      console.log("📩 API Result:", result);

      if (response.ok) {
        reset(); // Reset form on success
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
      {/* <div className="h-full bg-primary py-40">
        <div className="container mx-auto text-center xl:text-left flex items-center justify-center h-full"> */}
      <div className='h-full bg-primary xl:py-40 py-80 text-center xl:text-left bg-gradient-to-r from-primary via-black/30 to-black/10'>
        {/* particles */}
        <ParticlesContainer />
        <div className='container mx-auto relative text-center xl:text-left flex items-center justify-center overflow-hidden h-full'>
          {/* text & form */}
          <div className='flex flex-col w-full max-w-[700px] xl:pt-0 pt-20'>
            {/* text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col w-full max-w-[700px] xl:pt-0 pt-20"
            >
              <motion.h2 className="h2 text-center mt-40 xl:mt-5">
                Richiedi<span className="text-accent"> info</span>
              </motion.h2>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full mx-auto">
                {/* Input Group */}
                <div className="flex gap-x-6 w-full">
                  <div className="w-1/2">
                    <input {...register('nominativo')} type="text" placeholder="Nome e cognome" className="input" />
                    {errors.nominativo && <p className="text-red-500 text-sm">{errors.nominativo.message}</p>}
                  </div>
                  <div className="w-1/2">
                    <input {...register('email')} type="text" placeholder="Email" className="input" />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>
                </div>

                <input {...register('subject')} type="text" placeholder="Soggetto" className="input" />
                {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}

                <textarea {...register('body')} placeholder="Messaggio" className="textarea xl:h-full h-20"></textarea>
                {errors.body && <p className="text-red-500 text-sm">{errors.body.message}</p>}

                {/* GDPR Checkbox */}
                <div className="flex items-center space-x-2">
                  <input type="checkbox" {...register('privacyPolicy')} id="gdpr-checkbox" className="accent-accent" />
                  <label htmlFor="gdpr-checkbox" className="text-sm">
                    Acconsento al trattamento dei miei dati personali in conformità con la{' '}
                    <a href="/privacy-policy" className="text-accent" target="_blank">Policy Privacy</a>.
                  </label>
                </div>
                {errors.privacyPolicy && <p className="text-red-500 text-sm">{errors.privacyPolicy.message}</p>}

                {/* Submit Button with Loader */}
                <button
                  type="submit"
                  disabled={!isValid || loading} // Disabled when form is invalid
                  className={`btn rounded-lg border border-white/50 w-full px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group ${!isValid || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  aria-label="Invia email"
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : (
                    <>
                      <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">Invia</span>
                      <BsArrowRight className="absolute -translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 text-[22px]" />
                    </>
                  )}
                </button>
              </form>

              {/* Google Maps */}
              <h3 className="mt-20 text-center text-2xl h3 text-accent">Dove <span className="text-white">trovarci</span></h3>
              <div className="my-5 relative w-full">
                <iframe
                  width="100%"
                  title="Mappa google"
                  height="400"
                  style={{ border: '4px solid #D1660C', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=Ing. Tardiolo Bonifazi Patrizio, Via+Copenaghen+10,Roma`}
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
