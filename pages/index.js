import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Cookies from "js-cookie";

const Home = () => {
  // To navigate to another page
  const router = useRouter();

  useEffect(() => {
    // Expire after 8 hours
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 8);
    Cookies.set("isCookiesAcceptedEN", "false", { expires: expirationDate, path: "/" });
    console.log('Home page EN' + Cookies.get("isCookiesAcceptedEN")); 
    Cookies.set("isCookiesAcceptedIT", "false", { expires: expirationDate, path: "/" });
    console.log('Home page IT' + Cookies.get("isCookiesAcceptedIT")); 
    // Redirect to home page it-IT
    router.push("/it-IT");
  }, [router]);

  return (
    <>
    </>
  );
};

export default Home;
