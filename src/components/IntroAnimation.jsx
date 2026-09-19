import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroAnimation = ({ onComplete }) => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef(null);

  const handleAction = () => {
    if (!hasStarted) {
      // First tap: Start the video with sound!
      if (videoRef.current) {
        videoRef.current.currentTime = 0; // Restart video
        videoRef.current.muted = false; // Ensure unmuted
        videoRef.current.loop = false; // Let it play through and naturally trigger onEnded
        videoRef.current.play().then(() => {
          setHasStarted(true);
        }).catch(err => {
          console.error("Playback failed", err);
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
    if (hasStarted) { // Only trigger if they actually started the real experience
      setAnimationFinished(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
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
          {/* Responsive full-screen video with a beautiful poster image */}
          <video
            ref={videoRef}
            src="/assets/Final Sweat .mp4"
            poster="/assets/WhatsApp Image 2026-09-19 at 17.25.23.jpeg"
            playsInline
            onEnded={handleVideoEnd}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              opacity: !hasStarted ? 0.6 : 1, // Dim the background slightly before they start
              transition: 'opacity 1s ease-in-out'
            }}
          />
          
          <motion.button
            onClick={handleAction}
            // Add a beautiful pulsing animation to encourage clicks when not started
            animate={!hasStarted ? {
              scale: [1, 1.03, 1],
              boxShadow: [
                "0 0 0 rgba(255,255,255,0)",
                "0 0 20px rgba(255,255,255,0.15)",
                "0 0 0 rgba(255,255,255,0)"
              ]
            } : {
              scale: 1,
              boxShadow: "none"
            }}
            transition={!hasStarted ? {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
            style={{
              position: 'absolute',
              top: !hasStarted ? '65%' : 'auto',
              bottom: !hasStarted ? 'auto' : '8%',
              left: '50%',
              x: '-50%',
              y: !hasStarted ? '-50%' : '0%',
              color: 'rgba(255,255,255,0.9)',
              background: !hasStarted ? 'rgba(0,0,0,0.3)' : 'transparent',
              border: !hasStarted ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.2)',
              padding: !hasStarted ? '16px 32px' : '12px 24px',
              borderRadius: '2px',
              fontSize: !hasStarted ? 'clamp(1rem, 3vw, 1.25rem)' : '0.75rem',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              zIndex: 10,
              textTransform: 'uppercase',
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              whiteSpace: 'nowrap',
              backdropFilter: !hasStarted ? 'blur(4px)' : 'none',
            }}
            whileHover={{
              color: '#ffffff',
              borderColor: 'rgba(255,255,255,0.9)',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              backgroundColor: !hasStarted ? 'rgba(0,0,0,0.5)' : 'transparent'
            }}
          >
            EXPERIENCE THE STUDIO <span style={{ fontFamily: 'sans-serif', fontSize: '1.2rem' }}>&rarr;</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
