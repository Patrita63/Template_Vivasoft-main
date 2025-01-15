// fonts
import { Sora } from 'next/font/google';

// font settings
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

// components
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';


const Layout = ({ children }) => {
  return (
    <div
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative min-h-screen flex flex-col flex-grow overflow-y-auto scroll-container`}
    >
     
      <Nav />
      <Header />
      <main className="">{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
