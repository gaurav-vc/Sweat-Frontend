import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Transformations from './pages/Transformations';
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
    <footer style={{ backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-light)', padding: '100px 0 50px', textAlign: 'center' }}>
      <div className="container">
        <motion.h2 {...fadeUpParams} style={{ fontSize: '4rem', marginBottom: '1.5rem', fontWeight: 600 }}>SWEAT FIT<br/>EXPERIENCE IT.</motion.h2>
        <motion.p {...fadeUpParams} style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '3rem', fontSize: '1.1rem' }}>Private visits are available by appointment.</motion.p>
        <motion.a href="/#approach" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-light" style={{ display: 'inline-block', marginBottom: '6rem', padding: '15px 30px', fontSize: '0.85rem', textDecoration: 'none' }}>EXPERIENCE THE STUDIO →</motion.a>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.5, fontWeight: 500 }}>
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

export default function App() {
  return (
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
          <Route path="/pilates" element={<Placeholder />} />
          <Route path="/pilates/classes" element={<Placeholder />} />
          <Route path="/pilates/schedule" element={<Placeholder />} />
          <Route path="/pilates/instructors" element={<Placeholder />} />
          
          {/* Sweat Bootcamp Routes */}
          <Route path="/bootcamp" element={<Placeholder />} />
          <Route path="/bootcamp/programs" element={<Placeholder />} />
          <Route path="/bootcamp/results" element={<Placeholder />} />
          
          {/* Sweat Online Routes */}
          <Route path="/online" element={<Placeholder />} />
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
  );
}
