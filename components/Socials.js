// links
import Link from 'next/link';

// icons
import {RiLinkedinFill} from 'react-icons/ri';

import { FaYoutube, FaMicrosoft } from "react-icons/fa";

const Socials = () => {
  return (
    <div className='flex items-center gap-x-5 text-xl md:mb-0 md:justify-center'>
      <Link href={'https://www.linkedin.com/company/vivasoft-s.r.l.'} className='hover:text-accent transition-all duration-300' target='_blank'>
        < RiLinkedinFill />
      </Link>
      <Link href={'#'} className='hover:text-accent transition-all duration-300' target='_blank'>
        < FaYoutube />
      </Link>
      <Link href={'https://appsource.microsoft.com/en-us/marketplace/partner-dir/3be9add1-f9f0-44e0-b01c-fa585c33b214/overview/contact'} className='hover:text-accent transition-all duration-300' target='_blank'>
      <FaMicrosoft/>
      </Link>
    
     

    </div>
  );
};

export default Socials;
