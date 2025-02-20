import React, { useState } from "react";

// components
import Layout from "../../../components/Layout";
import ParticlesContainer from '../../../components/ParticlesContainer';

// icons
import { VscAzure, VscAzureDevops } from "react-icons/vsc";

import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { TbBrandCSharp } from "react-icons/tb";

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaPython,
  FaAngular,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiAzurefunctions,
  SiMicrosoftsharepoint,
  SiMicrosoftonedrive,
  SiMicrosoftsqlserver,
  SiDotnet,
} from "react-icons/si";

const CurYear = new Date().getFullYear().toString();
const NextYear = new Date().getFullYear() + 1;
console.log("CurYear: " + CurYear);
//  about data
// https://stackoverflow.com/questions/76795198/getting-missing-key-prop-for-element-in-array-react-jsx-key-on-build
// RESOLVE Error: Missing "key" prop for element in array  react/jsx-key
// https://react-icons.github.io/react-icons/
// https://bobbyhadz.com/blog/react-encountered-two-children-with-the-same-key
export const aboutData = [
  {
    title: "Competenze",
    info: [
      {
        title: "Tecnologie",
        icons: [
          <VscAzure key={1} />,
          <VscAzureDevops key={2} />,
          <SiAzurefunctions key={3} />,
          <SiMicrosoftsharepoint key={4} />,
          <SiMicrosoftonedrive key={5} />,
          <SiMicrosoftsqlserver key={6} />,
          <PiMicrosoftExcelLogo key={7} />,
          <SiDotnet key={8} />,
        ],
      },
      {
        title: "Web Development",
        icons: [
          <FaHtml5 key={9} />,
          <FaCss3 key={10} />,
          <FaJs key={11} />,
          <FaReact key={12} />,
          <SiNextdotjs key={13} />,
        ],
      },
      {
        title: "Linguaggi",
        icons: [
          <TbBrandCSharp key={14} />,
          <FaReact key={15} />,
          <FaPython key={16} />,
          <FaAngular key={17} />,
        ],
      },
    ],
  },
  {
    title: "Certificazioni",
    info: [
      {
        title: "Microsoft Certified Trainer",
        stage: `Dal 27 Mar 2017 al ${CurYear}`,
      },
      {
        title: "Microsoft Certified: DevOps Engineer Expert",
        stage: `Dal 22 Nov 2024 al 23 Nov ${NextYear}`,
      },
      {
        title: "Microsoft Certified: Azure Administrator Associate",
        stage: `Dal 22 Nov 2024 al 23 Nov ${NextYear}`,
      },
      {
        title: "MCSA: Web Applications",
        stage: `Dal 24 Mar 2017 al ${CurYear}`,
      },
      {
        title:
          "Microsoft Certified Solutions Developer: SharePoint Applications",
        stage: `Dal 24 Mar 2017 al ${CurYear}`,
      },
      {
        title: "MCSD: App Builder",
        stage: `Dal 24 Mar 2017 al ${CurYear}`,
      },
      {
        title:
          "Microsoft Specialist: Programming in HTML5 with JavaScript and CSS3",
        stage: `Dal 16 Gen 2017 al ${CurYear}`,
      },
      {
        title: "Microsoft Certified Professional",
        stage: `Dal 21 Ott 2014 al ${CurYear}`,
      },
      {
        title:
          "Microsoft® Certified Technology Specialist: SharePoint 2010, Application Development",
        stage: `Dal 12 Sett 2013 al ${CurYear}`,
      },
    ],
  },
  {
    title: "Corsi",
    info: [
      {
        title: "AZ-305: Designing Microsoft Azure Infrastructure Solutions",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/exams/az-305/",
      },
      {
        title:
          "AZ-204: Developing Solutions for Microsoft Azure - Azure Developer Associate",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/?practice-assessment-type=certification",
      },
      {
        title: "AZ-104: Microsoft Azure Administrator Associate",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/?practice-assessment-type=certification",
      },
      {
        title: "AZ-400: Designing and Implementing Microsoft DevOps Solutions",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/exams/az-400/",
      },
      {
        title: "AZ-220: Microsoft Azure IoT Developer",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-220",
      },
      {
        title: "AZ-900: Microsoft Azure Fundamentals",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/?practice-assessment-type=certification",
      },
      {
        title: "AI-900: Microsoft Azure AI Fundamentals",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-900",
      },
      {
        title: "Azure AI Engineer Associate - AI-102",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/?practice-assessment-type=certification",
      },
      {
        title:
          "AI-102: Designing and Implementing a Microsoft Azure AI Solution",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-102",
      },
      {
        title:
          "DP-100: Designing and Implementing a Data Science Solution on Azure",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-100",
      },
      {
        title: "DP-203: Data Engineering on Microsoft Azure",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-203",
      },
      {
        title: "PL-200: Microsoft Power Platform Functional Consultant",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-200",
      },
      {
        title: "PL-300: Microsoft Power BI Data Analyst Associate",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/?practice-assessment-type=certification",
      },
      {
        title: "PL-400: Microsoft Power Platform Developer",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-400",
      },
      {
        title: "PL-500: Microsoft Power Automate RPA Developer",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-500",
      },
      {
        title: "PL-600: Microsoft Power Platform Solution Architect",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-600",
      },
      {
        title: "PL-900 Corso Power Platform Fundamentals",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-900",
      },
      {
        title: "Microsoft 365 Certified: Fundamentals",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/microsoft-365-fundamentals/?practice-assessment-type=certification",
      },
      {
        title: "Microsoft 365 Certified: Administrator Expert",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/m365-administrator-expert/",
      },
      {
        title: "MS-900: Microsoft 365 Fundamentals",
        stage:
          "https://learn.microsoft.com/en-us/credentials/certifications/microsoft-365-fundamentals/?practice-assessment-type=certification",
      },
      {
        title: "Certified Kubernetes Administrator (CKA)",
        stage:
          "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/",
      },
      {
        title: "Certified Kubernetes Application Developer (CKAD))",
        stage:
          "https://training.linuxfoundation.org/certification/certified-kubernetes-application-developer-ckad/",
      },
    ],
  },
];

import Head from "next/head"; // Importa il componente Head di Next.js

// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";

// counter
import CountUp from "react-countup";
// import { isAbsoluteUrl } from "next/dist/shared/lib/utils";

const Company = () => {
  const [index, setIndex] = useState(0);
  // console.log(index);
  return (
    <Layout>
      <Head>
        <title>Vivasoft - Chi siamo</title>
        <meta
          name="description"
          content="Scopri chi siamo e cosa facciamo. Vivasoft offre soluzioni Microsoft innovative nel settore IT."
        />
        <meta
          name="keywords"
          content="Vivasoft, soluzioni IT, Microsoft Sharepoint online, Microsoft Sharepoint on-premises, Microsoft Power Apps, Power BI, Power Automate, C#, Python, Consulenza React e Angular, certificazioni Microsoft, AZ-305, AZ-204, AZ-104, AZ-400, AZ-220, AZ-900, AI-900, AI-102, DP-100, PL-200, PL-300,PL-400,PL-500, PL-600, PL-900, MS-900, CKA, CKAD"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Vivasoft - Chi Siamo" />
        <meta
          property="og:description"
          content="Scopri come Vivasoft aiuta le aziende a innovare e ottimizzare i processi aziendali."
        />
        <meta property="og:image" content="/images/vivasoft-logo.jpg" />
        <meta property="og:url" content="https://www.vivasoft.it/company" />
      </Head>
      <div className="h-full bg-primary xl:py-60 py-80 text-center xl:text-left bg-gradient-to-r from-primary via-black/30 to-black/10">
        <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6">
          {/* text */}
          <div className="flex-1 flex flex-col justify-center xl:pt-0 pt-20">
            <motion.h2
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2"
            >
              <span className="text-accent">Vivasoft</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="max-w-[600px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0"
            >
              <span className='text-lg font-bold'>Da oltre 10 anni è una realtà consolidata nel settore IT, </span>
              <span className='text-lg'>specializzata nell&apos;insegnamento e nella realizzazione di
              soluzioni basate sulle piattaforme{" "}</span>
              <span className="text-lg text-secondary">
                Microsoft Sharepoint, Microsoft Power Apps, Power BI e Power Automate.
              </span>
            </motion.p>
                    {/* particles */}
          <ParticlesContainer />
            {/* counters */}
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
            >
              <div className="flex flex-1 xl:gap-x-6">
                {/* experience */}
                <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                  <div className="text-2xl xl:text-4xl font-extrabold text-secondary mb-2">
                    <CountUp start={0} end={10} duration={5} /> +
                  </div>
                  <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                    Anni di esperienza
                  </div>
                </div>
                {/* clients */}
                <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                  <div className="text-2xl xl:text-4xl font-extrabold text-secondary mb-2">
                    <CountUp start={0} end={50} duration={5} /> +
                  </div>
                  <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                    Clienti
                  </div>
                </div>
                {/* projects */}
                <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                  <div className="text-2xl xl:text-4xl font-extrabold text-secondary mb-2">
                    <CountUp start={0} end={100} duration={5} /> +
                  </div>
                  <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                    Progetti
                  </div>
                </div>
                {/* awards */}
                <div className="relative flex-1">
                  <div className="text-2xl xl:text-4xl font-extrabold text-secondary mb-2">
                    <CountUp start={0} end={8} duration={5} /> +
                  </div>
                  <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                    Certificazioni
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          {/* info */}
          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-col w-full xl:max-w-[48%] h-full"
          >
            <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4">
              {aboutData.map((item, itemIndex) => {
                return (
                  <div
                    key={itemIndex}
                    className={`${
                      index === itemIndex &&
                      "text-accent after:w-[100%] after:bg-secondary after:transition-all after:duration-300"
                    } cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
                    onClick={() => setIndex(itemIndex)}
                  >
                    {item.title}
                  </div>
                );
              })}
            </div>
            {/* Tabella */}
            <div className="overflow-x-auto py-2 xl:py-6 z-40">
              <table className="min-w-full table-auto text-white/60">
                <tbody>
                  {aboutData[index].info.map((item, itemIndex) => {
                    return (
                      <tr key={itemIndex} className="border-b border-white/20">
                        <td className="p-2 font-light">{item.title}</td>
                        <td className="p-2">
                          {String(item.stage).startsWith("http") === false ? (
                            <div className="text-sm">{item.stage}</div>
                          ) : (
                            <a
                              href={item.stage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent hover:text-white text-sm"
                            >
                              Info
                            </a>
                          )}
                        </td>
                        <td className="p-2">
                          <div className="flex gap-x-2">
                            {item.icons?.map((icon, iconIndex) => (
                              <div key={iconIndex} className="text-2xl">
                                {icon}
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Company;
