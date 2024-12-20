// https://nextjs.org/docs/pages/api-reference/functions/use-router
import { useRouter } from 'next/router';
import { useState } from 'react';

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

const ContactPage = () => {
  const router = useRouter(); // Use Next.js router for redirection

  const [fullname, setFullname] = useState('Patrizio Tardiolo Bonifazi');
  const [mailAddress, setMailAddress] = useState('p.tardiolobonifazi@vivasoft.it');
  const [mailSubject, setMailSubject] = useState('Test Invio Mail');
  const [mailBody, setMailBody] = useState('Questo è un test ...');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendEmail = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname,
          mailAddress,
          mailSubject,
          mailBody,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Email sent successfully!');
        // Redirect to home page 
        router.push('/it-IT');
      } else {
        setMessage(`Failed to send email: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setMessage('An unexpected error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Layout>
      <Head>
        <title>Vivasoft - Contattaci per soluzioni IT e Microsoft</title>
        <meta name="description" content="Hai domande? Contatta Vivasoft per ricevere consulenze su soluzioni IT, Power Apps, Power BI, Power Automate, e molto altro. Siamo qui per aiutarti." />
        <meta name="keywords" content="contatti Vivasoft, supporto IT, consulenza IT, soluzioni Microsoft, Power Apps, Power BI, Power Automate, assistenza clienti" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Vivasoft - Contattaci per soluzioni IT e Microsoft" />
        <meta property="og:description" content="Contattaci oggi per ricevere supporto sui nostri servizi IT, consulenze su Power Apps, Power BI, Power Automate e altre soluzioni Microsoft." />
        <meta property="og:image" content="/images/vivasoft-logo.jpg" />
        <meta property="og:url" content="https://www.vivasoft.it" />
      </Head>
    <div className='h-full bg-primary py-40'>
      <div className='container mx-auto  text-center xl:text-left flex items-center justify-center overflow-hidden h-full'>
        {/* text & form */}
        <div className='flex flex-col w-full max-w-[700px] '>
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
                  <input type='text' placeholder='nome e cognome' name='nominativo' className='input' defaultValue={fullname} onChange={(e) => setFullname(e.target.value)}  />
                  <input type='text' placeholder='email' name='email' className='input' defaultValue={mailAddress} onChange={(e) => setMailAddress(e.target.value)} />
                </div>
                <input type='text' placeholder='soggetto' name='subject' className='input' defaultValue={mailSubject} onChange={(e) => setMailSubject(e.target.value)} />
                <textarea placeholder='messaggio' name='body' className='textarea xl:h-full h-20' defaultValue={mailBody} onChange={(e) => setMailBody(e.target.value)}></textarea>
                
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

                <button onClick={sendEmail} disabled={loading} className='btn rounded-full border border-white/50 w-full px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group' >
                  <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
                  {loading ? 'Sending...' : 'Send Email'}
                  </span>
                  <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
                </button>
                {message && <p>{message}</p>}

                {/* Mappa di Google */}
                <h3 className="mt-20 text-center text-2xl h3 text-accent">Dove <span className='text-white'>trovarci</span></h3>
                <div className="my-5 relative w-full">
                  <iframe
                    width="100%"
                    height="400"
                    style={{
                      border: '4px solid #D1660C', 
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)', }}
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBSVFfjhxqyHKGTAxKBfEX624qK_hkT_pc&q=Ing. Tardiolo Bonifazi Patrizio, Via+Copenaghen+10,Roma"
                    allowFullScreen
                    aria-hidden="false"
                    tabIndex="0"
                  ></iframe>
                </div>
            </motion.form>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ContactPage;
