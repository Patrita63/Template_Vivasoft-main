import Image from 'next/image';
import Link from 'next/link';

const HeaderEnUS = () => {
  return (
    <header className="absolute z-30 w-full flex items-center px-16 xl:px-0 xl:h-[90px] pt-20">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center xl:pt-2 sm:pt-0">
          {process.env.NEXT_PUBLIC_INTRANET_VISIBLE==="true" && (
          <>
          {/* Logo azienda */}
          {/* https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height */}
          <Link href='/intranet' target='_blank'>
            <Image
              src={'/LogoClaimENG.svg'}
              width={350}
              height={60}
              alt='Vivasoft S.R.L.'
              priority={true}
            />
          </Link>
          </>
          )}

          {process.env.NEXT_PUBLIC_INTRANET_VISIBLE==="false" && (
          <>
          {/* Logo azienda */}
            <Image
              src={'/LogoClaimENG.svg'}
              width={350}
              height={60}
              alt='Vivasoft S.R.L.'
              priority={true}
            />
          </>
          )}

          <div className="mt-4 lg:mt-0"> 
            <a href="https://appsource.microsoft.com/en-us/marketplace/partner-dir/3be9add1-f9f0-44e0-b01c-fa585c33b214/overview/contact" target='_blank'>
              <Image alt="Logo Partner Microsoft" src="/PartnerMic.png" width={125} height={25} />
            </a>
          </div>

          {process.env.NEXT_PUBLIC_ENGLISH_VISIBLE==="true" && (
          <div className="mt-8 lg:mt-0">
            <a href="\it-IT\">
              <Image alt="IT" src="/IT.svg" width={35} height={15} className='w-[25px] lg:w-[35px]' />
            </a>
          </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderEnUS;
