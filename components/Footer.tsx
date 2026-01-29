import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black border-t border-white/10">
      <div className="max-w-[1800px] mx-auto px-8 md:px-16 py-10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        
        {/* Left: Copyright & Policy */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xs text-gray-500 tracking-wide font-light order-2 md:order-1">
           <span>© 2024 STYLIST STUDIO</span>
           <div className="flex gap-6">
             <span className="hover:text-white cursor-pointer transition-colors duration-300">Privacy Policy</span>
             <span className="hover:text-white cursor-pointer transition-colors duration-300">Terms</span>
           </div>
        </div>

        {/* Right: Channels & Info Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-xs font-medium tracking-[0.15em] uppercase text-gray-400 order-1 md:order-2">
            <a href="#" className="hover:text-white hover:text-brand-purple transition-colors duration-300">Instagram</a>
            <a href="#" className="hover:text-white hover:text-brand-purple transition-colors duration-300">LinkedIn</a>
            <a href="#" className="hover:text-white hover:text-brand-purple transition-colors duration-300">Twitter</a>
            
            {/* Visual Separator for Desktop */}
            <span className="w-px h-3 bg-white/20 hidden md:block mx-2" />
            
            <a href="#" className="hover:text-white transition-colors duration-300">Press</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Careers</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;