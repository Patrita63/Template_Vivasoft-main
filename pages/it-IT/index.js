// next image
import Head from 'next/head'; // Importa il componente Head di Next.js

// components
import Layout from '../../components/Layout';
import ParticlesContainer from '../../components/ParticlesContainer';

// framer motion
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '../../variants';

import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    window.localStorage.setItem("isLanguageIta", 'true');
  }, [])
  

  return (
    <Layout>
      <Head>
        <title>VivaSoft Consulenza e Formazione</title>
        <meta
          name="description"
          content="Siamo un'azienda specializzata in consulenza e formazione con tecnologia Microsoft. Offriamo soluzioni innovative e siamo operativi dal 2014, pronti ad affrontare nuove sfide."
        />
        <meta name="keywords" content="App Power Apps , Power BI e Power Automate, consulenza, formazione, Microsoft" />
        <meta name="author" content="Vivasoft" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/favicon.ico?v=1" rel="shortcut icon" type="image/x-icon"></link>
      </Head>
      <div className='bg-primary/60 h-full'>
        {/* text */}
        <div className='w-full h-full bg-gradient-to-r from-primary via-black/30 to-black/10 pt-40'>
          <div className='text-center flex flex-col justify-center  xl:text-left h-full container mx-auto'>
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
              Dal 2014 trasformiamo il futuro delle Aziende con soluzioni innovative per vincere ogni sfida aiutandole ad ottimizzare i processi aziendali. 
            </motion.p>
          </div>
        </div>
        {/* image */}
        <div className='w-[1200px] h-full absolute right-0 bottom-0'>
          {/* bg img */}
          <div className='bg-none xl:bg-explosion xl:bg-auto xl:bg-center xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0'></div>
          {/* particles */}
          <ParticlesContainer />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
