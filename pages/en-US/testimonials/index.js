// components
import LayoutEnUs from '../../../components/LayoutEnUs';
import dynamic from 'next/dynamic'; // Lazy load the slider
import Head from 'next/head';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../variants';

// Particelle
import ParticlesContainer from '../../../components/ParticlesContainer';

// Lazy load TestimonialSliderEnUs
const TestimonialSliderEnUs = dynamic(() => import('../../../components/TestimonialSliderEnUs'), { ssr: false });

const Testimonials = () => {
  return (
    <LayoutEnUs>
      <Head>
        <title>Vivasoft - About us</title>
        <meta name="description" content="Find out what our customers are saying. Since 2014, Vivasoft has helped many companies optimize their business processes with innovative Microsoft solutions such as Power Apps, Power BI and Power Automate." />
        <meta name="keywords" content="Vivasoft, About us, what people say about us, customer testimonials, IT solutions, Microsoft Power Apps, Power BI, Power Automate, IT consulting, Microsoft certifications" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Vivasoft - Dicono di noi" />
        <meta property="og:description" content="Leggi le testimonianze di chi ha scelto Vivasoft per ottimizzare i propri processi aziendali con soluzioni basate su piattaforme Microsoft." />
        <meta property="og:image" content="https://www.vivasoft.it/images/vivasoft-logo.jpg" />
        <meta property="og:image:alt" content="Vivasoft Logo" />
        <meta property="og:url" content="https://www.vivasoft.it/testimonials" />
      </Head>

      {/* <div className="h-full bg-primary py-20 md:py-40 text-center"> */}
      {/* <div className='container mx-auto max-w-screen-lg px-4 md:px-0 h-full flex flex-col justify-center xl:pt-0 pt-10'> */}
      {/* <div className='container mx-auto h-full flex flex-col justify-center overflow-hidden xl:pt-0 pt-20'> */}
      <div className='h-full bg-primary py-20 md:py-40 text-center bg-gradient-to-r from-primary via-black/30 to-black/10'>
        {/* particles */}
        <ParticlesContainer />
        <div className='container mx-auto h-full flex flex-col justify-center overflow-hidden xl:pt-0 pt-20'>
          <div className='container mx-auto h-full flex flex-col justify-center overflow-hidden xl:pt-0 pt-20'>
            {/* title */}
            <div>
              <motion.h2
                variants={fadeIn('up', 0.2)}
                initial='hidden'
                animate='show'
                exit='hidden'
                className='md:text-4xl font-bold mb-8 pt-40 md:pt-12 md:mb-12 h2'
              >
                What about<span className='text-accent'> us</span>
              </motion.h2>
            </div>

            {/* slider */}
            <motion.div
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className="lg:w-full px-2 sm:px-4 md:px-0 sm:w-[210px]" // Ensures slider is well-aligned across devices
            >
              <TestimonialSliderEnUs />
            </motion.div>
          </div>
        </div>
      </div>
    </LayoutEnUs>
  );
};

export default Testimonials;
