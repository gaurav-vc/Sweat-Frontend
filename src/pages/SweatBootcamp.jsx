import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchSiteContent } from '../api/cms';
import { MediaRenderer } from '../components/ui/MediaRenderer';

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
  transition: { staggerChildren: 0.15 }
};

const defaultImages = {
  hero: "/assets/bootcamp_hero_new_1789708400551.jpg",
  foundation: "/assets/bootcamp_foundation_new_1789708563613.jpg",
  dtp: "/assets/bootcamp_dtp_new_1789708589198.jpg",
  athletic: "/assets/bootcamp_athletic_new_1789708576347.jpg",
  ecosystem: "/assets/bootcamp_ecosystem_new_1789708616814.jpg",
  coaching: "/assets/bootcamp_coaching_new_1789708601068.jpg"
};

const tenAspects = [
  { name: 'Cardiovascular Endurance', desc: 'Ability to sustain activity efficiently over time.' },
  { name: 'Muscular Strength', desc: 'Ability of muscles to produce force.' },
  { name: 'Muscular Endurance', desc: 'Ability of muscles to sustain repeated or prolonged effort.' },
  { name: 'Flexibility', desc: 'Ability to move through an appropriate range of motion.' },
  { name: 'Power', desc: 'Ability to express force quickly.' },
  { name: 'Speed', desc: 'Ability to move quickly.' },
  { name: 'Coordination', desc: 'Ability to control different body parts together efficiently.' },
  { name: 'Agility', desc: 'Ability to change direction and movement efficiently.' },
  { name: 'Balance', desc: 'Ability to maintain control and stability.' },
  { name: 'Accuracy', desc: 'Ability to control movement with precision and purpose.' }
];

const SweatBootcamp = () => {
  const [cmsMap, setCmsMap] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadContent = async () => {
      try {
        const data = await fetchSiteContent();
        const map = {};
        data.forEach(item => {
          map[item.key] = item;
        });
        setCmsMap(map);
      } catch (err) {
        console.error('Failed to load CMS content for Bootcamp', err);
      }
    };
    loadContent();
  }, []);

  const getText = (key, fallback) => {
    return cmsMap[key]?.value || fallback;
  };

  const getMedia = (key, fallback) => {
    return cmsMap[key]?.file_upload || fallback;
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg-light)', minHeight: '100vh', width: '100%' }}>
      {/* 1. Hero Section */}
      <section id="bootcamp_hero" style={{ position: 'relative', height: '90vh', minHeight: '700px', width: '100%', overflow: 'hidden', backgroundColor: '#000' }}>
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <MediaRenderer 
            src={getMedia('bootcamp_hero_media', defaultImages.hero)} 
            alt="Sweat Bootcamp" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} 
          />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)' }} />
        
        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '6rem' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ maxWidth: '900px', color: '#fff' }}
          >
            <p className="text-xs tracking-wider uppercase font-medium" style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
              {getText('bootcamp_hero_subtitle', 'COMPLETE PHYSICAL FITNESS PROFILE')}
            </p>
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.1, marginBottom: '2rem' }}>
              {getText('bootcamp_hero_title', 'Sweat Bootcamp')}
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6, maxWidth: '650px', marginBottom: '1rem', textAlign: 'justify' }}>
              A deeper, more comprehensive fitness system built around developing the complete physical fitness profile—not simply completing workouts.
            </p>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6, maxWidth: '650px', textAlign: 'justify' }}>
              The major objective is to make people feel fit, energetic, capable and functionally fit while supporting long-term physical performance and healthy aging.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. The 10 Aspects of Fitness */}
      <section id="bootcamp_aspects" className="section-padding">
        <div className="container" style={{ maxWidth: '1400px' }}>
          <motion.div {...fadeUpParams} style={{ marginBottom: '4rem', maxWidth: '800px' }}>
            <p className="text-xs tracking-wider uppercase font-medium" style={{ color: 'var(--color-text-dark)', marginBottom: '1rem' }}>
              BEYOND ISOLATED METRICS
            </p>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.1, color: 'var(--color-text-dark)', marginBottom: '1.5rem' }}>
              {getText('bootcamp_aspects_title', 'The Ten Aspects of Fitness')}
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-dark)', opacity: 0.8, lineHeight: 1.6, maxWidth: '700px', textAlign: 'justify' }}>
              {getText('bootcamp_aspects_desc', 'Sweat Bootcamp uses a broad definition of fitness. Every program works toward developing these ten core aspects of human physical capability.')}
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1.5rem' 
            }}
          >
            {tenAspects.map((aspect, index) => (
              <motion.div 
                key={index}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
                }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                style={{ 
                  padding: '2rem', 
                  backgroundColor: '#fff', 
                  borderRadius: '4px',
                  border: '1px solid rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-dark)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {aspect.name}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dark)', opacity: 0.7, lineHeight: 1.6, textAlign: 'justify' }}>
                  {aspect.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3 & 4. The Three Core Programs */}
      <section className="section-padding" style={{ backgroundColor: '#f9f8f6' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <motion.div {...fadeUpParams} style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.1, color: 'var(--color-text-dark)', marginBottom: '1.5rem' }}>
              The Three Sweat Bootcamp Programs
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-dark)', opacity: 0.8, lineHeight: 1.6, maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              Built primarily around Olympic weightlifting and gymnastics, supported by conditioning work and selected isolation movements. Progression is earned through capability.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
          >
            {/* Foundation */}
            <motion.div 
              id="bootcamp_foundation"
              variants={{ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              whileHover={{ y: -10 }}
              style={{ backgroundColor: '#fff', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: '300px', overflow: 'hidden' }}>
                <MediaRenderer src={getMedia('bootcamp_foundation_media', defaultImages.foundation)} alt="Sweat Foundation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '2.5rem 2rem', flex: 1 }}>
                <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: '#eee', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '1rem', borderRadius: '2px' }}>BEGINNER / ENTRY</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 400, fontFamily: 'Georgia, serif', color: 'var(--color-text-dark)', marginBottom: '1rem' }}>
                  {getText('bootcamp_foundation_title', 'Sweat Foundation')}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-dark)', opacity: 0.8, lineHeight: 1.6, textAlign: 'justify' }}>
                  {getText('bootcamp_foundation_desc', 'The entry and development program designed to build the basics that allow a person to train better. Learn fundamental movement patterns, lifting mechanics, and how the body should create force and power.')}
                </p>
              </div>
            </motion.div>

            {/* Athletic */}
            <motion.div 
              id="bootcamp_athletic"
              variants={{ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              whileHover={{ y: -10 }}
              style={{ backgroundColor: '#fff', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: '300px', overflow: 'hidden' }}>
                <MediaRenderer src={getMedia('bootcamp_athletic_media', defaultImages.athletic)} alt="Sweat Athletic" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '2.5rem 2rem', flex: 1 }}>
                <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: '#eee', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '1rem', borderRadius: '2px' }}>FUNCTIONAL FITNESS</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 400, fontFamily: 'Georgia, serif', color: 'var(--color-text-dark)', marginBottom: '1rem' }}>
                  {getText('bootcamp_athletic_title', 'Sweat Athletic')}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-dark)', opacity: 0.8, lineHeight: 1.6, textAlign: 'justify' }}>
                  {getText('bootcamp_athletic_desc', 'Develops functional fitness by combining conditioning equipment (AirBike, curved treadmill, TRX) with multi-planar movement (Sagittal, Frontal, Transverse) to make the body adaptable and capable.')}
                </p>
              </div>
            </motion.div>

            {/* DTP */}
            <motion.div 
              id="bootcamp_dtp"
              variants={{ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              whileHover={{ y: -10 }}
              style={{ backgroundColor: '#000', color: '#fff', borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: '300px', overflow: 'hidden' }}>
                <MediaRenderer src={getMedia('bootcamp_dtp_media', defaultImages.dtp)} alt="Sweat DTP" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
              </div>
              <div style={{ padding: '2.5rem 2rem', flex: 1 }}>
                <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: '#333', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '1rem', borderRadius: '2px', color: '#fff' }}>TRANSFORMATION</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 400, fontFamily: 'Georgia, serif', marginBottom: '1rem' }}>
                  {getText('bootcamp_dtp_title', 'Sweat DTP')}
                </h3>
                <p style={{ fontSize: '0.95rem', opacity: 0.8, lineHeight: 1.6, textAlign: 'justify' }}>
                  {getText('bootcamp_dtp_desc', 'The Drastic Transformation Program is a high-intensity 120-minute session for suitably conditioned members. Combines strength, conditioning, and full-body elements to support a leaner waistline and a highly conditioned physique.')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5 & 6 & 7. The Journey & Ecosystem */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '1400px' }}>
          
          {/* Coaching Model Split */}
          <div id="bootcamp_coaching" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', marginBottom: '8rem' }}>
            <motion.div {...fadeUpParams} style={{ flex: '1 1 280px' }}>
              <div style={{ width: '100%', height: '500px', overflow: 'hidden', borderRadius: '4px' }}>
                <MediaRenderer src={getMedia('bootcamp_coaching_media', defaultImages.coaching)} alt="Coaching Model" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </motion.div>
            <motion.div {...fadeUpParams} style={{ flex: '1 1 280px' }}>
              <p className="text-xs tracking-wider uppercase font-medium" style={{ color: 'var(--color-text-dark)', marginBottom: '1rem' }}>
                THE COACHING MODEL
              </p>
              <h2 style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.2, color: 'var(--color-text-dark)', marginBottom: '1.5rem' }}>
                {getText('bootcamp_coaching_title', 'Command & Correction')}
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-text-dark)', opacity: 0.8, lineHeight: 1.6, textAlign: 'justify', marginBottom: '1.5rem' }}>
                {getText('bootcamp_coaching_desc', 'Sweat Bootcamp classes feature a two-trainer system to ensure you receive both structure and personal correction.')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ borderLeft: '2px solid #000', paddingLeft: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>The Teaching Trainer</h4>
                  <p style={{ fontSize: '0.95rem', opacity: 0.8, lineHeight: 1.6, textAlign: 'justify' }}>In command of the class, providing the instructions, demonstrations, timing and cues.</p>
                </div>
                <div style={{ borderLeft: '2px solid #000', paddingLeft: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>The Assistant Trainer</h4>
                  <p style={{ fontSize: '0.95rem', opacity: 0.8, lineHeight: 1.6, textAlign: 'justify' }}>Continuously walks the floor, observes members individually, and corrects movement patterns and positioning.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Ecosystem Split */}
          <div id="bootcamp_ecosystem" style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '4rem', alignItems: 'center', marginBottom: '8rem' }}>
            <motion.div {...fadeUpParams} style={{ flex: '1 1 280px' }}>
              <h2 style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.2, color: 'var(--color-text-dark)', marginBottom: '1.5rem' }}>
                {getText('bootcamp_ecosystem_title', 'Training + Nutrition + Recovery')}
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-text-dark)', opacity: 0.8, lineHeight: 1.6, textAlign: 'justify', marginBottom: '1.5rem' }}>
                {getText('bootcamp_ecosystem_desc', 'Sweat believes the outcome of hard training is strongly influenced by what happens outside the workout. We present them as connected components of one results system.')}
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', padding: 0 }}>
                <li style={{ fontSize: '1rem', opacity: 0.9 }}><strong>1. Training</strong> provides the stimulus.</li>
                <li style={{ fontSize: '1rem', opacity: 0.9 }}><strong>2. Nutrition</strong> provides the fuel and building blocks required to support performance.</li>
                <li style={{ fontSize: '1rem', opacity: 0.9 }}><strong>3. Recovery</strong> allows the body to adapt to the training stimulus.</li>
              </ul>
            </motion.div>
            <motion.div {...fadeUpParams} style={{ flex: '1 1 280px' }}>
              <div style={{ width: '100%', height: '400px', overflow: 'hidden', borderRadius: '4px' }}>
                <MediaRenderer src={getMedia('bootcamp_ecosystem_media', defaultImages.ecosystem)} alt="Recovery and Nutrition" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </motion.div>
          </div>

          {/* The Member Journey Pathway */}
          <motion.div {...fadeUpParams} style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            <p className="text-xs tracking-wider uppercase font-medium" style={{ color: 'var(--color-text-dark)', marginBottom: '1rem' }}>
              THE MEMBER JOURNEY
            </p>
            <h2 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-dark)', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
              <span>Assess</span> <span>&bull;</span> <span>Build Foundation</span> <span>&bull;</span> <span>Train</span> <span>&bull;</span> <span>Recover</span> <span>&bull;</span> <span>Reassess</span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-dark)', opacity: 0.8, lineHeight: 1.6, textAlign: 'justify', marginBottom: '2rem' }}>
              Sweat takes accountability for the programming, coaching, assessment and support system. The member is taught to take accountability for the consistency and actions required to achieve the outcome. 15-Day reassessments ensure progress is visible and the pathway is adjusted.
            </p>
            <div style={{ padding: '2rem', backgroundColor: '#f9f8f6', borderRadius: '4px', textAlign: 'left' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', fontFamily: 'Georgia, serif' }}>Recommended Frequency</h4>
              <p style={{ fontSize: '0.95rem', opacity: 0.8, lineHeight: 1.6, textAlign: 'justify' }}>
                <strong>Beginners:</strong> ~4 sessions/week (Foundation).<br/>
                <strong>Building Fitness:</strong> ~4 sessions/week (DTP + Athletic).<br/>
                <strong>Advanced:</strong> ~6 sessions/week (3 DTP + 2 Foundation + 1 Athletic).
              </p>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default SweatBootcamp;
