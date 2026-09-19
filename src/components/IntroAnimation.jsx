import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroAnimation = ({ onComplete }) => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Attempt to autoplay the video. If blocked by browser policies (because it has audio),
    // fallback to muted autoplay so the visual experience still works seamlessly.
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        console.log("Autoplay with audio blocked by browser. Falling back to muted autoplay.");
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(err => console.log("Autoplay fully blocked:", err));
        }
      });
    }
  }, []);

  const handleSkip = () => {
    setAnimationFinished(true);
    
    // Smoothly fade out audio if it was playing
    if (videoRef.current) {
      let fadeInterval = setInterval(() => {
        if (videoRef.current && videoRef.current.volume > 0.1) {
          videoRef.current.volume -= 0.1;
        } else {
          if (videoRef.current) videoRef.current.pause();
          clearInterval(fadeInterval);
        }
      }, 50);
    }
    
    // Update the URL hash. Our Layout component will detect this and smoothly 
    // scroll down to the #approach section perfectly.
    window.location.hash = 'approach';
    
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  const handleVideoEnd = () => {
    setAnimationFinished(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!animationFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05, // Premium subtle zoom out effect on exit
            filter: 'blur(8px)'
          }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999, // Ensure it's above everything
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          <video
            ref={videoRef}
            src="/assets/Final Sweat .mp4"
            playsInline
            onEnded={handleVideoEnd}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensures the video perfectly covers the screen without stretching
              display: 'block'
            }}
          />
          
          <button
            onClick={handleSkip}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'rgba(255,255,255,0.9)',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.4)',
              padding: '20px 40px',
              borderRadius: '2px',
              fontSize: '1.25rem',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              zIndex: 10,
              textTransform: 'uppercase',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#ffffff';
              e.target.style.borderColor = 'rgba(255,255,255,0.9)';
              e.target.style.transform = 'translate(-50%, -52%) scale(1.02)';
              e.target.style.textShadow = '0 4px 20px rgba(0,0,0,0.5)';
              e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255,255,255,0.9)';
              e.target.style.borderColor = 'rgba(255,255,255,0.4)';
              e.target.style.transform = 'translate(-50%, -50%) scale(1)';
              e.target.style.textShadow = 'none';
              e.target.style.boxShadow = 'none';
            }}
          >
            EXPERIENCE THE STUDIO <span style={{ fontFamily: 'sans-serif', fontSize: '1.2rem' }}>&rarr;</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
