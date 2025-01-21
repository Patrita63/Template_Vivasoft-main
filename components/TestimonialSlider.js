// testimonial slider data
export const testimonialSlider = [
  {
    
    name: 'Eduard Stefanica',
    position: 'Studente',
    message:"Consiglio vivamente il signor Patrizio come esperto nel campo dello sviluppo software e delle reti. Durante il corso presso l'academy .Net 2023/24, ha dimostrato una conoscenza approfondita e una capacità straordinaria di insegnamento. La sua leadership empatica e la sua passione per l'insegnamento lo rendono un prezioso asset per qualsiasi team o progetto tecnologico. Inoltre, la sua vasta esperienza è supportata da numerose certificazioni Microsoft, confermando ulteriormente il suo livello di competenza nel settore.",
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
    
    name: 'Jhon Doe',
    position: 'Customer',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita odit beatae, cupiditate saepe quam officia aut placeat quas neque!',
  },
];

// import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';

// import swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper';

// icons
import { FaQuoteLeft } from 'react-icons/fa';
// next image
import Image from 'next/image';

const TestimonialSlider = () => {
  return (
    <Swiper
      navigation={true}
      // pagination={{
      //   clickable: true,
      // }}
      modules={[Navigation]}
      className='h-[600px]'
    >
      {testimonialSlider.map((person, index) => {
        return (
          <SwiperSlide key={index}>
            <div className='flex flex-col items-center md:flex-row gap-x-8 h-full px-16'>
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
                <div className='xl:text-lg text-center md:text-left'>
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
