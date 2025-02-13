import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";  // Importa il file theme.js


// components


// router
import { useRouter } from 'next/router';

// framer motion
import { AnimatePresence, motion } from 'framer-motion';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
      <ThemeProvider theme={theme}>
        {/* <CssBaseline />  Applica il reset globale di Material-UI */}
        <AnimatePresence mode='wait'>
          <motion.div key={router.route} className='h-full'>

            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </ThemeProvider>
  );
}

export default MyApp;
