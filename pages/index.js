import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Cookies from "js-cookie";

const Home = () => {
  // To navigate to another page
  const router = useRouter();

  useEffect(() => {
    // debugger;
    // localStorage.setItem("isCookiesAccepted", 'false');
    // Replace with: expire after 8 hours
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 8);
    Cookies.set("isCookiesAccepted", "false", { expires: expirationDate, path: "/" });
    console.log('Home page' + Cookies.get("isCookiesAccepted")); 

    // Redirect to home page it-IT
    router.push("/it-IT");
  }, [router]);

  return (
    <>
    </>
  );
};

export default Home;
