// components
import LayoutEnUs from '../../../components/LayoutEnUs';
import ServiceSliderEnUs from '../../../components/ServiceSliderEnUs';
import Head from 'next/head'; // Importa il componente Head di Next.js

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../../variants';

const ItConsulting = () => {
  return (
    <LayoutEnUs>
      <Head>
        <title>Vivasoft - Microsoft IT services</title>
        <meta name="description" content="We offer IT consulting and advanced solutions to optimize business processes with Microsoft Power Apps, Power BI and more." />
        <meta name="keywords" content="Vivasoft, IT solutions, Microsoft 365 Power Apps, Power BI, Power Automate, IT consulting, Microsoft certifications, Azure, SharePoint, Microsoft certifications, AZ-305, AZ-204, AZ-104, AZ-400, AZ-220, AZ-900, AI-900, AI-102, DP-100, PL-200, PL-300,PL-400,PL-500, PL-600, PL-900, MS-900, CKA, CKAD" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Vivasoft - Microsoft IT services" />
        <meta property="og:description" content="Discover our IT consulting services and Microsoft solutions for businesses." />
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
             Ours <span className='text-accent'><small>IT</small> consulting services</span>
            </motion.h2>
            <motion.p
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='mb-4 max-w-[400px] mx-auto lg:mx-0'
            >
              <span className='text-lg font-bold'>We are an IT company specialized in the development of customized solutions</span><span className='text-lg'> using the most advanced Microsoft technologies.</span><span className='text-lg font-bold'> With passion and expertise,</span><span className='text-lg'>we are dedicated to creating tailor-made products for our customers&apos; needs, ranging from customized business applications to complex integrated systems. Our goal is to offer concrete and innovative solutions that optimize business processes and maximize efficiency, taking full advantage of the potential of Microsoft technologies.</span>
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
            <ServiceSliderEnUs />
          </motion.div>
        </div>
      </div>
    </div>
    </LayoutEnUs>
  );
};

export default ItConsulting;
