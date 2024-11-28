import '../styles/globals.css';

// components


// router
import { useRouter } from 'next/router';

// framer motion
import { AnimatePresence, motion } from 'framer-motion';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    
      <AnimatePresence mode='wait'>
        <motion.div key={router.route} className='h-full'>
          
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    
  );
}

export default MyApp;
