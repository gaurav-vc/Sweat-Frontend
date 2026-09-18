import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Transformations from './pages/Transformations';
import SweatOnline from './pages/SweatOnline';
import SweatPilates from './pages/SweatPilates';
import SweatBootcamp from './pages/SweatBootcamp';
import Placeholder from './pages/Placeholder';
import './index.css';

const fadeUpParams = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#ebe8e2', color: 'var(--color-text-dark)', padding: '100px 0 50px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.h2 {...fadeUpParams} style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '1.5rem', fontWeight: 400, fontFamily: 'Georgia, serif', color: 'var(--color-text-dark)' }}>
          EXPERIENCE IT<br/>FOR YOURSELF.
        </motion.h2>
        <motion.p {...fadeUpParams} style={{ color: 'rgba(0,0,0,0.6)', marginBottom: '3rem', fontSize: '1.1rem', textAlign: 'center' }}>
          Private visits are available by appointment.
        </motion.p>
        <motion.a 
          href="/#approach" 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          className="btn" 
          style={{ 
            display: 'inline-block', 
            marginBottom: '6rem', 
            padding: '15px 30px', 
            fontSize: '0.85rem', 
            textDecoration: 'none',
            backgroundColor: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: '2px'
          }}
        >
          REQUEST A PRIVATE VISIT →
        </motion.a>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.5, fontWeight: 500, color: 'var(--color-text-dark)' }}>
          <span>MUMBAI</span>
          <span>|</span>
          <span>BY APPOINTMENT</span>
        </div>
      </div>
    </footer>
  );
};

import Login from './pages/Login';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

  // Component to handle scrolling to hash in URL
  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }, [location.hash, location.pathname]);

  return (
    <div className="app flex flex-col min-h-screen">
      {!isAdminRoute && <Navigation />}
      <div className="flex-grow">
        {children}
      </div>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import IntroAnimation from './components/IntroAnimation';

export default function App() {
  const [showIntro, setShowIntro] = React.useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
              </Routes>
            </ProtectedRoute>
          } />
          
          {/* Sweat Pilates Routes */}
          <Route path="/pilates" element={<SweatPilates />} />
          <Route path="/pilates/classes" element={<Placeholder />} />
          <Route path="/pilates/schedule" element={<Placeholder />} />
          <Route path="/pilates/instructors" element={<Placeholder />} />
          
          {/* Sweat Bootcamp Routes */}
          <Route path="/bootcamp" element={<SweatBootcamp />} />
          <Route path="/bootcamp/programs" element={<Placeholder />} />
          <Route path="/bootcamp/results" element={<Placeholder />} />
          
          {/* Sweat Online Routes */}
          <Route path="/online" element={<SweatOnline />} />
          <Route path="/online/app" element={<Placeholder />} />
          <Route path="/online/live" element={<Placeholder />} />
          
          {/* Shop Routes */}
          <Route path="/shop" element={<Placeholder />} />
          <Route path="/shop/apparel" element={<Placeholder />} />
          <Route path="/shop/equipment" element={<Placeholder />} />
          
          {/* More Routes */}
          <Route path="/more" element={<Placeholder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/transformations" element={<Transformations />} />
          <Route path="/careers" element={<Placeholder />} />
          
          {/* Fallback */}
          <Route path="*" element={<Placeholder />} />
        </Routes>
      </Layout>
    </Router>
    </>
  );
}
