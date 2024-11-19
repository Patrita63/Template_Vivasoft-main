// components
import LayoutEnUs from '../../../components/LayoutEnUs';
import WorkSlider from '../../../components/WorkSlider';
import Bulb from '../../../components/Bulb';
import Circles from '../../../components/Circles';

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../../variants';

// icons
import { BsArrowRight } from 'react-icons/bs';

const Work = () => {
  return (
    <LayoutEnUs>
    <div className='h-full bg-primary py-36 flex items-center bg-gradient-to-r from-primary via-black/30 to-black/10'>
      <Circles />
      <div className='container mx-auto'>
        <div className='flex flex-col xl:flex-row gap-x-8'>
          {/* text */}
          <div className='text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0 pt-60'>
            <motion.h2
              variants={fadeIn('up', 0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='h2 xl:mt-12'
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
              Training materials, educational resources always accessible for our customers.
              
            </motion.p>
            <button className='btn rounded-full border border-white/50 w-full px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group'>
              <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
                Log in
              </span>
              <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
            </button>
          </div>

          {/* slider */}
          <motion.div
            variants={fadeIn('down', 0.6)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='w-full xl:max-w-[65%]'
          >
            <WorkSlider />
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
    </LayoutEnUs>
  );
};

export default Work;
