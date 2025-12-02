import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BANNERS = [
  'https://picsum.photos/id/1080/1200/400', // Strawberries
  'https://picsum.photos/id/113/1200/400',  // Tea/Nature
  'https://picsum.photos/id/292/1200/400',  // Vegetables
  'https://picsum.photos/id/429/1200/400',  // Fruits
];

const BannerCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((curr) => (curr === 0 ? BANNERS.length - 1 : curr - 1));
  const next = () => setCurrent((curr) => (curr + 1) % BANNERS.length);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-stone-200 group">
      {BANNERS.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={src} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute bottom-10 left-10 text-white drop-shadow-md">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">新鮮直送到府</h2>
            <p className="text-lg md:text-xl">嚴選台灣在地優質蔬果，當季最對味</p>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur-sm text-white transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur-sm text-white transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={30} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === current ? 'bg-accent' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
