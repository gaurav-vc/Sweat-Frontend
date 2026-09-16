import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Demo from '../components/demo';
import { fetchSiteContent } from '../api/cms';

const fallbackImages = {
  hero: "/assets/hero_bg_new.png",
  approach: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000&auto=format&fit=crop",
  assessment: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop",
  journeyProfile: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop",
  trainingReformer: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000&auto=format&fit=crop",
  trainingStrength: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
  trainingPerformance: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop",
  coach: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop",
  progress1: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500&auto=format&fit=crop",
  progress2: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500&auto=format&fit=crop",
  progress3: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500&auto=format&fit=crop",
  progress4: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500&auto=format&fit=crop",
  longevity1: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop",
  longevity2: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000&auto=format&fit=crop"
};

const fadeUpParams = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.2 }
};

const HeroSection = ({ getText, getMedia }) => {
  return (
    <section style={{
      height: '100vh',
      width: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      color: 'var(--color-text-light)'
    }}>
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${getMedia('home_hero_image', fallbackImages.hero)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%)'
        }}></div>
      </motion.div>
      
      <div className="container" style={{ paddingTop: '100px' }}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          style={{ maxWidth: '700px' }}
        >
          <h1 style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', marginBottom: '1.5rem', fontWeight: 700, lineHeight: 1.1 }}>
            {getText('home_hero_title', 'TRAINING\nSHOULD NOT BE\nGUESSWORK.').split('\n').map((line, i) => (
              <React.Fragment key={i}>{line}<br/></React.Fragment>
            ))}
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9, maxWidth: '400px' }}>
            {getText('home_hero_subtitle', 'A considered approach to strength, movement and physical performance at SWEAT FIT.')}
          </p>
          <a href="#approach" className="btn btn-light" style={{ padding: '15px 30px', fontSize: '0.85rem' }}>EXPERIENCE THE STUDIO →</a>
        </motion.div>
      </div>
    </section>
  );
};

const ApproachSection = ({ getText, getMedia }) => {
  const mediaSrc = getMedia('home_approach_image', '/assets/default.mp4');
  const isVideo = mediaSrc.match(/\.(mp4|webm|ogg)$/i) || mediaSrc === '/assets/default.mp4';

  return (
    <section id="approach" style={{ position: 'relative', width: '100%', minHeight: '90vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Background Video/Image with Parallax effect */}
      <motion.div
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1.05 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -2 }}
      >
        {isVideo ? (
          <video 
            src={mediaSrc} 
            autoPlay 
            loop 
            muted 
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <img 
            src={mediaSrc} 
            alt="Approach Background" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </motion.div>
      
      {/* Gradient Overlay for Text Readability */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.6) 50%, rgba(17,17,17,0.2) 100%)', zIndex: -1 }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '4rem 0' }}>
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '650px', color: '#fff' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.4 }}
            style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '2rem', backdropFilter: 'blur(10px)' }}
          >
            <p className="text-xs tracking-wider uppercase" style={{ margin: 0, color: '#fff', fontWeight: 600, letterSpacing: '0.15em' }}>THE APPROACH</p>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 40, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.5, duration: 1, type: "spring" }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '2rem', fontWeight: 800, lineHeight: 1.05, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
          >
            {getText('home_approach_title', "WE DON'T START\nWITH A WORKOUT.\n\nWE START WITH YOU.").split('\n').map((line, i) => (
              <React.Fragment key={i}>
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.15), duration: 0.8 }}
                  style={{ display: 'inline-block' }}
                >
                  {line}
                </motion.span>
                <br/>
              </React.Fragment>
            ))}
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '60px' }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{ height: '4px', backgroundColor: '#fff', marginBottom: '2rem', borderRadius: '2px' }}
          />

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.25rem', lineHeight: 1.6, fontWeight: 400, maxWidth: '500px' }}
          >
            {getText('home_approach_text', "Every SWEAT FIT journey begins with understanding your body, your lifestyle, your goals and what you want to achieve.")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

const AssessmentSection = ({ getText, getMedia }) => {
  return (
    <section style={{ backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-light)' }}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', minHeight: '80vh' }}>
        
        <div style={{ flex: '1 1 50%', padding: '100px 5%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div {...fadeUpParams} style={{ maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
            <p className="text-xs tracking-wider uppercase" style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.6)' }}>01 &mdash; ASSESSMENT</p>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', fontWeight: 600 }}>
              {getText('home_assessment_title', "Know where\nyou're starting.").split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}<br/></React.Fragment>
              ))}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '3rem', fontSize: '1.1rem', maxWidth: '300px' }}>
              {getText('home_assessment_text', "Before we prescribe a programme, we understand your starting point.")}
            </p>
            
            <motion.ul 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-100px" }}
              style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}
            >
              {['Movement', 'Strength', 'Mobility', 'Body Composition', 'Lifestyle', 'Goals'].map((item) => (
                <motion.li 
                  key={item} 
                  variants={{ initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 } }}
                  style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            <div>
              <a href="#" className="link-arrow" style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>DISCOVER THE ASSESSMENT →</a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          style={{ flex: '1 1 50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
        >
           <motion.div
             animate={{ y: [0, -15, 0] }}
             transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
             style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
           >
             <img 
               src={getMedia('home_assessment_image', "/assets/assessment_final.png")} 
               alt="Body composition assessment" 
               style={{ 
                 width: '100%', 
                 height: 'auto', 
                 maxHeight: '600px',
                 objectFit: 'contain',
                 borderRadius: '12px',
                 boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
               }} 
             />
           </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

const JourneySection = ({ getText, getMedia }) => {
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div {...fadeUpParams} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          <div>
            <p className="text-xs tracking-wider uppercase" style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>02 &mdash; YOUR JOURNEY</p>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', fontWeight: 600 }}>
              {getText('home_journey_title', "SEE THE JOURNEY.\nNOT JUST THE\nDESTINATION.").split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}<br/></React.Fragment>
              ))}
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
              {getText('home_journey_text', "Your training is structured around where you are today and where you want to go with SWEAT FIT.")}
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-dark)', paddingBottom: '2rem', marginBottom: '2rem' }}
            >
              {[
                { title: 'TODAY', icon: '🏋️', label: 'Training' },
                { title: '90 DAYS', icon: '🥗', label: 'Nutrition' },
                { title: '180 DAYS', icon: '🧘', label: 'Recovery' },
                { title: '360 DAYS', icon: '📈', label: 'Consistency' }
              ].map(step => (
                <motion.div key={step.title} variants={{ initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 } }} className="text-center">
                  <p className="text-xs tracking-wider uppercase mb-2">{step.title}</p>
                  <div style={{ fontSize: '1.5rem' }}>{step.icon}</div>
                  <p className="text-xs mt-2 font-medium">{step.label}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <div style={{ display: 'flex', gap: '2rem' }}>
               <img src={getMedia('home_journey_image', fallbackImages.journeyProfile)} alt="Profile" style={{ width: '150px', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
               <motion.div 
                 variants={staggerContainer}
                 initial="initial"
                 whileInView="whileInView"
                 style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem', justifyContent: 'center' }}
               >
                  {['STRENGTH', 'MOBILITY', 'MOVEMENT', 'BODY COMPOSITION', 'RECOVERY', 'CONSISTENCY'].map((stat, i) => (
                    <motion.div 
                      key={stat} 
                      variants={{ initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 } }}
                      style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', letterSpacing: '0.1em' }}
                    >
                      <div style={{ width: '130px', fontWeight: 500 }}>{stat}</div>
                      <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0,0,0,0.1)', position: 'relative' }}>
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.random() * 50 + 40}%` }}
                          transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                          style={{ position: 'absolute', left: 0, top: 0, height: '1px', backgroundColor: 'var(--color-text-dark)' }}
                        >
                          <div style={{ position: 'absolute', right: 0, top: '-3px', width: '7px', height: '7px', backgroundColor: 'var(--color-text-dark)', borderRadius: '50%' }}></div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
               </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CoachSection = ({ getText, getMedia }) => {
  return (
    <section className="section-padding">
      <div className="container">
        <p className="text-xs tracking-wider uppercase" style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>04 &mdash; THE COACH</p>
        
        <motion.div {...fadeUpParams} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', fontWeight: 600 }}>
              {getText('home_coach_title', "TECHNOLOGY DOESN'T\nREPLACE THE COACH.").split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}<br/></React.Fragment>
              ))}
            </h2>
            <p className="text-sm tracking-wider uppercase font-medium" style={{ color: 'var(--color-text-muted)' }}>
              {getText('home_coach_subtitle', "IT MAKES THE COACH\nBETTER INFORMED.").split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}<br/></React.Fragment>
              ))}
            </p>
          </div>
          
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
            <img src={getMedia('home_coach_image', fallbackImages.coach)} alt="Coach advising client" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '4px' }} />
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', fontWeight: 500 }}
          >
            {['Assessment', '↓', 'Programme', '↓', 'Coaching', '↓', 'Measurement', '↓', 'Adaptation'].map((text, i) => (
              <motion.div key={i} variants={{ initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 } }} style={{ color: text === '↓' ? 'var(--color-text-muted)' : 'inherit' }}>
                {text}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ProgressSection = ({ getText, getMedia }) => {
  return (
    <section id="progress" style={{ backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-light)', padding: '100px 0' }}>
      <div className="container">
        <p className="text-xs tracking-wider uppercase" style={{ marginBottom: '4rem', color: 'rgba(255,255,255,0.6)' }}>05 &mdash; PROGRESS</p>
        
        <motion.div {...fadeUpParams} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            style={{ display: 'flex', gap: '1rem' }}
          >
            {[fallbackImages.progress1, fallbackImages.progress2, fallbackImages.progress3, fallbackImages.progress4].map((fallbackImg, i) => (
              <motion.div key={i} variants={{ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } }} style={{ flex: 1 }}>
                <img src={getMedia(`home_progress_image_${i+1}`, fallbackImg)} alt={`Progress Day ${i * 30 || 1}`} style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '2px' }} />
                <p className="text-xs text-center mt-3 tracking-wider" style={{ color: 'rgba(255,255,255,0.6)' }}>DAY {i === 0 ? '01' : i * 30}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <div>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>
              {getText('home_progress_title', "PROGRESS\nDESERVES\nEVIDENCE.").split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}<br/></React.Fragment>
              ))}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', maxWidth: '300px', fontSize: '1.1rem' }}>
              {getText('home_progress_text', "Your journey is documented, measured and reviewed — so your training evolves as you do at SWEAT FIT.")}
            </p>
            <a href="#" className="link-arrow btn-light" style={{ padding: 0, border: 'none', borderBottom: '1px solid currentColor', fontSize: '0.85rem' }}>SEE THE APP →</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const LongevitySection = ({ getText, getMedia }) => {
  return (
    <section className="section-padding">
      <div className="container">
        <p className="text-xs tracking-wider uppercase" style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>06 &mdash; LONGEVITY</p>
        
        <motion.div {...fadeUpParams} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', fontWeight: 600 }}>
              {getText('home_longevity_title', "YOUR STRONGEST YEARS\nSHOULDN'T BE BEHIND YOU.").split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}<br/></React.Fragment>
              ))}
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
              {getText('home_longevity_text', "Strength, mobility, balance and confidence become even more important as we age. We adapt training to the person — not the other way around.")}
            </p>
            <a href="#" className="link-arrow" style={{ fontSize: '0.85rem' }}>EXPLORE LONGEVITY →</a>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <motion.img whileHover={{ scale: 1.03 }} src={getMedia('home_longevity_image_1', fallbackImages.longevity1)} alt="Training" style={{ width: '50%', height: '300px', objectFit: 'cover', borderRadius: '4px' }} />
            <motion.img whileHover={{ scale: 1.03 }} src={getMedia('home_longevity_image_2', fallbackImages.longevity2)} alt="Studio space" style={{ width: '50%', height: '300px', objectFit: 'cover', borderRadius: '4px' }} />
          </div>
        </motion.div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
           <motion.div {...fadeUpParams} style={{ maxWidth: '400px' }}>
             <p className="text-xs tracking-wider uppercase mb-4 font-semibold" style={{ color: 'var(--color-text-dark)' }}>A SPACE DESIGNED<br/>FOR FOCUS. MOVEMENT<br/>AND PROGRESS.</p>
             <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', letterSpacing: '0.1em', fontWeight: 500 }}>
               <li><a href="#" className="hover:opacity-60 transition-opacity">REFORMER</a></li>
               <li><a href="#" className="hover:opacity-60 transition-opacity">STRENGTH</a></li>
               <li><a href="#" className="hover:opacity-60 transition-opacity">MOVEMENT</a></li>
               <li><a href="#" className="hover:opacity-60 transition-opacity">COACHING</a></li>
             </ul>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [cmsMap, setCmsMap] = useState({});

  useEffect(() => {
    const loadCMSData = async () => {
      try {
        const content = await fetchSiteContent();
        // Convert array of {key, value, file_upload} into a map
        const map = {};
        content.forEach(item => {
          map[item.key] = item;
        });
        setCmsMap(map);
      } catch (err) {
        console.error("Failed to load CMS data on Home:", err);
      }
    };
    loadCMSData();
  }, []);

  const getText = (key, fallback) => {
    const item = cmsMap[key];
    if (item && item.value) return item.value;
    return fallback;
  };

  const getMedia = (key, fallback) => {
    const item = cmsMap[key];
    if (!item) return fallback;
    if (item.file_upload) return item.file_upload; // The backend returns the full URL (e.g. /media/cms_uploads/...)
    if (item.value && (item.value.startsWith('http') || item.value.startsWith('/'))) return item.value;
    return fallback;
  };

  return (
    <main>
      <HeroSection getText={getText} getMedia={getMedia} />
      <ApproachSection getText={getText} getMedia={getMedia} />
      <AssessmentSection getText={getText} getMedia={getMedia} />
      <JourneySection getText={getText} getMedia={getMedia} />
      <Demo />
      <CoachSection getText={getText} getMedia={getMedia} />
      <ProgressSection getText={getText} getMedia={getMedia} />
      <LongevitySection getText={getText} getMedia={getMedia} />
    </main>
  );
}
