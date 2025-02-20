// service data
export const serviceData = [
  {

    title: 'Azure',
    description: 'Scalable, secure solutions on Microsoft Azure to support your computing, storage and networking needs.',
  },
  {
    
    title: 'Microsoft 365',
    description: 'Integrated suite of tools, such as Word, Excel, Teams and Outlook to improve document management.',
  },
  {
    
    title: 'Data Analysis',
    description: 'We analyze and interpret your data to identify trends and opportunities, improving business processes.',
  },
  {
    
    title: 'Power Apps',
    description: 'Simplify your business processes with the low-code platform that allows you to create custom applications.',
  },
  {
    
    title: 'Power BI',
    description: 'Powerful business intelligence tool that transforms complex data into visual and interactive reports, with custom dashboards.',
  },
  {
   
    title: 'Power Automate',
    description: 'We create workflows that connect your applications and services, reducing time spent on repetitive tasks.',
  },
  {
   
    title: 'Sharepoint Online',
    description: 'We help you create and manage secure intranet sites, share information in real time and improve team productivity.',
  },
  {
   
    title: 'Sharepoint On-Premises',
    description: 'For those who prefer to keep total control over their IT infrastructure.',
  },
  {
    
    title: 'Business processes',
    description: 'We help your company to improve and reduce costs with customized solutions, optimizing business flows.',
  },
 
];

const ServiceCardsEnUs = () => {
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

export default ServiceCardsEnUs;
