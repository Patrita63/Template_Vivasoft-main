// next image
import Image from "next/image";

// next link
import Link from "next/link";

// components
import Socials from "../components/Socials";

const Footer = () => {
  return (
    <footer className="bg-primary/80 text-white py-4 ">
      <div className="container mx-auto text-center">
        <div className="mb-4 text-sm">
         <span className="text-accent">VivaSoft</span> p.i. 12888541005 <address>Via Copenaghen, 10 - 00144 Roma (RM)</address> © {new Date().getFullYear()}  Tutti i diritti riservati. <br/>
          Powered by <a className="text-secondary" href="#">CreativeWebB</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
