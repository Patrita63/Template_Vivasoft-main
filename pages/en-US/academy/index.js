// components
import LayoutEnUs from '../../../components/LayoutEnUs';
import AcademySliderEnUs from '../../../components/AcademySliderEnUs';
import ParticlesContainer from '../../../components/ParticlesContainer';
import Head from 'next/head'; // Importa il componente Head di Next.js

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../../variants';

// icons
// import { BsArrowRight } from 'react-icons/bs';

const Academy = () => {
  return (
    <LayoutEnUs>
       <Head>
        <title>Vivasoft Academy - Microsoft Training and Certifications</title>
        <meta name="description" content="Discover the training courses offered by Vivasoft Academy. Prepare for Microsoft certifications with courses on Power Apps, Power BI, Power Automate and more." />
        <meta name="keywords" content="Vivasoft Academy, Microsoft courses, IT training, Microsoft certifications, Power Apps, Power BI, Power Automate,C#, Python, React, professional training." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Vivasoft Academy - Microsoft Training and Certifications" />
        <meta property="og:description" content="Experience the Vivasoft Academy. Attend our training courses on Microsoft Power Apps, Power BI, Power Automate and get official certifications." />
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
              <span className='text-lg font-bold'>We create complete training solutions for companies,</span><span className='text-lg'> designing and managing </span><span className='text-secondary font-bold text-lg'>customized Corporate Academy.</span><span className='text-lg'>Our Academies are unique learning environments that respond to the professional growth needs of your resources, offering structured and innovative training programs.</span>
              <span className='text-lg font-bold'> Classroom and Online Training:</span> <span className='text-lg'>Our training is available both in the classroom and through online platforms, offering flexibility and convenience.</span>
              <span className='text-lg font-bold'> Certification Plans:</span> <span className='text-lg'>We help companies to certify their employees, obtaining qualifications that enhance the company brand.</span>
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
               <AcademySliderEnUs />
            </div>
           
          </motion.div>
        </div>
      </div>
      
    </div>
    </LayoutEnUs>
  );
};

export default Academy;
