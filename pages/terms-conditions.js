
import Head from 'next/head'; // Importa il componente Head di Next.js
import Image from 'next/image';
import Layout from '../components/Layout';
const CurYear = new Date().getFullYear().toString();

const TermsAndConditions = () => {

    return (
        <Layout>
         <Head>
        <title>Terms and Conditions</title>
        </Head>
        <div className='bg-primary/60 h-full'>
        <div className="container mx-auto p-8 pt-40">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-primary mb-6">Terms and Conditions</h1>
                <p className="text-center text-gray-600 mb-4">Last updated: {CurYear}</p>
                <Image
                  src={'/Logo_VivaSoft.png'}
                  width={85}
                  height={20}
                  alt="Logo Vivasoft S.R.L."
                  priority={true}
                  className="m-auto mb-4"
                />
                {/* Sezione 1: Introduction */}
                <h3 className="text-2xl font-semibold text-primary mb-4 text-center">Introduction</h3>
                <p className="text-gray-600 text-lg text-center mb-6">
                Welcome to www.vivasoft.it. The following Terms and Conditions govern your use of our website and services. 
                Please read this information carefully before using the site. By using our site, you agree to these terms.
                </p>

                {/* Sezione 2: Use of the website */}
                <h3 className="text-2xl font-semibold text-primary mb-4 text-center">Use of the website</h3>
                <p className="text-gray-600 text-lg text-center mb-6">
                Access to and use of our website is permitted only for lawful purposes. You are not allowed to use the site for illegal, fraudulent or harmful activities of the site itself or third parties.
                </p>

                {/* Sezione 3: User Account */}
                <h3 className="text-2xl font-semibold text-primary mb-4 text-center">User Account</h3>
                <p className="text-gray-600 text-lg text-center mb-6">
                    Per accedere ad alcune funzionalità del nostro sito, è necessario creare un account. Sei responsabile per mantenere la riservatezza delle tue credenziali di accesso e per tutte le attività che avvengono nel tuo account.
                </p>

                {/* Sezione 4: Intellectual property */}
                <h3 className="text-2xl font-semibold text-primary mb-4 text-center">Intellectual property</h3>
                <p className="text-gray-600 text-lg text-center mb-6">
                All content, including text, images, logos and trademarks, on our site are the property of www.vivasoft.it or their respective copyright owners. Unauthorized use of this content is prohibited
                </p>

                {/* Sezione 5: Limitation of liability */}
                <h3 className="text-2xl font-semibold text-primary mb-4 text-center">Limitation of liability</h3>
                <p className="text-gray-600 text-lg text-center mb-6">
                We assume no liability for direct, indirect, incidental or consequential damages arising from the use of our website. You use the site at your own risk.
                </p>

                {/* Sezione 6: Changes to the term */}
                <h3 className="text-2xl font-semibold text-primary mb-4 text-center">Changes to the terms</h3>
                <p className="text-gray-600 text-lg text-center mb-6">
                We reserve the right to change these Terms and Conditions at any time. Changes will be posted on this page and will be effective upon posting.
                </p>

                {/* Sezione 7: Applicable law */}
                <h3 className="text-2xl font-semibold text-primary mb-4 text-center">Applicable law</h3>
                <p className="text-gray-600 text-lg text-center mb-6">
                These Terms and Conditions are governed by Italian law. Any disputes relating to the use of the site will be settled in the competent courts of Rome, Italy.
                </p>

                {/* Sezione 8: Contacts */}
                <h3 className="text-2xl font-semibold text-primary mb-4 text-center">Contacts</h3>
                <p className="text-gray-600 text-lg text-center mb-6">
                If you have any questions about these Terms and Conditions, please contact us at:
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
    )
}

export default TermsAndConditions;
