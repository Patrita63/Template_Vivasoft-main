import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
} from 'react-icons/hi2';

// nav data
export const navData = [
  { name: 'Home', path: '/it-IT', icon: <HiHome /> },
  { name: 'Vivasoft', path: '/it-IT/about', icon: <HiUser /> },
  { name: 'Servizi', path: '/it-IT/services', icon: <HiRectangleGroup /> },
  { name: 'Academy', path: '/it-IT/work', icon: <HiViewColumns /> },
  {
    name: 'Dicono di noi ',
    path: '/it-IT/testimonials',
    icon: <HiChatBubbleBottomCenterText />,
  },
  {
    name: 'Contatti',
    path: '/it-IT/contact',
    icon: <HiEnvelope />,
  },
];

// next link
import Link from 'next/link';

// next router
import { useRouter } from 'next/router';

const Nav = () => {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <nav className='flex flex-col items-center xl:justify-center gap-y-2 fixed h-max top-0 mt-auto xl:right-[93%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen'>
      {/* inner */}
      <div
        className='flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-2 px-4 md:px-40 xl:px-0 h-[80px] xl:h-max py-8 bg-white/10
        backdrop-blur-sm text-3xl xl:text-xl xl:rounded-full'
      >
        {navData.map((link, index) => {
          const isActive = link.path === pathname; // Verifica se il link è attivo
          return (
            <Link
              className={`${
                isActive
                  // ? 'border-b-2 border-accent'  // Linea gialla sotto quando il link è attivo
                  // : 'border-b-2 border-transparent'  // Linea trasparente quando il link non è attivo
              } relative flex items-center group hover:text-accent transition-all duration-300 py-2 px-4 rounded-xl xl:rounded-none w-full xl:w-auto`}
              href={link.path}
              key={index}
            >
              {/* Icona e nome della pagina sotto l'icona */}
              <div className="flex flex-col items-center">
                {/* Icona con colore giallo quando il link è attivo */}
                <div
                  className={`${
                    isActive ? 'text-accent' : 'text-white'
                  } transition-all duration-300`} // Aggiungi il cambio colore dell'icona
                >
                  {link.icon}
                </div>
                {/* Nome della pagina sotto l'icona con colore giallo quando attivo */}
                <span
                  className={`mt-2 ${
                    isActive ? 'text-accent' : 'text-white'
                  } xl:block hidden text-[11px] transition-all duration-300`}
                >
                  {link.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
