import React from 'react';
import CountUp from 'react-countup';

const TrustedCompanies = () => {
  const logos = [
    { name: 'PennState', src: '/logos/PennState.png' },
    { name: 'prgrammigher', src: '/logos/prgrammighero.png' },
    { name: 'prhero2', src: '/logos/prhero2.png' },
    { name: 'sony', src: '/logos/sony.png' },
    { name: 'zoom', src: '/logos/zoom.png' },
    { name: 'nike', src: '/logos/nike.png' },
    
    
    
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl opacity-60 md:text-3xl font-bold text-center text-pink-400 mb-12">
          Associate <CountUp duration={10} end={36000}/> + Peak Performance Teams
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {logos.map((logo) => (
            <div key={logo.name} className="bg-base-100  p-4 rounded-xl shadow-sm hover:shadow-lg transition duration-300 ease-in-out">
              <img
                src={logo.src}
                alt={logo.name}
                className="h-10 object-contain mx-auto animate-spin"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
