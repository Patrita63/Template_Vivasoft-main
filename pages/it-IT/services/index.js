// components
import Layout from '../../../components/Layout';
import ServiceSlider from '../../../components/ServiceSlider';
import Bulb from '../../../components/Bulb';
import Circles from '../../../components/Circles';

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../../variants';

const Services = () => {
  return (
    <Layout>
    <div className='h-full bg-primary py-36 flex items-center bg-gradient-to-r from-primary via-black/30 to-black/10'>
      <Circles />
      <div className='container mx-auto'>
        <div className='flex flex-col xl:flex-row gap-x-8'>
          {/* text */}
          <div className='text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0  pt-60'>
            <motion.h2
              variants={fadeIn('up', 0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='h2 xl:mt-8'
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
      <Bulb />
    </div>
    </Layout>
  );
};

export default Services;
