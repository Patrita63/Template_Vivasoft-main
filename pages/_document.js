import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="it">
        <Head>
          {/* Importa il font Segoe UI da Google Fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Segoe:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
