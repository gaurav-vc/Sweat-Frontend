import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ title, path, dropdownItems, scrolled, hasDarkHero }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/$/, "");
  const targetPath = path.replace(/\/$/, "");
  const isActive = currentPath === targetPath || currentPath.startsWith(targetPath + '/');

  let textColorStyle = {};
  if (!scrolled && hasDarkHero) {
    textColorStyle = { color: 'white', textShadow: '0 4px 6px -1px rgba(0,0,0,0.5)', opacity: isActive ? 1 : 0.9, fontWeight: isActive ? 'bold' : '600' };
  } else {
    textColorStyle = { color: isActive ? 'black' : '#374151', fontWeight: isActive ? 'bold' : '600' };
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link 
        to={path}
        className={`group relative flex items-center gap-1.5 px-2 py-2 text-[0.95rem] transition-colors`}
        style={textColorStyle}
      >
        <span>{title}</span>
        {dropdownItems && <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />}
        
        {/* Animated Underline */}
        <span className={`absolute left-2 right-2 -bottom-1 h-[1.5px] transition-all duration-300 ease-out origin-left scale-x-0 group-hover:scale-x-100 ${
          (!scrolled && hasDarkHero) ? 'bg-white' : 'bg-black'
        }`}></span>
      </Link>
      
      {dropdownItems && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-48 bg-white shadow-xl rounded-md overflow-hidden z-50"
            >
              <div className="py-2 flex flex-col">
                {dropdownItems.map((item, idx) => (
                  <Link 
                    key={idx} 
                    to={item.path}
                    className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-black transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/$/, "") || "/";
  const hasDarkHero = currentPath === '/' || currentPath === '/about';

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] px-8 h-24 flex items-center transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex justify-between items-center w-full">
        {/* Logo */}
        <Link to="/" className="group flex flex-col items-start relative flex-shrink-0">
          <img 
            src="/assets/logo.png" 
            alt="SWEAT Logo" 
            className="h-8 w-auto transition-transform duration-500 ease-out group-hover:scale-105"
            style={{ 
              filter: (!scrolled && hasDarkHero) ? 'invert(1) brightness(2)' : 'none',
              objectFit: 'contain'
            }}
          />
        </Link>
        
        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 font-sans ml-auto mr-8">
          <NavItem title="Home" path="/" scrolled={scrolled} hasDarkHero={hasDarkHero} />
          <NavItem title="About Us" path="/about" scrolled={scrolled} hasDarkHero={hasDarkHero} />
          <NavItem 
            title="Sweat Pilates" 
            path="/pilates" 
            scrolled={scrolled}
            hasDarkHero={hasDarkHero}
            dropdownItems={[
              { label: 'Classes', path: '/pilates/classes' },
              { label: 'Schedule', path: '/pilates/schedule' },
              { label: 'Instructors', path: '/pilates/instructors' }
            ]} 
          />
          <NavItem 
            title="Sweat Bootcamp" 
            path="/bootcamp" 
            scrolled={scrolled}
            hasDarkHero={hasDarkHero}
            dropdownItems={[
              { label: 'Programs', path: '/bootcamp/programs' },
              { label: 'Results', path: '/bootcamp/results' }
            ]} 
          />
          <NavItem 
            title="Sweat Online" 
            path="/online" 
            scrolled={scrolled}
            hasDarkHero={hasDarkHero}
            dropdownItems={[
              { label: 'App', path: '/online/app' },
              { label: 'Live Sessions', path: '/online/live' }
            ]} 
          />
          <NavItem 
            title="Shop" 
            path="/shop" 
            scrolled={scrolled}
            hasDarkHero={hasDarkHero}
            dropdownItems={[
              { label: 'Apparel', path: '/shop/apparel' },
              { label: 'Equipment', path: '/shop/equipment' }
            ]} 
          />
          <NavItem 
            title="More" 
            path="/more" 
            scrolled={scrolled}
            hasDarkHero={hasDarkHero}
            dropdownItems={[
              { label: 'Transformations', path: '/transformations' },
              { label: 'Contact', path: '/contact' },
              { label: 'Careers', path: '/careers' },
              { label: 'FAQ', path: '/faq' }
            ]} 
          />
        </div>

        {/* Action Icons (Login) */}
        <div className="hidden md:flex items-center">
          <Link to="/login" title="Admin Control Panel">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={`p-2 rounded-full flex items-center justify-center ${
                (!scrolled && hasDarkHero) ? 'text-white hover:bg-white/20' : 'text-black hover:bg-black/10'
              }`}
              style={{ transition: 'background-color 0.3s ease, color 0.3s ease' }}
            >
              <Settings size={22} />
            </motion.div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className={`p-2 ${(!scrolled && hasDarkHero) ? 'text-white' : 'text-black'}`}>
            <div className="w-6 h-0.5 bg-current mb-1.5"></div>
            <div className="w-6 h-0.5 bg-current mb-1.5"></div>
            <div className="w-6 h-0.5 bg-current"></div>
          </button>
        </div>
      </div>
    </nav>
  );
}
