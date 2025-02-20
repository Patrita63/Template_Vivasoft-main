// testimonial slider data
export const testimonialSlider = [
  {
    name: 'Vincenzo Criscuolo',
    position: 'Owner Multimediaform',
    message:
      `I have the pleasure of collaborating with Patrizio for the development of highly qualified training courses in the field of IT and I can say with certainty that every project with him is synonymous with excellence. 
      It supports us with courses designed and built with a tailor-made approach that perfectly reflects our needs. 
      Each course is distinguished by an 'immersive experience', thanks to its ability to make concepts clear and easily applicable in practice. 
      The participants appreciate the quality of teaching, the willingness to answer questions and the positive atmosphere that it can create in class or online. 
      In addition, working with Patrizio is always a guarantee of reliability. It meets every deadline, is extremely flexible and, above all, results-oriented. 
      Thanks to his expertise and professionalism, our clients not only acquire new skills, but develop a real awareness on how to apply them to improve their daily work. 
      I highly recommend Patrizio to anyone looking for an outstanding professional in the field of training. 
      I am sure that we will continue to work together for a long time and that any future project will be up to expectations, if not beyond! `,
  },
  {
    name: 'Vittorio Goletti',
    position: 'CEO Crescendo',
    message:
      `Patrizio worked with me as a Senior Trainer in Microsoft technologies.
      Each project bearing his signature has gone well, gaining customer appreciation and participant benefit.
      In particular, I point out to Patrizio:
      - The deep preparation and always aimed at practical use on the job.
      - The ability to manage the small and large difficulties which often characterize training projects.
      - Frank dialogue, sometimes even hard, but always aimed at improving the service rendered, to benefit 
      of customers, to the participants' learning.
      Patrizio has learned a lot and yet he never tires of learning. The world of Microsoft, even in its growing boundless vastness, does not intimidate it, but rather encourages it to deepen and extend, continuously and systematically, its fields of knowledge and action. `,
  },
  {
    name: 'Elena Paraboschi',
    position: 'Sales Manager at Inforpc and ValueGroup',
    message:"I have had the opportunity to work with Patrizio and I have always appreciated his professionalism and expertise in the world of Microsoft. His clear and practical approach to training makes him a reliable and well-prepared teacher.",
  },
  {
    name: 'Eduard Stefanica',
    position: 'Learner',
    message:"I highly recommend Patrizio as an expert in the field of software development and networks. During the course at the academy . Net 2023/24, has demonstrated in-depth knowledge and extraordinary teaching ability. His empathic leadership and passion for teaching make him a valuable asset to any team or technology project. In addition, his extensive experience is supported by numerous Microsoft certifications, further confirming his level of expertise in the field.",
  },
  {
    name: 'Beatrice Bottini',
    position: 'Web Designer | Web Developer',
    message:
      'I had the pleasure of working with Patrizio and I can say without hesitation that he is one of the most competent and professional people I have ever worked with. His ability to address issues and his attention to detail are really impressive. In particular, I was impressed by his extraordinary ability to implement technologies, demonstrating masterful mastery. His positive attitude and dedication are a true source of inspiration for all those who work with him. It has been a great honour to work alongside him.',
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
