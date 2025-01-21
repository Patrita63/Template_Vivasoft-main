// next image
import Image from 'next/image';

// next link
import Link from 'next/link';

// components
// import Socials from '../components/Socials';

const HeaderEnUS = () => {

  return (
    <header className='absolute z-30 w-full flex items-center px-16 xl:px-0 xl:h-[90px] pt-20'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row justify-between items-center pt-2'>
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
            <a href="\it-IT\"><Image alt="IT" src="/IT.svg" width={45} height={15} /></a>
        </div>
      </div>
    </header>
  );
};

export default HeaderEnUS;
