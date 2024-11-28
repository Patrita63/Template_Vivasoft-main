// components
import Layout from '../../../components/Layout';
import ServiceSlider from '../../../components/ServiceSlider';
import Head from 'next/head'; // Importa il componente Head di Next.js

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../../variants';

const Services = () => {
  return (
    <Layout>
      <Head>
        <title>Vivasoft - Servizi Microsoft IT</title>
        <meta name="description" content="Offriamo consulenza IT e soluzioni avanzate per ottimizzare i processi aziendali con Microsoft Power Apps, Power BI e altro." />
        <meta name="keywords" content="Vivasoft, soluzioni IT, Microsoft 365 Power Apps, Power BI, Power Automate, consulenza IT, certificazioni Microsoft, Azure, SharePoint" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Vivasoft - Servizi Microsoft IT" />
        <meta property="og:description" content="Scopri i nostri servizi di consulenza IT e le soluzioni Microsoft per aziende." />
        <meta property="og:image" content="/images/vivasoft-logo.jpg" />
        <meta property="og:url" content="https://www.vivasoft.it/services" />
      </Head>
    <div className='h-full bg-primary py-40 flex items-center bg-gradient-to-r from-primary via-black/30 to-black/10'>
      
      <div className='container mx-auto'>
        <div className='flex flex-col xl:flex-row gap-x-8'>
          {/* text */}
          <div className='text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0'>
            <motion.h2
              variants={fadeIn('up', 0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='h2 pt-40'
            >
             I nostri <span className='text-accent'>Servizi</span>
            </motion.h2>
            <motion.p
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='mb-4 max-w-[400px] mx-auto lg:mx-0'
            >
              Ci dedichiamo con passione e professionalità alla formazione dei professionisti e delle aziende, 
              aiutandole a trasformare le proprie idee in soluzioni concrete. 
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

export default Services;
