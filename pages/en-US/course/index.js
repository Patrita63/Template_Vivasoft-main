import LayoutEnUs from '../../../components/LayoutEnUs';
import Head from 'next/head'; // Importa il componente Head di Next.js

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../../variants';

// Importare il nuovo componente accordion
import CourseAccordion from '../../../components/CourseAccordion';

import { useMemo } from 'react';

const Course = () => {
  const courses = useMemo(() => [
    { title: 'Designing Microsoft Azure Infrastructure Solutions', content: 'Provides the skills needed to design and implement infrastructure solutions on Microsoft Azure.' },
    { title: 'Developing Solutions for Microsoft Azure - Azure Developer Associate', content: 'Designed for developers who want to gain expertise in designing and implementing cloud applications.' },
    { title: 'Microsoft Azure Administrator Associate', content: 'Designed for those who wish to acquire skills in the management and administration of resources on Microsoft Azure.' },
    { title: 'Designing and Implementing Microsoft DevOps Solutions', content: 'Intended for IT professionals and developers to implement DevOps solutions on Microsoft Azure.' },
    { title: 'Microsoft Azure IoT Developer', content: 'Aimed at developers who wish to acquire skills in the implementation and management of Internet of Things (IoT) solutions on Microsoft Azure.' },
  
  
    { title: 'Microsoft Azure Fundamentals', content: 'Provides the foundation to understand key concepts and services in Microsoft Azure. It\'s ideal for those new to cloud computing who want an overview of the solutions and services offered by Azure.' },
    { title: 'Microsoft Azure AI Fundamentals', content: 'Provides an introductory overview of artificial intelligence (AI) and related services available on Microsoft Azure. Ideal for those who want to understand the basics of AI.' },
    { title: 'Azure AI Engineer Associate', content: 'Designed for professionals who want to develop and deploy artificial intelligence solutions on Microsoft Azure.' },
    { title: 'Designing and Implementing a Microsoft Azure AI Solution', content: 'Designed for professionals who want to acquire advanced skills in the design and implementation of artificial intelligence solutions on Microsoft Azure.' },
    { title: 'Designing and Implementing a Data Science Solution on Azure', content: 'Aimed at professionals and developers who wish to gain expertise in designing and implementing data science solutions on Microsoft Azure.' },
  ], []);

  return (
    <LayoutEnUs>
      <Head>
        <title>Vivasoft Learning - Microsoft Training and Certifications</title>
        <meta name="description" content="Discover the training courses offered by Vivasoft Academy. Prepare for Microsoft certifications with courses on Power Apps, Power BI, Power Automate and more." />
        <meta name="keywords" content="Vivasoft Academy, Microsoft courses, IT training, Microsoft certifications, Power Apps, Power BI, Power Automate, professional training microsoft certifications, AZ-305, AZ-204, AZ-104, AZ-400, AZ-220, AZ-900, AI-900, AI-102, DP-100, PL-200, PL-300,PL-400,PL-500, PL-600, PL-900, MS-900, CKA, CKAD." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Vivasoft Academy - Microsoft Training and Certifications" />
        <meta property="og:description" content="Experience the Vivasoft Academy. Attend our training courses on Microsoft Power Apps, Power BI, Power Automate and get official certifications." />
        <meta property="og:image" content="/images/vivasoft-logo.jpg" />
        <meta property="og:url" content="https://www.vivasoft.it/course" />
      </Head>
      
      <div className="h-full bg-primary py-60 flex items-center bg-gradient-to-r from-primary via-black/30 to-black/10">
        <div className="container mx-auto">
          <div className="flex flex-col xl:flex-row gap-x-8">
            {/* Text Section */}
            <div className="text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0 xl:pt-0 pt-40">
              <motion.h2
                variants={fadeIn('up', 0.2)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="h2"
              >
                Vivasoft <span className="text-accent">Learning</span>
              </motion.h2>
              <motion.p
                variants={fadeIn('up', 0.4)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="mb-4 max-w-[400px] mx-auto lg:mx-0"
              >
                <span className='text-lg font-bold'>We are an established IT training company,</span><span className='text-lg'> with a focus on official Microsoft courses, customized courses and specialized training for companies. We offer solutions adapted to the different needs of our customers, with updated training programs and in line with the latest technological trends.
                In addition to the official courses, we offer customized courses, designed to meet the specific needs of companies. </span><span className='text-lg font-bold'>These courses are tailor-madea</span> <span className='text-lg'> to develop the skills required by individual teams or to address particular business issues.
                We provide training for </span><span className='text-accent1 font-bold text-lg'>all levels. </span>
                <span className='text-lg'>The courses are designed to meet the needs of professionals of different levels, from beginners to experts, with programs suitable for those who are new to the IT industry, but also for those who want to expand their skills.</span>
              </motion.p>
            </div>

            {/* Accordion dei corsi */}
            <motion.div
              variants={fadeIn('down', 0.6)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="w-full xl:max-w-[62%]"
            >
              <div>
                <CourseAccordion courses={courses} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </LayoutEnUs>
  );
};

export default Course;
