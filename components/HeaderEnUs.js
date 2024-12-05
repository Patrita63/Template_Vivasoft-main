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
        <div className='flex flex-col lg:flex-row justify-between items-center gap-y-6'>
          {/* Logo azienda */}
          {/* https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height */}
          <Link href={'/intranet/home'}>
            <Image
              src={'/LogoClaim1.svg'}
              width={350}
              height={90}
              alt='Vivasoft S.R.L.'
              priority={true}
              style={{ width: '100%', height: 'auto' }}
            />
          </Link>
          <div className="">
            <h1 className='slogan'>Tecnology + Learning = Innovation.</h1>
          </div>
            <a href="\it-IT\"><Image alt="IT" src="/IT.svg" width={85} height={45} style={{ height: 'auto' }} /></a>
        </div>
      </div>
    </header>
  );
};

export default HeaderEnUS;
