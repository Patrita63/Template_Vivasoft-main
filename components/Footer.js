import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Socials from './Socials'; // Assicurati di avere il componente Socials importato
import Credits from './Credits'; // Assicurati di avere il componente Credits importato

const Footer = () => {

  useEffect(() => {
    // Aggiungi lo script di Statcounter dinamicamente
    const script = document.createElement('script');
    script.src = 'https://statcounter.com/counter/counter.js';
    script.async = true;
    script.type = 'text/javascript';
    script.onload = () => {
      window.sc_project = 13084256;
      window.sc_invisible = 0;
      window.sc_security = '7bd27416';
    };
    document.body.appendChild(script);
  }, []);

  return (
    <footer className="bg-primary/80 text-white xl:py-2 sm:py-10 translate-z-0 mt-auto xl:pt-2 pt-5">
      <div className="container mx-auto text-center">
        {/* Flexbox container per i 5 div sulla stessa riga */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 xl:mt-0 sm:mt-60">

          {/* Logo azienda */}
          <div className="flex flex-col justify-center items-center">
            {/* logo */}
            {/* Link all'area intranet */}
            <Link href='/intranet' target='_blank' className="mt-4 text-white text-sm hover:text-secondary" >
              <Image
                src={'/LogoClaim_F.png'}
                width={110}
                height={50}
                alt="Logo Vivasoft S.R.L."
                priority={true}
                className="mt-4"
              />
            </Link>

            {/* Link all'area intranet */}
            <Link href='/intranet' target='_blank' className="mt-4 text-white text-sm hover:text-secondary" >
              <small>INTRANET</small>
            </Link>
          </div>

          <span className="text-accent">
            Vivasoft S.R.L. <span className="text-white">P.IVA 12888541005</span>
          </span>

          {/* Certificazioni */}
          <div className="flex justify-center items-center space-x-4">
            <Link href={'https://appsource.microsoft.com/en-us/marketplace/partner-dir/3be9add1-f9f0-44e0-b01c-fa585c33b214/overview/contact'} target='_blank'>
              <Image
                src={'/MCT.png'}
                width={75}
                height={25}
                alt='Microsoft-Trainer'
                priority={true}
              />
            </Link>
            <Link href={'https://appsource.microsoft.com/en-us/marketplace/partner-dir/3be9add1-f9f0-44e0-b01c-fa585c33b214/overview/contact'} target='_blank'>
              <Image
                src={'/mcsa-badge.svg'}
                width={75}
                height={25}
                alt='Microsoft-Trainer'
                priority={true}
              />
            </Link>
            <Link href={'https://appsource.microsoft.com/en-us/marketplace/partner-dir/3be9add1-f9f0-44e0-b01c-fa585c33b214/overview/contact'} target='_blank'>
              <Image
                src={'/mcsd-badge.svg'}
                width={75}
                height={25}
                alt='Microsoft-Partner'
                priority={true}
              />
            </Link>


            <Link href={'https://appsource.microsoft.com/en-us/marketplace/partner-dir/3be9add1-f9f0-44e0-b01c-fa585c33b214/overview/contact'} target='_blank'>
              <Image
                src={'/microsoft-certified-expert-badge.svg'}
                width={75}
                height={25}
                alt='Microsoft-Partner'
                priority={true}
              />
            </Link>
            <Link href={'https://appsource.microsoft.com/en-us/marketplace/partner-dir/3be9add1-f9f0-44e0-b01c-fa585c33b214/overview/contact'} target='_blank'>
              <Image
                src={'/microsoft-certified-associate-badge.svg'}
                width={75}
                height={25}
                alt='Microsoft-Partner'
                priority={true}
              />
            </Link>
            <Link href={'https://appsource.microsoft.com/en-us/marketplace/partner-dir/3be9add1-f9f0-44e0-b01c-fa585c33b214/overview/contact'} target='_blank'>
              <Image
                src={'/microsoft-certified-general-badge.svg'}
                width={75}
                height={25}
                alt='Microsoft-Partner'
                priority={true}
              />
            </Link>
          </div>

          {/* Contatti */}
          <div className="text-center">
            <div className="text-sm">
              <span className="text-accent">Contattaci</span>
              <p className="text-sm text-white hover:text-accent transition-all duration-300">
                <a href="mailto:info@vivasoft.it">info@vivasoft.it</a>
              </p>
              <p className="text-sm text-white hover:text-accent transition-all duration-300">
                <a href="mailto:vivasoft@pec.it">vivasoft@pec.it</a>
              </p>
              <address><small>Via Copenaghen, 10 - 00144 Roma (RM)</small></address>
            </div>
          </div>

          {/* Social */}
          <div className="flex space-x-4 mb-4 md:mb-0 justify-center">
            <Socials />
          </div>
        </div>
        {/* Powered by */}
        <div className='items-center gap-x-6 text-sm mt-2'>
          <Credits />

          {/* Statcounter Section */}
          <div className="flex justify-center items-center space-x-2 mt-4 p-2 rounded-lg shadow-md">
            <span className="mr-1 text-white">Vivasoft&apos;s Stats:</span>
            <Image
              width={60}
              height={14}
              src="https://c.statcounter.com/13084256/0/7bd27416/0/"
              alt="Statcounter tracking"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-24 h-auto rounded-lg"
            />
          </div>

          {/* Noscript Fallback */}
          <noscript>
            <div className="statcounter">
              <a title="Web Analytics Made Easy - Statcounter" href="https://statcounter.com/" target="_blank">
                <Image className="statcounter"
                  width={60}
                  height={14}
                  src="https://c.statcounter.com/13084256/0/7bd27416/0/"
                  alt="Web Analytics Made Easy - Statcounter"
                  referrerPolicy="no-referrer-when-downgrade" />
              </a>
            </div>
          </noscript>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
