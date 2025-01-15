import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  // To navigate to another page
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page it-IT
    router.push("/it-IT");
  })

  return (
    <></>
  );
};

export default Home;
