import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { lenisRef } from './SmoothScroll';

const Header: React.FC = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Track scroll for background styling
  // 스크롤 방향 감지
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 100) {
      setHidden(false); // 최상단에선 항상 보임
    } else if (latest > lastScrollY) {
      setHidden(true); // 아래로 스크롤 → 숨김
    } else {
      setHidden(false); // 위로 스크롤 → 보임
    }
    setLastScrollY(latest);
  });

  // 스크롤 멈추면 1.5초 후 네비게이션 나타남
useEffect(() => {
  let timer: NodeJS.Timeout;
  
  const handleScroll = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setHidden(false);
    }, 800);
  };

  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
    clearTimeout(timer);
  };
}, []);

const handleScrollTo = (id: string) => {
  setMenuOpen(false); // Close menu on selection
  if (lenisRef.current) {
    lenisRef.current.scrollTo(id);
  }
};

// Updated Navigation Items per user request
const navItems = [
  { label: 'ABOUT', id: '#about' },
  { label: 'DESIGNER', id: '#designer' }, // Formerly WORK
  { label: 'STYLE', id: '#style' },       // Formerly SERVICES
  { label: 'PRICE', id: '#price' },       // New
  { label: 'REVIEW', id: '#reviews' },     // New
  { label: 'BOOKING', id: '#booking' }    // New
];

return (
  <>
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${hidden ? 'translate-y-[-100%]' : 'translate-y-0 backdrop-blur-md bg-black/40'}
        }`}
      onMouseEnter={() => setHidden(false)}
    >
      <div className="flex justify-between items-center max-w-[1800px] mx-auto px-8 md:px-16 py-6 md:py-8">
        {/* LOGO */}
        <div className="flex flex-col cursor-pointer relative z-50" onClick={() => handleScrollTo('#top')}>
          <h1 className="text-sm md:text-base font-bold leading-none tracking-wide text-white">
            STYLIST
            <br />
            STUDIO
          </h1>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleScrollTo(item.id)}
              className="text-xs font-medium tracking-widest text-white hover:text-brand-purple hover:opacity-100 opacity-80 transition-all duration-300"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <div
          className="md:hidden text-white cursor-pointer relative z-50 p-2 -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300">
            {menuOpen ? 'Close' : 'Menu'}
          </span>
        </div>
      </div>
    </header>

    {/* MOBILE MENU DRAWER */}
    <AnimatePresence>
      {menuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />

          {/* Slide-in Panel (Right 50%) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-1/2 bg-[#0a0a0a] border-l border-white/10 z-40 md:hidden flex flex-col pt-32"
          >
            <nav className="flex flex-col gap-8 px-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                  onClick={() => handleScrollTo(item.id)}
                  className="text-left text-xs font-medium tracking-[0.25em] text-white/80 hover:text-white transition-colors uppercase"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>
);
};

export default Header;