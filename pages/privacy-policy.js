import Head from "next/head"; // Importa il componente Head di Next.js
import Image from 'next/image';

const CurYear = new Date().getFullYear().toString();
const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <div className="container mx-auto p-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-primary mb-6">
            Privacy Policy
          </h1>
          <p className="text-center text-gray-600 mb-4">
            Ultimo aggiornamento: 29/11/{CurYear}
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
            Introduzione
          </h2>
          <p className="text-gray-600 text-lg text-center mb-6">
            La presente Privacy Policy descrive come raccogliamo, utilizziamo,
            conserviamo, proteggiamo e condividiamo i tuoi dati personali quando
            utilizzi il nostro sito web www.vivasoft.it.
            Ti invitiamo a leggere attentamente questa politica per comprendere
            come trattiamo i tuoi dati personali.
          </p>

          {/* <!-- Sezione 1: Informazioni che raccogliamo --> */}
          <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
            Informazioni che raccogliamo
          </h3>
          <p className="text-gray-600 text-lg text-center mb-6">
            Possiamo raccogliere le seguenti informazioni:
          </p>
          <ul className="list-inside list-disc text-gray-600 text-lg mb-6 text-center">
            <li>
              Dati personali: Nome, indirizzo email, numero di telefono
            </li>
            <li>
              Dati di navigazione: Indirizzo IP, tipo di browser, sistema
              operativo, pagine visitate, tempo trascorso sul nostro sito, ecc.
            </li>
            <li>
              Dati raccolti tramite cookies: I cookies ci permettono di
              raccogliere informazioni sulle tue preferenze e attività sul
              nostro sito per migliorare l&apos;esperienza dell&apos;utente. Puoi
              controllare l&apos;uso dei cookies tramite le impostazioni del tuo
              browser.
            </li>
          </ul>

          {/* <!-- Sezione 2: Come utilizziamo le informazioni --> */}
          <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
            Come utilizziamo le informazioni
          </h3>
          <p className="text-gray-600 text-lg text-center mb-6">
            Utilizziamo le informazioni raccolte per:
          </p>
          <ul className="list-inside list-disc text-gray-600 text-lg mb-6 text-center">
            <li>Fornire e migliorare i nostri Servizi.</li>
            <li>Rispondere alle tue richieste e domande.</li>
            <li>Personalizzare la tua esperienza sul nostro sito.</li>
            <li>
              Inviarti comunicazioni relative ai nostri Servizi, come
              aggiornamenti o offerte speciali.
            </li>
            <li>
              Analizzare l&apos;uso del nostro sito per migliorare il contenuto e le
              funzionalità.
            </li>
            <li>Rispettare gli obblighi legali e normativi.</li>
          </ul>

          {/* <!-- Sezione 3: Condivisione delle informazioni --> */}
          <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
            Condivisione delle informazioni
          </h3>
          <p className="text-gray-600 text-lg text-center mb-6">
            Non vendiamo, scambiamo o cediamo le tue informazioni personali a
            terzi, ad eccezione dei seguenti casi:
          </p>
          <ul className="list-inside list-disc text-gray-600 text-lg mb-6 text-center">
            <li>
              <strong>Fornitori di servizi</strong>: Condividiamo i tuoi dati
              con fornitori di servizi terzi che ci aiutano a gestire il nostro
              sito web e i nostri Servizi (ad esempio, hosting, analisi dei
              dati, invio di email). Questi fornitori sono obbligati a
              proteggere i tuoi dati e non possono utilizzarli per scopi diversi
              da quelli per cui sono stati forniti.
            </li>
            <li>
              <strong>Obblighi legali</strong>: Potremmo essere tenuti a
              divulgare le tue informazioni per rispondere a richieste legali,
              come ordini del tribunale, inchieste governative, o per far
              rispettare i nostri diritti legali.
            </li>
          </ul>

          {/* <!-- Sezione 4: Protezione dei dati --> */}
          <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
            Protezione dei dati
          </h3>
          <p className="text-gray-600 text-lg text-center mb-6">
            Prendiamo misure di sicurezza ragionevoli per proteggere i tuoi dati
            personali da accessi non autorizzati, alterazioni, divulgazioni o
            distruzioni. Tuttavia, nessun metodo di trasmissione su Internet o
            di archiviazione elettronica è sicuro al 100%, e non possiamo
            garantire la sicurezza assoluta dei tuoi dati.
          </p>

          {/* <!-- Sezione 5: I tuoi diritti --> */}
          <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
            I tuoi diritti
          </h3>
          <p className="text-gray-600 text-lg text-center mb-6">
            Hai il diritto di:
          </p>
          <ul className="list-inside list-disc text-gray-600 text-lg mb-6 text-center">
            <li>
              <strong>Accesso</strong>: Richiedere l&apos;accesso alle informazioni
              che raccogliamo su di te.
            </li>
            <li>
              <strong>Correzione</strong>: Richiedere la correzione di
              informazioni imprecise o incomplete.
            </li>
            <li>
              <strong>Cancellazione</strong>: Chiedere la cancellazione dei tuoi
              dati personali, salvo che non ci siano motivi legali per
              trattenerli.
            </li>
            <li>
              <strong>Limitazione del trattamento</strong>: Chiedere di limitare
              il trattamento dei tuoi dati in determinate circostanze.
            </li>
            <li>
              <strong>Portabilità dei dati</strong>: Richiedere una copia dei
              tuoi dati personali in un formato strutturato, di uso comune e
              leggibile da dispositivo automatico.
            </li>
            <li>
              <strong>Revoca del consenso</strong>: Se il trattamento dei tuoi
              dati si basa sul consenso, hai il diritto di revocarlo in
              qualsiasi momento.
            </li>
          </ul>

          {/* <!-- Sezione 6: Cookies --> */}
          <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
            Cookies
          </h3>
          <p className="text-gray-600 text-lg text-center mb-6">
            Il nostro sito utilizza i cookies per migliorare la tua esperienza.
            Un cookie è un piccolo file che viene memorizzato sul tuo
            dispositivo quando visiti il nostro sito. Puoi scegliere di
            accettare o rifiutare i cookies, ma alcune funzionalità del sito
            potrebbero non funzionare correttamente senza di essi.
          </p>

          {/* <!-- Sezione 7: Modifiche alla Privacy Policy --> */}
          <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
            Modifiche alla Privacy Policy
          </h3>
          <p className="text-gray-600 text-lg text-center mb-6">
            Ci riserviamo il diritto di modificare questa Privacy Policy in
            qualsiasi momento. Le modifiche saranno pubblicate su questa pagina
            e saranno effettive dal momento della pubblicazione. Ti invitiamo a
            controllare periodicamente questa pagina per essere informato su
            eventuali aggiornamenti.
          </p>

          {/* <!-- Sezione 8: Contatti --> */}
          <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
            Contatti
          </h3>
          <p className="text-gray-600 text-lg text-center mb-6">
            Se hai domande riguardo questa Privacy Policy o il trattamento dei
            tuoi dati personali, puoi contattarci all&apos;indirizzo:
          </p>
          <p className="text-gray-600 text-lg text-center">
          Vivasoft S.R.L <br />
         via Copenaghen, 10 00144 Roma<br />
            <a href="mailto:info@vivasoft.it"> info@vivasoft.it</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
