import React, { useEffect, useState } from 'react';

const ScrollingText = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const animate = () => {
      setScrollPosition(prev => (prev - 0.5) % 100);
      requestAnimationFrame(animate);
    };
    
    const animation = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animation);
  }, []);

  const text = "ABC Club";
  const repeats = 8;

  return (
    <div className="relative w-full text-[4rem] sm:text-[8rem] md:text-[9rem] lg:text-[16rem] font-bold" style={{ height: '0.8em' }}>
      {[...Array(repeats)].map((_, index) => (
        <div
          key={index}
          className="absolute whitespace-nowrap px-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: `translate(-50%, -50%) translate3d(${scrollPosition + (index * 120)}%, 0px, 0px)`,
            transition: 'transform 0.1s linear'
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default ScrollingText;