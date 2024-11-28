import {
  RxCrop,
  RxDesktop,
  RxPencil2,
  RxReader,
  RxRocket,
  RxArrowTopRight,
} from 'react-icons/rx';

// service data
export const serviceData = [
  {

    title: 'Azure',
    description: 'Soluzioni scalabili e sicure su Microsoft Azure, per supportare le tue esigenze di computing, storage e networking.',
  },
  {
    
    title: 'Microsoft 365',
    description: 'Suite integrata di strumenti, come Word, Excel, Teams e Outlook per migliorare la gestione dei documenti.',
  },
  {
    
    title: 'Data Analysis',
    description: 'Analizziamo e interpretiamo i tuoi dati per identificare tendenze e opportunità, migliorando i processi aziendali.',
  },
  {
    
    title: 'Power Apps',
    description: 'Semplifica i tuoi processi aziendali con la piattaforma low-code che ti consente di creare applicazioni personalizzate',
  },
  {
    
    title: 'Power BI',
    description: 'Strumento potente di business intelligence che trasforma i dati complessi in report visivi e interattivi,con dashboard personalizzate',
  },
  {
   
    title: 'Power Automate',
    description: 'Creiamo flussi di lavoro che collegano le tue applicazioni e servizi, riducendo il tempo speso su attività ripetitive',
  },
  {
   
    title: 'Sharepoint Online',
    description: 'Ti aiutiamo a creare e gestire siti intranet sicuri, condividere informazioni in tempo reale e migliorare la produttività del team',
  },
  {
   
    title: 'Sharepoint On-Premises',
    description: 'Per chi preferisce mantenere il controllo totale sulla propria infrastruttura IT.',
  },
  {
    
    title: 'Processi Aziendali',
    description: 'Aiutiamo la tua azienda a migliorare e a ridurre i costi con soluzioni su misura, ottimizzando i flussi aziendali',
  },
 
];

const ServiceCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {serviceData.map((item, index) => {
        return (
          <div key={index} className="bg-[rgba(65,47,123,0.15)] h-max rounded-lg px-6 py-8 flex flex-col gap-6 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300">
            {/* Icon */}
            {/* <div className="text-4xl text-accent mb-4">{item.icon}</div> */}
            {/* Title & Description */}
            <div>
              <div className="text-accent text-lg font-semibold mb-2">{item.title}</div>
              <p className="max-w-[350px] leading-normal text-sm">{item.description}</p>
            </div>
            {/* Arrow */}
            {/* <div className="text-3xl mt-4">
              <RxArrowTopRight className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300" />
            </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default ServiceCards;
