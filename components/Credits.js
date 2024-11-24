// links
import Link from 'next/link';



const Credits = () => {
  return (
    <div className=' items-center gap-x-5 text-sm'>
      <small>Powered by <Link href={'https://www.bottinibeatrice.it'} className='hover:text-accent transition-all duration-300 text-secondary' target='_blank'>
      CreativeWebB & VivaSoft 
      </Link> | </small>
      <small><Link href={'#'} className='hover:text-accent transition-all duration-300 text-sotto' target='_blank'>
      Policy Privacy
      </Link> </small>
    
    
    

    </div>
  );
};

export default Credits;