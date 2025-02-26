// links
import Link from 'next/link';


const Credits = () => {
  return (
    <>
      <small>Powered by <Link href={'https://www.bottinibeatrice.it'} className='hover:text-accent transition-all duration-300 text-accent1' target='_blank'>
      CreativeWebB </Link> & <span className='text-accent'>Vivasoft </span> 
      | </small> <small> © {new Date().getFullYear()} Tutti i diritti riservati. | </small>
      <small><Link href={'/informativa-privacy'} className='hover:text-accent transition-all duration-300 text-sotto' target='_blank'>
      Policy Privacy |
      </Link> </small>
      <small><Link href={'/termini-condizioni'} className='hover:text-accent transition-all duration-300 text-sotto' target='_blank'>
      Termini e condizioni
      </Link> </small>
    </>
  );
};

export default Credits;