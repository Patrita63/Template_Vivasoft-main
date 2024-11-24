// components
import Layout from '../../../components/Layout';
import TestimonialSlider from '../../../components/TestimonialSlider';

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../../variants';

const Testimonials = () => {
  return (
    <Layout>
    <div className='h-full bg-primary py-32 text-center'>
      <div className='container mx-auto h-full flex flex-col justify-center overflow-hidden xl:pt-0 pt-80'>
        {/* title */}
        <motion.h2
          variants={fadeIn('up', 0.2)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='h2 mb-8 xl:mb-0'
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
