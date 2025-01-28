// next image
import Image from 'next/image';

// next link
import Link from 'next/link';

// components
// import Socials from '../components/Socials';

const Header = () => {

  return (
    <header className='absolute z-30 w-full flex items-center px-16 xl:px-0 xl:h-[90px] pt-20'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row justify-between items-center xl:pt-2 sm:pt-0'>
          {/* Logo azienda */}
          {/* https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height */}
          <Link href='/intranet' target='_blank'>
            <Image
              src={'/LogoClaim1.svg'}
              width={350}
              height={60}
              alt='Vivasoft S.R.L.'
              priority={true}
            />
          </Link>
          <div> 
            <a  href="https://appsource.microsoft.com/en-us/marketplace/partner-dir/3be9add1-f9f0-44e0-b01c-fa585c33b214/overview/contact" target='_blank'><Image alt="Logo Partner Microsoft" src="/PartnerMic.png" width={105} height={25} /></a>
          </div>
         <div>
            <a href="\en-US\"><Image alt="EN" src="/GB.svg" width={35} height={15} /></a>
         </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
