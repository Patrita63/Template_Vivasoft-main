// components
import Layout from '../../../components/Layout';
import TestimonialSlider from '../../../components/TestimonialSlider';
import Head from 'next/head'; // Importa il componente Head di Next.js

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../../variants';

const Testimonials = () => {
  return (
    <Layout>
      <Head>
        <title>Vivasoft - Dicono di noi</title>
        <meta name="description" content="Scopri cosa dicono i nostri clienti. Dal 2014, Vivasoft ha aiutato numerose aziende a ottimizzare i processi aziendali grazie alle soluzioni Microsoft innovative come Power Apps, Power BI e Power Automate." />
        <meta name="keywords" content="Vivasoft, Dicono di noi, testimonianze clienti, soluzioni IT, Microsoft Power Apps, Power BI, Power Automate, consulenza IT, certificazioni Microsoft" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Vivasoft - Dicono di noi" />
        <meta property="og:description" content="Leggi le testimonianze di chi ha scelto Vivasoft per ottimizzare i propri processi aziendali con soluzioni basate su piattaforme Microsoft." />
        <meta property="og:image" content="/images/vivasoft-logo.jpg" />
        <meta property="og:url" content="https://www.vivasoft.it/testimonials" />
      </Head>
    <div className='h-full bg-primary py-60 text-center'>
      <div className='container mx-auto h-full flex flex-col justify-center overflow-hidden'>
        {/* title */}
        <motion.h2
          variants={fadeIn('up', 0.2)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='h2 mb-8 pt-20 xl:pt-0 xl:mb-0'
        >
          Dicono di<span className='text-accent'> noi</span>
        </motion.h2>
        {/* slider */}
        <motion.div
          variants={fadeIn('up', 0.4)}
          initial='hidden'
          animate='show'
          exit='hidden'
        >
          <TestimonialSlider />
        </motion.div>
      </div>
    </div>
    </Layout>
  );
};

export default Testimonials;
