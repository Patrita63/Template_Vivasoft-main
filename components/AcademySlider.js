import Image from 'next/image'; // Se stai usando Next.js

// service data
export const serviceData = [
  {
    image: '/Power_APPS.png',
    pdf: '/brochures/PowerApps.pdf',  // Percorso del file PDF per questo corso C#
  },
  {
    image: '/Azure.png',
    pdf: '/brochures/Azure.pdf',  // Percorso del file PDF per questo corso React
  },
  {
    image: '/Sharepoint.jpg',
    pdf: '/brochures/Sharepoint.pdf',  // Percorso del file PDF per questo corso Full stack Microsoft
  },
  {
    image: '/kuber.jpg',
    pdf: '/brochures/Kubernetes.pdf',  // Percorso del file PDF per questo corso
  },
  {
    image: '/PowerAutomate.png',
    pdf: '/brochures/PowerAutomate.pdf',  // Percorso del file PDF per questo corso
  },
  {
    image: '/PowerBI.png',
    pdf: '/brochures/PowerBI.pdf',  // Percorso del file PDF per questo corso
  },
  {
    image: '/Power_APPS.png',
    pdf: '/brochures/PowerApps.pdf',  // Percorso del file PDF per questo corso
  },
  {
    image: '/Azure.png',
    pdf: '/brochures/Azure.pdf',  // Percorso del file PDF per questo corso
  },
  {
    image: '/Sharepoint.jpg',
    pdf: '/brochures/Sharepoint.pdf',  // Percorso del file PDF per questo corso
  },
];

const ServiceCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {serviceData.map((item, index) => (
        <div
          key={index}
          className="bg-[rgba(65,47,123,0.15)] h-max rounded-lg px-6 py-8 flex flex-col gap-2 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300"
        >
          {/* Contenitore dell'immagine con il testo di hover */}
          <div className="relative w-full h-52">
            <Image
              src={item.image}
              alt={`Immagine servizio ${index + 1}`}   // Descrizione per l'accessibilità
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
                Scarica Brochure
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;
