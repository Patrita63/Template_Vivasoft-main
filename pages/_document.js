import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="it">
        <Head>
          {/* Import Segoe UI Font */}
          <link
            href="https://fonts.googleapis.com/css2?family=Segoe:wght@400;600;700&display=swap"
            rel="stylesheet"
          />

          {/* Custom Statcounter Inline Script */}
          <Script
            id="vivasoft-statcounter-config" // ✅ Custom ID
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                window.sc_project = 13084256; 
                window.sc_invisible = 1; 
                window.sc_security = "7bd27416"; 
              `,
            }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />

          {/* Custom Statcounter External Script */}
          <Script
            id="vivasoft-statcounter-script" // ✅ Custom ID
            strategy="lazyOnload"
            src="https://www.statcounter.com/counter/counter.js"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
