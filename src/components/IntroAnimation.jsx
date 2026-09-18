import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroAnimation = ({ onComplete }) => {
  const [loaded, setLoaded] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const audioRef = useRef(null);

  const totalFrames = 1805; // Exact count of frames provided
  const fps = 30; // 30 frames per second
  const frameInterval = 1000 / fps;

  useEffect(() => {
    // Preload audio
    const audio = new Audio('/assets/intro_audio.mp3');
    audio.load();
    audioRef.current = audio;

    let loadedCount = 0;
    const initialToLoad = Math.min(30, totalFrames);

    // Preload initial buffer
    for (let i = 0; i < initialToLoad; i++) {
      const img = new Image();
      const frameNumber = (i + 1).toString().padStart(4, '0');
      img.src = `/assets/frames/frame_${frameNumber}.png`;
      
      const checkLoaded = () => {
        loadedCount++;
        if (loadedCount >= initialToLoad) {
          setLoaded(true);
        }
      };
      
      img.onload = checkLoaded;
      img.onerror = checkLoaded;
      framesRef.current[i] = img;
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let currentFrame = 0;
    let lastTime = 0;
    let animationFrameId;
    const bufferSize = 30; // How many frames to preload ahead

    const loadFrame = (index) => {
      if (index >= totalFrames) return;
      if (!framesRef.current[index]) {
        const img = new Image();
        const frameNumber = (index + 1).toString().padStart(4, '0');
        img.src = `/assets/frames/frame_${frameNumber}.png`;
        framesRef.current[index] = img;
      }
    };

    const drawFrame = (frameIndex) => {
      // Preload future frames
      loadFrame(frameIndex + bufferSize);
      
      // Cleanup old frames to free memory
      if (frameIndex > 10) {
        const oldIndex = frameIndex - 10;
        if (framesRef.current[oldIndex]) {
           framesRef.current[oldIndex].src = ""; // Cancel any ongoing load
           framesRef.current[oldIndex] = null; // Mark for garbage collection
        }
      }

      const img = framesRef.current[frameIndex];
      // Check if image actually loaded successfully
      if (!img || !img.complete || img.width === 0) return;

      // Draw image covering the canvas (object-fit: cover equivalent)
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Set canvas dimensions to window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Draw first frame immediately
      drawFrame(currentFrame);
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animate = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;

      // Play audio on first frame
      if (currentFrame === 0 && audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(e => console.log("Audio autoplay blocked by browser:", e));
      }

      if (deltaTime >= frameInterval) {
        drawFrame(currentFrame);
        currentFrame++;
        lastTime = timestamp - (deltaTime % frameInterval);
      }

      if (currentFrame < totalFrames) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Animation finished, trigger exit sequence
        setTimeout(() => {
          setAnimationFinished(true);
          // Fade out audio
          if (audioRef.current) {
            let fadeInterval = setInterval(() => {
              if (audioRef.current.volume > 0.1) {
                audioRef.current.volume -= 0.1;
              } else {
                audioRef.current.pause();
                clearInterval(fadeInterval);
              }
            }, 100);
          }
          // Allow exit animation to play before completely unmounting and calling onComplete
          setTimeout(() => {
            onComplete();
          }, 1200); // 1.2s matches Framer motion exit duration + slight buffer
        }, 400); // Slight pause on the last frame before exiting
      }
    };

    // Small delay before starting to ensure smooth first frame
    setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, 200);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [loaded, onComplete]);

  const handleSkip = () => {
    setAnimationFinished(true);
    if (audioRef.current) {
      let fadeInterval = setInterval(() => {
        if (audioRef.current.volume > 0.1) {
          audioRef.current.volume -= 0.1;
        } else {
          audioRef.current.pause();
          clearInterval(fadeInterval);
        }
      }, 50);
    }
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
            scale: 1.1, // Premium zoom out effect on exit
            filter: 'blur(10px)'
          }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999, // Ensure it's above everything
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Loading indicator that fades out once frames are loaded */}
          <AnimatePresence>
            {!loaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ 
                  color: '#fff', 
                  fontSize: '0.85rem', 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase',
                  position: 'absolute'
                }}
              >
                Loading Experience...
              </motion.div>
            )}
          </AnimatePresence>
          
          <canvas 
            ref={canvasRef} 
            style={{ 
              opacity: loaded ? 1 : 0, 
              transition: 'opacity 0.8s ease-in-out',
              width: '100%',
              height: '100%',
              display: 'block'
            }} 
          />
          
          {loaded && (
            <button
              onClick={handleSkip}
              style={{
                position: 'absolute',
                bottom: '30px',
                right: '30px',
                color: 'rgba(255,255,255,0.4)',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                cursor: 'pointer',
                zIndex: 10,
                textTransform: 'uppercase',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'rgba(255,255,255,0.9)';
                e.target.style.borderColor = 'rgba(255,255,255,0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255,255,255,0.4)';
                e.target.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
            >
              Skip Intro
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
