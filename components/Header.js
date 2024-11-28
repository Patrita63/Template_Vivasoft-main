// next image
import Image from 'next/image';

// next link
import Link from 'next/link';

// components
// import Socials from '../components/Socials';

import { useEffect, useState } from 'react';

const Header = () => {

  let [isITA, setIsITA] = useState('');
  useEffect(() => {
    const isLanguageIta = window.localStorage.getItem("isLanguageIta");
    console.log('isLanguageIta: ' + isLanguageIta);
    setIsITA(isLanguageIta);
  }, []);
  
  // debugger;
  return (
    <header className='absolute z-30 w-full flex items-center px-16 xl:px-0 xl:h-[90px] pt-20'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8'>
          {/* logo */}
          <Link href={'/intranet/home'}>
            <Image
              src={'/Logo_VivaSoft.png'}
              width={150}
              height={20}
              alt='Vivasoft S.R.L.'
              priority={true}
              className='-mt-4 md:w-[100] md:h-[20]'
            />
          </Link>
          <div className="">
          {(isITA == 'true') &&
            <a href="\en-US\"><Image alt="EN" src="/GB.svg" width={35} height={35} /></a>
          }
          {(isITA == 'false') &&
            <a href="\it-IT\"><Image alt="IT" src="/IT.svg" width={35} height={35} /></a>
          }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
