import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ANIMATION_EASE } from '../types';

const heroImages = [
  "https://i.pinimg.com/736x/4a/ab/1c/4aab1c0f02815ea1ca8805216e6d6d03.jpg",
  "https://i.imgur.com/93tvJvK.jpeg",
  "https://i.pinimg.com/736x/ee/e7/2d/eee72deca1abe2e5aa534740cbc37212.jpg",
  "https://i.pinimg.com/1200x/1c/5b/ab/1c5baba4c27b2057feacd5ee6a296b18.jpg",
  "https://i.pinimg.com/736x/1e/8d/42/1e8d42e9a9368bd335229cf776b454b5.jpg",
  "https://i.pinimg.com/736x/61/b7/f3/61b7f34e590d14bf6643264b3859ebb6.jpg",
  "https://i.pinimg.com/736x/a7/6c/71/a76c7143e50b484e3c826aa54ace0db2.jpg",
  "https://i.pinimg.com/1200x/07/30/4b/07304bfa3d8bef1f60dd1a78d7b643b4.jpg",
  "https://i.pinimg.com/736x/5f/bf/d6/5fbfd6b4f484591c0409189388d32910.jpg",
  "https://i.pinimg.com/736x/2f/27/3f/2f273f4356a7287b7653437ad70f4df1.jpg",
  "https://i.pinimg.com/736x/17/52/b8/1752b8ecd65e37bcecb8cd1f1a43012e.jpg"
];

const HeroLiquid: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="top" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 md:pt-32 md:pb-40 px-8 md:px-16 overflow-hidden">
      
      {/* Animated Liquid Container */}
      <motion.div 
        className="relative w-[300px] h-[380px] md:w-[500px] md:h-[650px] mb-6 md:mb-12 overflow-hidden shadow-2xl"
        // Organic Liquid Morphing Animation
        animate={{ 
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%"
          ]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.img 
            key={currentIndex}
            src={heroImages[currentIndex]}
            alt="Hero Texture"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Overlay for depth */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </motion.div>

      {/* Hero Typography */}
      <div className="max-w-[1200px] w-full text-left md:text-center z-10">
        <div className="overflow-hidden">
          <motion.h2 
            initial={{ y: "100%", skewY: 5 }}
            animate={{ y: 0, skewY: 0 }}
            transition={{ duration: 1, ease: ANIMATION_EASE, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-medium text-white tracking-tight"
          >
            We’re Stylist Studio
          </motion.h2>
        </div>
        <div className="overflow-hidden mt-2">
          <motion.h2
            initial={{ y: "100%", skewY: 5 }}
            animate={{ y: 0, skewY: 0 }}
            transition={{ duration: 1, ease: ANIMATION_EASE, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-medium text-white/60 tracking-tight"
          >
            The Creative Identity
          </motion.h2>
        </div>
        
        <div className="mt-8 md:mt-12 max-w-5xl mx-auto">
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.6, ease: ANIMATION_EASE }}
             className="text-lg md:text-xl text-gray-400 font-light leading-snug max-w-2xl md:mx-auto"
           >
             Fluid creativity meets architectural precision. <br/>
             Discover a salon experience designed for your unique persona.
           </motion.p>
        </div>
      </div>
    </section>
  );
};

export default HeroLiquid;