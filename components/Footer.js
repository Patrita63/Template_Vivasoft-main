// next image
import Image from "next/image";

// next link
import Link from "next/link";

// components
import Socials from "../components/Socials";
import Credits from "./Credits";

const Footer = () => {
  return (
    <footer className="bg-primary/80 text-white py-2 translate-z-0">
    <div className="container mx-auto text-center">
      {/* Flexbox container per i 3 div */}
      <div className="flex flex-col md:flex-row justify-between ">
        
        {/* Social a sinistra */}
        <div className="flex space-x-4 mb-4 md:mb-0 justify-center">
            {/* socials */}
            <Socials />
        </div>
  
        {/* Dati azienda al centro */}
        <div className="text-center  mb-4 md:mb-0">
          <div className="text-sm">
            <span className="text-accent">VivaSoft S.R.L.</span> p.i. 12888541005
            <address>Via Copenaghen, 10 - 00144 Roma (RM)</address> 
            © {new Date().getFullYear()} Tutti i diritti riservati. 
          </div>
        </div>
  
       {/* Contatti a destra */}
        <div className="text-center">
          <div className="text-sm">
            <span className="text-accent">Info utili</span>
            <p className="text-sm text-white hover:text-accent transition-all duration-300"><a href="tel:+393482350751">+39 348 235 0751</a></p> 
            <p className="text-sm text-white hover:text-accent transition-all duration-300"><a href="mailto:info@vivasoft.it">info@vivasoft.it</a></p> 
          
           
          </div>
        </div>
      </div>
  
      {/* Powered by */}
     
      <Credits/>
      
    </div>
  </footer>
  );
};

export default Footer;
