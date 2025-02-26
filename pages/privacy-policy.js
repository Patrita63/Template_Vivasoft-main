import Layout from '../components/Layout';
import Head from "next/head"; // Importa il componente Head di Next.js
import Image from 'next/image';

const CurYear = new Date().getFullYear().toString();
const PrivacyPolicy = () => {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <div className='bg-primary/60 h-full'>
      <div className="container mx-auto p-8 pt-40">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-primary mb-6">
            Privacy Policy
          </h1>
          <p className="text-center text-gray-600 mb-4">
          Last updated: {CurYear}
          </p>
          
                <Image
                  src={'/Logo_VivaSoft.png'}
                  width={85}
                  height={20}
                  alt="Logo Vivasoft S.R.L."
                  priority={true}
                  className="m-auto mb-4"
                />
            
          {/* <!-- Sezione Introduzione --> */}
          <h2 className=" text-2xl font-semibold text-primary mb-4 text-center">
            Introduction
          </h2>
          <p className="text-gray-600 text-lg text-center mb-6">
            This Privacy Policy describes how we collect, use,
            we store, protect and share your personal data when
            use our website www.vivasoft.it.
            Please read this policy carefully to understand
            how we process your personal data.
          </p>

          {/* <!-- Sezione 1: Informazioni che raccogliamo --> */}
          <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
            Information we collect
          </h3>
          <p className="text-gray-600 text-lg text-center mb-6">
            We may collect the following information:
          </p>
          <ul className="list-inside list-disc text-gray-600 text-lg mb-6 text-center">
            <li>
            Personal data: Name, email address, phone number
            </li>
            <li>
            Browsing data: IP address, browser type, system
            operational, pages visited, time spent on our site, etc.
            </li>
            <li>
              Data collected through cookies: Cookies allow us to
              collect information about your preferences and activities on
              our site to improve your experience. You can
              control the use of cookies through your settings
              browser.
            </li>
          </ul>

          {/* <!-- Sezione 2: Come utilizziamo le informazioni --> */}
          <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
          How we use your information
          </h3>
          <p className="text-gray-600 text-lg text-center mb-6">
          We use the information collected to:
          </p>
          <ul className="list-inside list-disc text-gray-600 text-lg mb-6 text-center">
            <li>Provide and improve our Services.</li>
            <li>Answer your requests and questions.</li>
            <li>Personalize your experience on our site.</li>
            <li>
            Send you communications related to our Services, such as
            Updates or special offers.
            </li>
            <li>
            Analyse the use of our site to improve content and
            functionality.
            </li>
            <li>Comply with legal and regulatory requirements.</li>
          </ul>

          {/* <!-- Sezione 3: Condivisione delle informazioni --> */}
          <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
          Sharing information
          </h3>
          <p className="text-gray-600 text-lg text-center mb-6">
          We do not sell, trade or transfer your personal information to
          third parties, with the exception of:
          </p>
          <ul className="list-inside list-disc text-gray-600 text-lg mb-6 text-center">
            <li>
              <strong>Service providers</strong>: We share your data
              with third party service providers who help us manage our
              website and our Services (for example, hosting, analytics
              data, sending email). These suppliers are obliged to
              protect your data and may not use it for different purposes
              by those for whom they were provided.
            </li>
            <li>
              <strong>Legal obligations</strong>: We may be required to
              disclose your information to respond to legal requests,
              as court orders, government inquiries, or to make
              respect our legal rights.
            </li>
          </ul>

          {/* <!-- Sezione 4: Protezione dei dati --> */}
          <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
          Data protection
          </h3>
          <p className="text-gray-600 text-lg text-center mb-6">
            We take reasonable security measures to protect your data
            personal from unauthorized access, alteration, disclosure or
            destruction. However, no method of transmission over the Internet or
            electronic storage is 100% secure, and we cannot
            ensure the absolute security of your data.
          </p>

          {/* <!-- Sezione 5: I tuoi diritti --> */}
          <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
          Your rights
          </h3>
          <p className="text-gray-600 text-lg text-center mb-6">
          You have the right to:
          </p>
          <ul className="list-inside list-disc text-gray-600 text-lg mb-6 text-center">
            <li>
              <strong>Access</strong>: Request access to information
              that we collect on you.
            </li>
            <li>
              <strong>Correction</strong>: Request correction of
              Inaccurate or incomplete information.
            </li>
            <li>
              <strong>Deletion of personal data</strong>: Request your personal data unless there are legal reasons to retain it.
            </li>
            <li>
              <strong>Limitation of the processing</strong>: Ask to limit
              the processing of your data in certain circumstances.
            </li>
            <li>
              <strong>Data portability</strong>: Request a copy of
              your personal data in a structured, commonly used format and
              readable.
            </li>
            <li>
              <strong>Withdrawal of consent</strong>: If the treatment of your
              data is based on consent, you have the right to revoke it in
              any time.
            </li>
          </ul>

          {/* <!-- Sezione 6: Cookies --> */}
          <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
            Cookies
          </h3>
          <p className="text-gray-600 text-lg text-center mb-6">
            Our site uses cookies to improve your experience.
            A cookie is a small file that is stored on your
            device when you visit our site. You can choose to
            accept or reject cookies, but some features of the site
            may not function properly without them.
          </p>

          {/* <!-- Sezione 7: Modifiche alla Privacy Policy --> */}
          <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
          Changes to the Privacy Policy
          </h3>
          <p className="text-gray-600 text-lg text-center mb-6">
            We reserve the right to change this Privacy Policy in
            any time. Changes will be posted on this page
            and will be effective from the time of publication. We invite you to
            Periodically check this page to be informed about
            any updates.
          </p>

          {/* <!-- Sezione 8: Contatti --> */}
          <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
            Contacts
          </h3>
          <p className="text-gray-600 text-lg text-center mb-6">
          If you have questions about this Privacy Policy or the treatment of
          your personal data, you can contact us at:
          </p>
          <p className="text-gray-600 text-lg text-center">
          Vivasoft S.R.L <br />
          Via Copenaghen, 10 00144 Roma<br />
            <a href="mailto:info@vivasoft.it"> info@vivasoft.it</a>
          </p>
        </div>
      </div>
      </div>
      </Layout>
  );
};

export default PrivacyPolicy;
