
// components
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';


const Layout = ({ children }) => {
  return (
    <div
      className={`page bg-site text-white bg-cover bg-no-repeat relative min-h-screen flex flex-col flex-grow overflow-y-auto scroll-container`}
    >
      <Nav />
      <Header />
      <main className="">{children}</main>   
      <Footer/>
    </div>
  );
};

export default Layout;
