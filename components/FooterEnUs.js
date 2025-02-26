import Image from 'next/image';
import Link from 'next/link';
import Socials from './Socials'; // Assicurati di avere il componente Socials importato
import CreditsEnUs from './CreditsEnUs'; // Assicurati di avere il componente Credits importato

const Footer = () => {
  return (
    <footer className="bg-primary/80 text-white xl:py-2 sm:py-10 translate-z-0 mt-auto xl:pt-2 pt-5">
      <div className="container mx-auto text-center">
        {/* Flexbox container per i 5 div sulla stessa riga */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 xl:mt-0 sm:mt-60">
          {process.env.NEXT_PUBLIC_INTRANET_VISIBLE==="true" && (
          <div className="flex flex-col justify-center items-center">
            {/* Logo azienda */}
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
          )}

          {process.env.NEXT_PUBLIC_INTRANET_VISIBLE==="false" && (
          <div className="flex flex-col justify-center items-center">
            {/* Logo azienda */}
            
              <Image
                src={'/LogoClaim_F.png'}
                width={110}
                height={50}
                alt="Logo Vivasoft S.R.L."
                priority={true}
                className="mt-4"
              />
              <small>Technology + knowledge = innovation</small>
          </div>
          )}

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
                src={'/FondAIAZu.png'}
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
            <Link href={'https://appsource.microsoft.com/en-us/marketplace/partner-dir/3be9add1-f9f0-44e0-b01c-fa585c33b214/overview/contact'} target='_blank'>
              <Image
                src={'/AI_Fundamentals-min.png'}
                width={75}
                height={25}
                alt='AI_Fundamentals'
                priority={true}
              />
            </Link>
            <Link href={'https://appsource.microsoft.com/en-us/marketplace/partner-dir/3be9add1-f9f0-44e0-b01c-fa585c33b214/overview/contact'} target='_blank'>
              <Image
                src={'/AI-100_ProductImage.png'}
                width={75}
                height={25}
                alt='AI-100'
                priority={true}
              />
            </Link>
          </div>

          {/* Contatti */}
          <div className="text-center">
            <div className="text-sm">
              <span className="text-accent">Contact us</span>
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
          <CreditsEnUs />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
