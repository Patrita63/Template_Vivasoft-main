import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="absolute z-30 w-full flex items-center px-16 xl:px-0 xl:h-[90px] pt-20">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center xl:pt-2 sm:pt-0">
          {/* Logo azienda */}
          <Link href='/intranet' target='_blank'>
            <Image
              src={'/LogoClaim1.svg'}
              width={350}
              height={60}
              alt='Vivasoft S.R.L.'
              priority={true}
            />
          </Link>

          <div className="mt-4 lg:mt-0"> 
            <a href="https://appsource.microsoft.com/en-us/marketplace/partner-dir/3be9add1-f9f0-44e0-b01c-fa585c33b214/overview/contact" target='_blank'>
              <Image alt="Logo Partner Microsoft" src="/PartnerMic.png" width={125} height={25} />
            </a>
          </div>

          <div className="mt-8 lg:mt-0">
            <a href="\en-US\">
              <Image alt="EN" src="/GB.svg" width={35} height={15} className='w-[25px] lg:w-[35px]' />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
