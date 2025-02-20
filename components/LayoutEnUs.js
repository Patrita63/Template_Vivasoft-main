// components
import NavEnUS from '../components/NavEnUs';
import HeaderEnUS from '../components/HeaderEnUs';
import FooterEnUs from '../components/FooterEnUs';



const Layout = ({ children }) => {
  return (
    <div
      className={`page bg-site text-white bg-cover bg-no-repeat relative min-h-screen flex flex-col flex-grow overflow-y-auto scroll-container`}
    >
      <NavEnUS />
      <HeaderEnUS />
      <main className="">{children}</main>   
      <FooterEnUs/>
    </div>
  );
};

export default Layout;
