
import Head from 'next/head'; // Importa il componente Head di Next.js
import Image from 'next/image';
import Layout from '../components/Layout';
const CurYear = new Date().getFullYear().toString();

const TermsAndConditions = () => {

    return (
        <Layout>
         <Head>
        <title>Termini e Condizioni</title>
        </Head>
        <div className='bg-primary/60 h-full'>
        <div className="container mx-auto p-8 pt-40">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-primary mb-6">Termini e Condizioni</h1>
                <p className="text-center text-gray-600 mb-4">Ultimo aggiornamento: {CurYear}</p>
                <Image
                  src={'/Logo_VivaSoft.png'}
                  width={85}
                  height={20}
                  alt="Logo Vivasoft S.R.L."
                  priority={true}
                  className="m-auto mb-4"
                />
                {/* Sezione 1: Introduzione */}
                <h3 className="text-2xl font-semibold text-primary mb-4 text-center">Introduzione</h3>
                <p className="text-gray-600 text-lg text-center mb-6">
                    Benvenuto su www.vivasoft.it. I seguenti Termini e Condizioni regolano l&apos;utilizzo del nostro sito web e dei nostri servizi. 
                    Si prega di leggere attentamente queste informazioni prima di utilizzare il sito. Utilizzando il nostro sito, accetti questi termini.
                </p>

                {/* Sezione 2: Uso del sito */}
                <h3 className="text-2xl font-semibold text-primary mb-4 text-center">Uso del sito</h3>
                <p className="text-gray-600 text-lg text-center mb-6">
                    L&apos;accesso e l&apos;utilizzo del nostro sito web sono consentiti solo a scopo legittimo. Non è permesso utilizzare il sito per attività illegali, fraudolente o dannose per il sito stesso o per terzi.
                </p>

                {/* Sezione 3: Account utente */}
                <h3 className="text-2xl font-semibold text-primary mb-4 text-center">Account Utente</h3>
                <p className="text-gray-600 text-lg text-center mb-6">
                    Per accedere ad alcune funzionalità del nostro sito, è necessario creare un account. Sei responsabile per mantenere la riservatezza delle tue credenziali di accesso e per tutte le attività che avvengono nel tuo account.
                </p>

                {/* Sezione 4: Proprietà intellettuale */}
                <h3 className="text-2xl font-semibold text-primary mb-4 text-center">Proprietà intellettuale</h3>
                <p className="text-gray-600 text-lg text-center mb-6">
                    Tutti i contenuti, inclusi testi, immagini, loghi e marchi, presenti nel nostro sito sono di proprietà di www.vivasoft.it o dei rispettivi proprietari dei diritti d&apos;autore. L&apos;uso non autorizzato di questi contenuti è vietato.
                </p>

                {/* Sezione 5: Limitazione di responsabilità */}
                <h3 className="text-2xl font-semibold text-primary mb-4 text-center">Limitazione di responsabilità</h3>
                <p className="text-gray-600 text-lg text-center mb-6">
                    Non ci assumiamo alcuna responsabilità per danni diretti, indiretti, incidentali o consequenziali derivanti dall&apos;uso del nostro sito web. Utilizzi il sito a tuo rischio.
                </p>

                {/* Sezione 6: Modifiche ai termini */}
                <h3 className="text-2xl font-semibold text-primary mb-4 text-center">Modifiche ai termini</h3>
                <p className="text-gray-600 text-lg text-center mb-6">
                    Ci riserviamo il diritto di modificare questi Termini e Condizioni in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina e saranno efficaci dal momento della pubblicazione.
                </p>

                {/* Sezione 7: Legge applicabile */}
                <h3 className="text-2xl font-semibold text-primary mb-4 text-center">Legge applicabile</h3>
                <p className="text-gray-600 text-lg text-center mb-6">
                Questi Termini e Condizioni sono regolati dalla legge italiana. Eventuali controversie relative all&apos;uso del sito saranno risolte nei tribunali competenti di Roma, Italia.
                </p>

                {/* Sezione 8: Contatti */}
                <h3 className="text-2xl font-semibold text-primary mb-4 text-center">Contatti</h3>
                <p className="text-gray-600 text-lg text-center mb-6">
                    Se hai domande riguardo a questi Termini e Condizioni, puoi contattarci all&apos;indirizzo:
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
