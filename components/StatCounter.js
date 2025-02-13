import { useEffect } from "react";
import Image from 'next/image';

const StatCounter = () => {
  useEffect(() => {
    // debugger;
    if (typeof window !== "undefined") {
      // Initialize Statcounter variables
      window.sc_project = 13084256;
      window.sc_invisible = 0;
      window.sc_security = "7bd27416";

      // Load Statcounter script
      const scScript = document.createElement("script");
      scScript.type = "text/javascript";
      scScript.async = true;
      scScript.src = "https://statcounter.com/counter/counter.js";
      document.body.appendChild(scScript);
    }
  }, []);

  return (
    <noscript>
      <div className="statcounter">
        <a
          title="Web Analytics Made Easy - Statcounter"
          href="https://statcounter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            width={60}
            height={14}
            src="https://c.statcounter.com/13084256/0/7bd27416/0/"
            alt="Statcounter tracking"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </a>
      </div>
    </noscript>
  );
};

export default StatCounter;
