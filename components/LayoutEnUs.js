// fonts
import { Sora } from 'next/font/google';

// font settings
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

// components
import NavEnUS from '../components/NavEnUs';
import HeaderEnUS from '../components/HeaderEnUs';
import FooterEnUs from '../components/FooterEnUs';


const LayoutEnUs = ({ children }) => {
  return (
    <div
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative min-h-screen flex flex-col scroll-container`}
    >
     
      <NavEnUS />
      <HeaderEnUS />
      <main className="flex-grow overflow-y-auto">{children}</main>
      <FooterEnUs/>
    </div>
  );
};

export default LayoutEnUs;
