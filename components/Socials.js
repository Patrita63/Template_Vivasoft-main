// links
import Link from 'next/link';

// icons
import {
  RiLinkedinFill
} from 'react-icons/ri';

const Socials = () => {
  return (
    <div className='flex items-center gap-x-5 text-2xl'>
      <Link href={'https://www.linkedin.com/company/vivasoft-s.r.l.'} className='hover:text-accent transition-all duration-300' target='_blank'>
        < RiLinkedinFill />
      </Link>
  
    </div>
  );
};

export default Socials;
