import Image from 'next/image'; 

// service data
export const serviceData = [
  {
    image: '/Power_APPS.png',
    pdf: '/brochures/EN/PowerApps.pdf',  // PDF file path for this course C#
  },
  {
    image: '/Azure.png',
    pdf: '/brochures/EN/Azure.pdf',  // PDF file path for this course React
  },
  {
    image: '/Sharepoint.jpg',
    pdf: '/brochures/EN/Sharepoint.pdf',  // PDF file path for this course Full stack Microsoft
  },
  {
    image: '/kuber.jpg',
    pdf: '/brochures/EN/Kubernetes.pdf',  // PDF file path for this course 
  },
  {
    image: '/PowerAutomate.png',
    pdf: '/brochures/EN/PowerAutomate.pdf',  // PDF file path for this course 
  },
  {
    image: '/PowerBI.png',
    pdf: '/brochures/EN/PowerBI.pdf',  // PDF file path for this course 
  },
  {
    image: '/React.png',
    pdf: '/brochures/EN/React.pdf',  // PDF file path for this course 
  },
  {
    image: '/Csharp.jpeg',
    pdf: '/brochures/EN/CSharp.pdf',  // PDF file path for this course 
  },
  {
    image: '/python.png',
    pdf: '/brochures/EN/Python.pdf',  // PDF file path for this course 
  },
];

const ServiceCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
      {serviceData.map((item, index) => (
        <div
          key={index}
          className="bg-[rgba(65,47,123,0.15)] h-max rounded-lg px-6 py-8 flex flex-col gap-2 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300"
        >
          {/* Contenitore dell'immagine con il testo di hover */}
          <div className="relative w-full h-52">
            <Image
              src={item.image}
              alt={`Service image ${index + 1}`}   // Description for accessibility
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            {/* Overlay e testo al passaggio del mouse */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 text-white text-xl font-bold transition-opacity duration-300">
              {/* Link di download per il PDF */}
              <a 
                href={item.pdf} 
                download // Forza il download del file PDF
                className="text-white hover:text-gray-200"
              >
                Download Brochure
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;
