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
        <div className='flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8'>
          {/* logo */}
          <Link href={'/'}>
            <Image
              src={'/Log_V.svg'}
              width={200}
              height={40}
              alt='Vivasoft S.R.L.'
              priority={true}
               className='-mt-4'
            />
          </Link>
          <div className="">
            <a href="\it-IT\" >IT</a> | 
            <a href="\en-US\" > EN</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
