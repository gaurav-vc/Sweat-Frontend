import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroAnimation = ({ onComplete }) => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef(null);

  const handleAction = () => {
    if (!hasStarted) {
      // First tap: Start the video with sound
      if (videoRef.current) {
        videoRef.current.muted = false; // Ensure unmuted
        videoRef.current.play().then(() => {
          setHasStarted(true);
        }).catch(err => {
          console.error("Playback failed", err);
          // Fallback if browser entirely blocks it
          setHasStarted(true); 
        });
      }
    } else {
      // Second tap: Skip the video
      setAnimationFinished(true);
      
      // Smoothly fade out audio
      if (videoRef.current && !videoRef.current.muted) {
        let fadeInterval = setInterval(() => {
          if (videoRef.current && videoRef.current.volume > 0.1) {
            videoRef.current.volume -= 0.1;
          } else {
            if (videoRef.current) videoRef.current.pause();
            clearInterval(fadeInterval);
          }
        }, 50);
      }
      
      // Navigate to the approach section smoothly
      window.location.hash = 'approach';
      
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
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
            scale: 1.05,
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
          {/* Responsive full-screen video */}
          <video
            ref={videoRef}
            src="/assets/Final Sweat .mp4"
            playsInline
            onEnded={handleVideoEnd}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensures the video scales properly on mobile and desktop without stretching
              display: 'block'
            }}
          />
          
          <button
            onClick={handleAction}
            style={{
              position: 'absolute',
              // Center it initially, then drop it to the bottom once playing so it doesn't block the video
              top: !hasStarted ? '50%' : 'auto',
              bottom: !hasStarted ? 'auto' : '8%',
              left: '50%',
              transform: !hasStarted ? 'translate(-50%, -50%)' : 'translate(-50%, 0)',
              color: 'rgba(255,255,255,0.9)',
              background: 'transparent',
              border: !hasStarted ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.2)',
              padding: !hasStarted ? '16px 32px' : '12px 24px',
              borderRadius: '2px',
              // Responsive font sizing using clamp
              fontSize: !hasStarted ? 'clamp(1rem, 3vw, 1.25rem)' : '0.75rem',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              zIndex: 10,
              textTransform: 'uppercase',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#ffffff';
              e.target.style.borderColor = 'rgba(255,255,255,0.9)';
              e.target.style.textShadow = '0 4px 20px rgba(0,0,0,0.5)';
              e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
              
              if (!hasStarted) {
                e.target.style.transform = 'translate(-50%, -52%) scale(1.02)';
              } else {
                e.target.style.transform = 'translate(-50%, -2px) scale(1.02)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255,255,255,0.9)';
              e.target.style.textShadow = 'none';
              e.target.style.boxShadow = 'none';
              
              if (!hasStarted) {
                e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                e.target.style.transform = 'translate(-50%, -50%) scale(1)';
              } else {
                e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'translate(-50%, 0) scale(1)';
              }
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
