// links
import Link from 'next/link';



const Credits = () => {
  return (
    <div className=' items-center gap-x-6 text-sm mt-2'>
      <small>Powered by <Link href={'https://www.bottinibeatrice.it'} className='hover:text-accent transition-all duration-300 text-accent1' target='_blank'>
      CreativeWebB </Link> & Vivasoft 
      | </small> <small> © {new Date().getFullYear()} Tutti i diritti riservati. | </small>
      <small><Link href={'#'} className='hover:text-accent transition-all duration-300 text-sotto' target='_blank'>
      Policy Privacy |
      </Link> </small>
      <small><Link href={'#'} className='hover:text-accent transition-all duration-300 text-sotto' target='_blank'>
      Termini e condizioni
      </Link> </small>
    
    

    </div>
  );
};

export default Credits;