import Image from 'next/image';
import Link from 'next/link';

const HeaderEnUS = () => {
  return (
    <header className="absolute z-30 w-full flex items-center px-16 xl:px-0 xl:h-[90px] pt-20">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center xl:pt-2 sm:pt-0 w-full">

          {process.env.NEXT_PUBLIC_INTRANET_VISIBLE === "true" && (
            <Link href='/intranet' target='_blank'>
              <Image
                src={'/LogoClaimENG.svg'}
                width={600} // Set a larger intrinsic width for better quality
                height={80} // Larger height
                alt='Vivasoft S.R.L.'
                priority={true}
                className="w-[100px] sm:w-[150px] md:w-[200px] lg:w-[250px] xl:w-[300px] max-w-full h-auto"
              />
            </Link>
          )}

          {process.env.NEXT_PUBLIC_INTRANET_VISIBLE === "false" && (
            <Image
              src={'/LogoClaimENG.svg'}
              width={600}
              height={80}
              alt='Vivasoft S.R.L.'
              priority={true}
              className="w-[100px] sm:w-[150px] md:w-[200px] lg:w-[250px] xl:w-[300px] max-w-full h-auto"
            />
          )}

          <div className="mt-4 lg:mt-0">
            <a href="https://appsource.microsoft.com/en-us/marketplace/partner-dir/3be9add1-f9f0-44e0-b01c-fa585c33b214/overview" target='_blank'>
              <Image
                alt="Logo Partner Microsoft"
                src="/PartnerMic.png"
                width={250}
                height={50}
                className="w-[80px] sm:w-[120px] md:w-[150px] lg:w-[180px] max-w-full h-auto"
              />
            </a>
          </div>

          {process.env.NEXT_PUBLIC_ENGLISH_VISIBLE === "true" && (
            <div className="mt-8 lg:mt-0">
              <a href="\it-IT\">
                <Image
                  alt="IT"
                  src="/IT.svg"
                  width={70}
                  height={30}
                  className='w-[15px] sm:w-[20px] md:w-[30px] lg:w-[40px] max-w-full h-auto'
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderEnUS;
