// components
import Layout from '../../../components/Layout';
import ServiceSlider from '../../../components/ServiceSlider';
import Head from 'next/head'; // Importa il componente Head di Next.js

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../../variants';

const ItConsulting = () => {
  return (
    <Layout>
      <Head>
        <title>Vivasoft - Servizi Microsoft IT</title>
        <meta name="description" content="Offriamo consulenza IT e soluzioni avanzate per ottimizzare i processi aziendali con Microsoft Power Apps, Power BI e altro." />
        <meta name="keywords" content="Vivasoft, soluzioni IT, Microsoft 365 Power Apps, Power BI, Power Automate, consulenza IT, certificazioni Microsoft, Azure, SharePoint, certificazioni Microsoft, AZ-305, AZ-204, AZ-104, AZ-400, AZ-220, AZ-900, AI-900, AI-102, DP-100, PL-200, PL-300,PL-400,PL-500, PL-600, PL-900, MS-900, CKA, CKAD" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Vivasoft - Servizi Microsoft IT" />
        <meta property="og:description" content="Scopri i nostri servizi di consulenza IT e le soluzioni Microsoft per aziende." />
        <meta property="og:image" content="/images/vivasoft-logo.jpg" />
        <meta property="og:url" content="https://www.vivasoft.it/itconsulting" />
      </Head>
    <div className='h-full bg-primary py-40 flex items-center bg-gradient-to-r from-primary via-black/30 to-black/10'>
      
      <div className='container mx-auto'>
        <div className='flex flex-col xl:flex-row gap-x-8'>
          {/* text */}
          <div className='text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0 xl:pt-20 pt-60'>
            <motion.h2
              variants={fadeIn('up', 0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='h2'
            >
             I nostri <span className='text-accent' style={{fontSize:'48px'}}>Servizi di consulenza IT</span>
            </motion.h2>
            <motion.p
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='mb-4 max-w-[400px] mx-auto lg:mx-0'
            >
              <span className='text-lg font-bold'>Siamo un&apos;azienda IT specializzata nello sviluppo di soluzioni personalizzate</span> utilizzando le più avanzate tecnologie Microsoft.<span className='text-lg font-bold'> Con passione e competenza,</span> ci dedichiamo a creare prodotti su misura per le esigenze dei nostri clienti, che spaziano da applicazioni aziendali su misura a sistemi complessi integrati. Il nostro obiettivo è offrire soluzioni concrete e innovative, che ottimizzano i processi aziendali e massimizzano l&apos;efficienza, sfruttando appieno le potenzialità delle tecnologie Microsoft.
            </motion.p>
          </div>

          {/* slider */}
          <motion.div
            variants={fadeIn('down', 0.6)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='w-full xl:max-w-[65%]'
          >
            <ServiceSlider />
          </motion.div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ItConsulting;
