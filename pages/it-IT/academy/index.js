// components
import Layout from '../../../components/Layout';
import AcademySlider from '../../../components/AcademySlider';
import ParticlesContainer from '../../../components/ParticlesContainer';
import Head from 'next/head'; // Importa il componente Head di Next.js

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../../variants';

// icons
// import { BsArrowRight } from 'react-icons/bs';

const Academy = () => {
  return (
    <Layout>
       <Head>
        <title>Vivasoft Academy - Formazione Microsoft e Certificazioni</title>
        <meta name="description" content="Scopri i corsi di formazione offerti da Vivasoft Academy. Preparati per le certificazioni Microsoft con corsi su Power Apps, Power BI, Power Automate e altro." />
        <meta name="keywords" content="Vivasoft Academy, corsi Microsoft, formazione IT, certificazioni Microsoft, Power Apps, Power BI, Power Automate,C#, Python, React, formazione professionale" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Vivasoft Academy - Formazione Microsoft e Certificazioni" />
        <meta property="og:description" content="Vivi l'esperienza di Vivasoft Academy. Partecipa ai nostri corsi di formazione su Microsoft Power Apps, Power BI, Power Automate e ottieni le certificazioni ufficiali." />
        <meta property="og:image" content="/images/vivasoft-logo.jpg" />
        <meta property="og:url" content="https://www.vivasoft.it/academy" />
      </Head>
    <div className='h-full bg-primary py-60 flex items-center bg-gradient-to-r from-primary via-black/30 to-black/10'>
     
      <div className='container mx-auto'>
        <div className='flex flex-col xl:flex-row gap-x-8'>
          {/* particles */}
          <ParticlesContainer />
          {/* text */}
          <div className='text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0 xl:pt-0 pt-40'>
            <motion.h2
              variants={fadeIn('up', 0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='h2'
            >
              Vivasoft <span className='text-accent'>Academy</span>
            </motion.h2>
            <motion.p
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='mb-4 max-w-[400px] mx-auto lg:mx-0'
            >
              <span className='text-lg font-bold'>Creiamo soluzioni di formazione completa per le aziende,</span> progettando e gestendo <span className='text-secondary font-bold'>Academy Aziendali</span> su misura. Le nostre Academy sono ambienti di apprendimento esclusivi che rispondono alle esigenze di crescita professionale delle tue risorse, offrendo programmi formativi strutturati e innovativi.
              <span className='text-lg font-bold'> Formazione In Aula e Online:</span> La nostra formazione è disponibile sia in aula che tramite piattaforme online, offrendo flessibilità e comodità.
              <span className='text-lg font-bold'> Piani di Certificazione:</span> Aiutiamo le aziende a far certificare i propri dipendenti, ottenendo qualifiche che valorizzano il brand aziendale.
            </motion.p>
            {/* <button className='btn rounded-lg border border-white/50 w-full px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group'>
              <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
                Accedi
              </span>
              <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
            </button> */}
          </div>

          {/* slider */}
          <motion.div
            variants={fadeIn('down', 0.6)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='w-full xl:max-w-[65%]'
          >
            <div className=''>
               <AcademySlider />
            </div>
           
          </motion.div>
        </div>
      </div>
      
    </div>
    </Layout>
  );
};

export default Academy;
