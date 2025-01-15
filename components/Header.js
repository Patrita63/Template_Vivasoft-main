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
          <Link href={'/intranet/home'}>
            <Image
              src={'/LogoClaim1.svg'}
              width={350}
              height={60}
              alt='Vivasoft S.R.L.'
              priority={true}
            />
          </Link>
         
            <a href="\en-US\"><Image alt="EN" src="/GB.svg" width={45} height={15} /></a>
        </div>
      </div>
    </header>
  );
};

export default Header;
