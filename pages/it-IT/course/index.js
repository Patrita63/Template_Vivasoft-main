import Layout from '../../../components/Layout';
import Head from 'next/head'; // Importa il componente Head di Next.js

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../../variants';

// Importare il nuovo componente accordion
import CourseAccordion from '../../../components/CourseAccordion';

import { useMemo } from 'react';

const Course = () => {
  const courses = useMemo(() => [
    { title: 'Designing Microsoft Azure Infrastructure Solutions', content: 'Fornisce le competenze necessarie per progettare e implementare soluzioni infrastrutturali su Microsoft Azure.' },
    { title: 'Developing Solutions for Microsoft Azure - Azure Developer Associate', content: 'Progettato per sviluppatori che vogliono acquisire competenze nella progettazione e implementazione di applicazioni cloud.' },
    { title: 'Microsoft Azure Administrator Associate', content: 'Pensato per coloro che desiderano acquisire competenze nella gestione e amministrazione delle risorse su Microsoft Azure.' },
    { title: 'Designing and Implementing Microsoft DevOps Solutions', content: 'Destinato a professionisti IT e sviluppatori per implementare soluzioni DevOps su Microsoft Azure.' },
    { title: 'Microsoft Azure IoT Developer', content: 'Rivolto a sviluppatori che desiderano acquisire competenze nell\'implementazione e nella gestione di soluzioni Internet of Things (IoT) su Microsoft Azure.' },
  
  
    { title: 'Microsoft Azure Fundamentals', content: 'Fornisce le basi necessarie per comprendere i concetti chiave e i servizi di Microsoft Azure. È ideale per chi è nuovo nel cloud computing e desidera acquisire una panoramica delle soluzioni e dei servizi offerti da Azure.' },
    { title: 'Microsoft Azure AI Fundamentals', content: 'Offre una panoramica introduttiva sull\'intelligenza artificiale (AI) e sui servizi correlati disponibili su Microsoft Azure. Ideale per coloro che vogliono comprendere le basi dell\'AI.' },
    { title: 'Azure AI Engineer Associate', content: 'Progettato per professionisti che desiderano sviluppare e implementare soluzioni di intelligenza artificiale su Microsoft Azure.' },
    { title: 'Designing and Implementing a Microsoft Azure AI Solution', content: 'Pensato per professionisti che desiderano acquisire competenze avanzate nella progettazione e implementazione di soluzioni di intelligenza artificiale su Microsoft Azure.' },
    { title: 'Designing and Implementing a Data Science Solution on Azure', content: 'Indirizzato a professionisti e sviluppatori che desiderano acquisire competenze nella progettazione e implementazione di soluzioni di data science su Microsoft Azure.' },
  ], []);

  return (
    <Layout>
      <Head>
        <title>Vivasoft Learning - Formazione Microsoft e Certificazioni</title>
        <meta name="description" content="Scopri i corsi di formazione offerti da Vivasoft Academy. Preparati per le certificazioni Microsoft con corsi su Power Apps, Power BI, Power Automate e altro." />
        <meta name="keywords" content="Vivasoft Academy, corsi Microsoft, formazione IT, certificazioni Microsoft, Power Apps, Power BI, Power Automate, formazione professionale certificazioni microsoft, AZ-305, AZ-204, AZ-104, AZ-400, AZ-220, AZ-900, AI-900, AI-102, DP-100, PL-200, PL-300,PL-400,PL-500, PL-600, PL-900, MS-900, CKA, CKAD." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Vivasoft Academy - Formazione Microsoft e Certificazioni" />
        <meta property="og:description" content="Vivi l\'esperienza di Vivasoft Academy. Partecipa ai nostri corsi di formazione su Microsoft Power Apps, Power BI, Power Automate e ottieni le certificazioni ufficiali." />
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
                <span className='text-lg font-bold'>Siamo una realtà affermata nel settore della formazione IT,</span><span className='text-lg'> con un focus su corsi ufficiali Microsoft, corsi personalizzati e formazione specializzata per le aziende. Offriamo soluzioni adatte alle diverse esigenze dei nostri clienti, con programmi formativi aggiornati e in linea con le ultime tendenze tecnologiche.
              Oltre ai corsi ufficiali, offriamo corsi customizzati, progettati per rispondere alle specifiche necessità delle aziende. </span><span className='text-lg font-bold'>Questi corsi sono costruiti su misura</span> <span className='text-lg'> per sviluppare le competenze richieste dai singoli team o per affrontare problematiche aziendali particolari.
              Eroghiamo formazione per </span><span className='text-accent1 font-bold text-lg'>tutti i Livelli. </span><span className='text-lg'>I corsi sono progettati per soddisfare le esigenze di professionisti di diversi livelli, da principianti a esperti, con programmi adatti a chi è nuovo nel settore IT, ma anche a coloro che vogliono ampliare le proprie competenze.</span>
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
    </Layout>
  );
};

export default Course;
