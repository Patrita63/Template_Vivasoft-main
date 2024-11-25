// next image
import Image from 'next/image';
import Head from 'next/head'; // Importa il componente Head di Next.js

// components
import LayoutEnUs from '../../components/LayoutEnUs';
import ParticlesContainer from '../../components/ParticlesContainer';
import ProjectsBtn from '../../components/ProjectsBtn';

// framer motion
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '../../variants';

import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    window.localStorage.setItem("isLanguageIta", 'false');
  }, [])

  return (
    <LayoutEnUs>
      <Head>
        <title>VivaSoft Consulting and Learning</title>
        <meta
          name="description"
          content="We are a company specialized in consulting and training with Microsoft technology. We offer innovative solutions and we have been operating since 2014, ready to face new challenges."
        />
        <meta name="keywords" content="App Power Apps , Power BI e Power Automate, consulenza, formazione, Microsoft" />
        <meta name="author" content="Vivasoft" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
              Consulting and <br /> Learning{' '}
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
              Since 2014 we have been transforming the future of companies with innovative solutions to overcome every challenge by helping them optimize business processes. 
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
    </LayoutEnUs>
  );
};

export default Home;
