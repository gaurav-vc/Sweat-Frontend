import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchTransformations } from '../api/cms';
import { Play, X, Loader2 } from 'lucide-react';

export default function Transformations() {
  const [transformations, setTransformations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTransformations();
        setTransformations(data);
      } catch (err) {
        console.error("Failed to load transformations:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div style={{ backgroundColor: '#111', minHeight: '100vh', color: 'white', fontFamily: 'var(--font-sans)', paddingBottom: '100px' }}>
      
      {/* Header Section */}
      <section style={{ padding: '150px 20px 80px', textAlign: 'center', backgroundColor: '#000' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.2em', color: '#9ca3af', marginBottom: '1rem', textTransform: 'uppercase' }}>
            Real Results
          </p>
          <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '0.02em', lineHeight: 1.1 }}>
            TRANSFORMATIONS
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', color: '#d1d5db', lineHeight: 1.6 }}>
            Witness the journey. Discover how SWEAT FIT helps our members achieve their ultimate strength, mobility, and confidence goals.
          </p>
        </motion.div>
      </section>

      {/* Grid Section */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', marginTop: '40px' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0', color: '#9ca3af' }}>
            <Loader2 size={40} className="animate-spin" />
          </div>
        ) : transformations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: '#6b7280' }}>
            <p style={{ fontSize: '1.2rem' }}>No transformations available yet. Check back soon!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
            {transformations.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', backgroundColor: '#1a1a1a', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                onClick={() => setActiveVideo(item.video_upload)}
              >
                {/* Video Thumbnail / Preview */}
                <div style={{ position: 'relative', paddingTop: '133%' /* 3:4 aspect ratio for vertical video */ }}>
                  <video 
                    src={item.video_upload}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    muted
                    loop
                    playsInline
                    onMouseOver={e => e.target.play()}
                    onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }}
                  />
                  
                  {/* Overlay Gradient */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)' }}></div>
                  
                  {/* Play Button Icon */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.4)', transition: 'transform 0.3s' }} className="play-button-circle">
                      <Play size={28} color="white" fill="white" style={{ marginLeft: '4px' }} />
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '30px 24px' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{item.title}</h3>
                    {item.description && (
                      <p style={{ color: '#d1d5db', fontSize: '0.95rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
            onClick={() => setActiveVideo(null)}
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: '500px', maxHeight: '90vh', display: 'flex', justifyContent: 'center' }} onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setActiveVideo(null)}
                style={{ position: 'absolute', top: '-50px', right: '0', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                className="hover:bg-white/20"
              >
                <X size={24} />
              </button>
              
              <video 
                src={activeVideo} 
                controls 
                autoPlay 
                style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 1)' }} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
