// next image
import Image from 'next/image';

const TopLeftImg = () => {
  return (
    <div className='absolute left-0 top-0 mix-blend-color-dodge z-10 w-[200px] xl:w-[400px] opacity-50'>
      <Image src='/bg-explosion.png' width={200} height={200} alt='' />
    </div>
  );
};

export default TopLeftImg;
