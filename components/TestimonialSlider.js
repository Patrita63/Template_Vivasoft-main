// testimonial slider data
export const testimonialSlider = [
  {
    name: 'Vincenzo Criscuolo',
    position: 'Owner Multimediaform',
    message:
      `Ho il piacere di collaborare con Patrizio per lo sviluppo di percorsi formativi altamente qualificati nel campo dell\' IT e posso dire con certezza che ogni progetto con lui è sinonimo di eccellenza. 
      Ci supporta con corsi progettati e realizzati con un approccio su misura che rispecchia perfettamente le nostre esigenze. 
      Ogni corso si distingue per un\'esperienza coinvolgente, grazie alla sua capacità di rendere i concetti chiari e facilmente applicabili nella pratica. 
      I partecipanti apprezzano la qualità dell\'insegnamento, la disponibilità a rispondere alle domande e il clima positivo che sa creare in aula o online. 
      Inoltre, lavorare con Patrizio è sempre una garanzia di affidabilità. Rispetta ogni scadenza, è estremamente flessibile e, soprattutto, orientato al risultato. 
      Grazie alla sua competenza e professionalità, i nostri clienti non solo acquisiscono nuove competenze, ma sviluppano una vera consapevolezza su come applicarle per migliorare il loro lavoro quotidiano. 
      Raccomando vivamente Patrizio a chiunque stia cercando un professionista eccezionale nel campo della formazione. 
      Sono certo che continueremo a collaborare a lungo e che ogni progetto futuro sarà all\’altezza delle aspettative, se non oltre!`,
  },
  {
    name: 'Vittorio Goletti',
    position: 'CEO Crescendo',
    message:
      `Patrizio ha lavorato con me come Formatore Senior in tecnologie Microsoft.
      Ogni progetto che porta la sua firma è andato bene, ottenendo apprezzamento del cliente e beneficio dei partecipanti.
      In particolare segnalo di Patrizio:
      - La preparazione profonda e volta sempre all'uso pratico sul lavoro.
      - La capacità di gestire le piccole e grandi difficoltà che spesso caratterizzano i progetto formativi.
      - Il dialogo franco, a volte anche duro, ma sempre volto al miglioramento del servizio reso, al beneficio 
      dei clienti, all'apprendimento dei partecipanti.
      Patrizio ha molto appreso e tuttavia non si stanca mai di imparare. Il mondo Microsoft, pur nella sua crescente smisurata vastità, non lo intimidisce, ma anzi lo sprona ad approfondire ed estendere, continuamente e sistemicamente, i sui campi conoscenza e di azione.`,
  },
  {
    name: 'Elena Paraboschi',
    position: 'Sales Manager at Inforpc and ValueGroup',
    message:"Ho avuto modo di collaborare con Patrizio e ho sempre apprezzato la sua professionalità e competenza nel mondo Microsoft. Il suo approccio chiaro e pratico alla formazione lo rende un docente affidabile e preparato.",
  },
  {
    name: 'Eduard Stefanica',
    position: 'Studente',
    message:"Consiglio vivamente Patrizio come esperto nel campo dello sviluppo software e delle reti. Durante il corso presso l'academy .Net 2023/24, ha dimostrato una conoscenza approfondita e una capacità straordinaria di insegnamento. La sua leadership empatica e la sua passione per l'insegnamento lo rendono un prezioso asset per qualsiasi team o progetto tecnologico. Inoltre, la sua vasta esperienza è supportata da numerose certificazioni Microsoft, confermando ulteriormente il suo livello di competenza nel settore.",
  },
  {
    name: 'Beatrice Bottini',
    position: 'Web Designer | Web Developer',
    message:
      'Ho avuto il piacere di lavorare con Patrizio e posso dire senza esitazioni che è una delle persone più competenti e professionali con cui abbia mai collaborato. La sua capacità di affrontare le problematiche e la sua attenzione ai dettagli sono davvero impressionanti. In particolare, mi ha colpito la sua straordinaria abilità nell\'implementare tecnologie, dimostrando una padronanza magistrale. La sua attitudine positiva e la sua dedizione sono una vera fonte di ispirazione per tutti coloro che lavorano con lui. È stato un grande onore lavorare al suo fianco.',
  },
];

// import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';

// import swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation } from 'swiper';

// icons
import { FaQuoteLeft } from 'react-icons/fa';
// next image
// import Image from 'next/image';

const TestimonialSlider = () => {
  return (
    <Swiper
      navigation={true}
      // pagination={{
      //   clickable: true,
      // }}
      modules={[Navigation]}
      className='xl:h-[500px] sm:h-[800] font-["Segoe UI"]'
    >
      {testimonialSlider.map((person, index) => {
        return (
          <SwiperSlide key={index}>
            <div className='flex flex-col items-center md:flex-row gap-x-8 h-full px-10'>
              {/* avatar, name, position */}
              <div className='w-full max-w-[300px] flex flex-col xl:justify-center items-center relative mx-auto xl:mx-0'>
                <div className='flex flex-col justify-center text-center'>
                  {/* avatar */}
                  {/* <div className='mb-2 mx-auto'>
                    <Image src={person.image} width={100} height={100} alt='' />
                  </div> */}
                  {/* name */}
                  <div className='text-lg'>{person.name}</div>
                  {/* position */}
                  <div className='text-[12px] uppercase font-extralight tracking-widest'>
                    {person.position}
                  </div>
                </div>
              </div>
              {/* quote & message */}
              <div className=' flex flex-col justify-center before:w-[1px] xl:before:bg-white/20 xl:before:absolute xl:before:left-0 xl:before:h-[200px] relative xl:pl-20'>
                {/* quote icon */}
                <div className='py-2'>
                  <FaQuoteLeft className='text-4xl xl:text-6xl text-white/20 mx-auto md:mx-0' />
                </div>
                {/* message */}
                {/* <div className='xl:w-full xl:text-lg text-center md:text-left sm:text-sm sm:w-[210px]> */}
                <div className="xl:w-full text-center md:text-left lg:text-lg xl:text-lg text-white/60 sm:w-[210px]">
                  {person.message}
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TestimonialSlider;
