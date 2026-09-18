import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ImageStreamHero } from '../components/ui/image-stream-hero';
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
  whileInView: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const defaultImages = {
  hero: "/assets/sweat_online_hero_1789637276754.jpg",
  problem: "/assets/sweat_online_consultation_1789637304099.jpg",
  app: "/assets/sweat_online_app_1789637623650.jpg",
  coach: "/assets/sweat_online_coach_1789637636938.jpg",
  squat: "/assets/sweat_online_squat_1789637595594.jpg",
  reformer: "/assets/sweat_online_reformer_1789637610140.jpg"
};

const SweatOnline = () => {
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
        console.error('Failed to load CMS content for Online', err);
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
    <div className="sweat-online-page">
      
      {/* Hero Section */}
      <section id="online_hero" style={{ height: '90vh', position: 'relative', display: 'flex', alignItems: 'flex-end', paddingBottom: '10vh' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
          <MediaRenderer 
            src={getMedia('online_hero_media', defaultImages.hero)} 
            alt="Sweat Online Training" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)' }}></div>
        </div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1, color: 'white' }}>
          <motion.div {...fadeUpParams} style={{ maxWidth: '800px' }}>
            <p className="text-xs tracking-wider uppercase font-medium" style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.7)' }}>
              {getText('online_hero_subtitle', 'SWEAT ONLINE TRAINING')}
            </p>
            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '1.5rem', fontWeight: 400, lineHeight: 1.1, fontFamily: 'Georgia, serif' }} dangerouslySetInnerHTML={{ __html: getText('online_hero_title', 'THE ONLINE<br/>TRAINING PHILOSOPHY.') }} />
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.9, maxWidth: '600px', textAlign: 'justify' }}>
              Sweat firmly believes that access to transformation should not depend on where a person lives, what equipment they have or whether they can walk into a premium fitness facility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem & Promise */}
      <section id="online_problem" className="section-padding" style={{ backgroundColor: '#f9f8f6' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <motion.div {...fadeUpParams} style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
            
            <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: '450px', height: '600px', overflow: 'hidden', borderRadius: '4px' }}>
                <MediaRenderer src={getMedia('online_problem_media', defaultImages.problem)} alt="Consultation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
            
            <div style={{ flex: '1 1 500px', maxWidth: '600px' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', marginBottom: '1.5rem', fontWeight: 400, lineHeight: 1.1, fontFamily: 'Georgia, serif', color: 'var(--color-text-dark)' }} dangerouslySetInnerHTML={{ __html: getText('online_problem_title', 'KNOWLEDGE ALONE DOES NOT CREATE RESULTS.<br/>CONSISTENT EXECUTION DOES.') }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--color-text-dark)', opacity: 0.8, fontSize: '1rem', lineHeight: 1.6, textAlign: 'justify' }}>
                <p>
                  {getText('online_problem_desc', 'Most people already know the basic principles: eat appropriately, train consistently, stay active and sleep well. The real challenge for many people is not knowing what to do—it is building the discipline, structure and consistency to keep doing it.')}
                </p>
                <p>
                  People may know what healthy eating looks like but struggle with consistency. People may start strongly but lose momentum when life becomes busy.
                </p>
                <p>
                  <strong>Sweat's Promise:</strong> The Sweat team provides the program, structure, professional guidance, tracking and accountability. The member provides the commitment to execute the plan. Together, the objective is to create a system that makes progress visible.
                </p>
              </div>
            </div>
            
          </motion.div>
        </div>
      </section>

      {/* Programs for Different Objectives */}
      <section id="online_pathways" className="section-padding">
        <div className="container" style={{ maxWidth: '1600px' }}>
          <motion.div {...fadeUpParams} style={{ marginBottom: '4rem', maxWidth: '800px' }}>
            <p className="text-xs tracking-wider uppercase font-medium" style={{ color: 'var(--color-text-dark)', marginBottom: '1rem' }}>
              CUSTOMISED PATHWAYS
            </p>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.1, color: 'var(--color-text-dark)', marginBottom: '1.5rem' }}>
              {getText('online_pathways_title', 'Programs for Different Objectives')}
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-dark)', opacity: 0.8, lineHeight: 1.6, maxWidth: '600px', textAlign: 'justify' }}>
              {getText('online_pathways_desc', 'Sweat Online Training is designed to support different fitness goals rather than forcing every member into the same program.')}
            </p>
          </motion.div>
          
          <div style={{ position: 'relative', width: '100%', borderRadius: '4px', overflow: 'hidden' }}>
            <ImageStreamHero
              images={[
                { src: getMedia('online_pathways_media_1', defaultImages.squat), alt: 'General Fitness', title: 'GENERAL FITNESS' },
                { src: getMedia('online_pathways_media_2', defaultImages.reformer), alt: 'Flexibility', title: 'FLEXIBILITY' },
                { src: getMedia('online_pathways_media_3', defaultImages.squat), alt: 'Muscle Building', title: 'MUSCLE BUILDING' },
                { src: getMedia('online_pathways_media_4', defaultImages.coach), alt: 'Performance', title: 'PERFORMANCE' }
              ]}
              cards={8}
              speed={20}
              className="h-[600px] w-full"
            />
          </div>
        </div>
      </section>

      {/* The Accountability System Workflow */}
      <section id="online_process" className="section-padding" style={{ backgroundColor: '#f9f8f6' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <motion.div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.2 } },
                hidden: {}
              }}
              style={{ flex: '1 1 280px' }}
            >
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="text-xs tracking-wider uppercase font-medium" style={{ marginBottom: '1.5rem', color: 'var(--color-text-dark)' }}>
                THE PROCESS
              </motion.p>
              <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', marginBottom: '2rem', fontWeight: 400, lineHeight: 1.1, fontFamily: 'Georgia, serif', color: 'var(--color-text-dark)' }} dangerouslySetInnerHTML={{ __html: getText('online_process_title', 'THE SWEAT<br/>ACCOUNTABILITY<br/>SYSTEM.') }} />
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} style={{ fontSize: '1rem', color: 'var(--color-text-dark)', opacity: 0.8, marginBottom: '2.5rem', maxWidth: '400px', lineHeight: 1.6, textAlign: 'justify' }}>
                {getText('online_process_desc', 'Sweat creates the structure. The member follows the process. The app captures the data. The coaching team interprets the data. The program evolves as the member evolves.')}
              </motion.p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  'TRAINING CREATES STIMULUS',
                  'NUTRITION SUPPORTS RECOVERY',
                  'CONSISTENCY CONNECTS BOTH'
                ].map((text, i) => (
                  <motion.div 
                    key={i}
                    variants={{ 
                      hidden: { opacity: 0, x: -20 }, 
                      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } 
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                  >
                    <div style={{ width: '20px', height: '1px', backgroundColor: 'var(--color-text-dark)', opacity: 0.4 }} />
                    <p className="text-sm font-semibold tracking-wider" style={{ color: 'var(--color-text-dark)' }}>{text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } },
                hidden: {}
              }}
              style={{ flex: '2 1 280px' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {[
                  { step: '01', title: 'Assessment', desc: 'Assess body composition and relevant current fitness information to establish a starting point.' },
                  { step: '02', title: 'Consultation', desc: 'The Sweat team connects with the member to understand lifestyle, constraints, and discuss nutrition.' },
                  { step: '03', title: 'Personalised Program', desc: 'A structured program designed to be practical within the member\'s home environment and equipment.' },
                  { step: '04', title: 'Daily Accountability', desc: 'Members log workouts, meals, and steps. Tracking converts an invisible routine into measurable info.' },
                  { step: '05', title: 'Coaching & Feedback', desc: 'The Sweat team uses the data to clarify what is working and what the next action should be.' },
                  { step: '06', title: 'Periodic Assessment', desc: 'Fitness assessments are repeated to show evidence of progress and adjust the approach.' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    variants={{ 
                      hidden: { opacity: 0, y: 40, scale: 0.95 }, 
                      visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } } 
                    }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                      borderColor: 'rgba(0,0,0,0.1)'
                    }}
                    style={{ 
                      padding: '2rem', 
                      backgroundColor: '#fff', 
                      borderRadius: '8px', 
                      border: '1px solid rgba(0,0,0,0.04)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                    }}
                  >
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--color-text-dark)', opacity: 0.4, marginBottom: '0.75rem' }}>STEP {item.step}</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '0.75rem', fontFamily: 'Georgia, serif', color: 'var(--color-text-dark)' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dark)', opacity: 0.7, lineHeight: 1.6, textAlign: 'justify' }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
          </motion.div>
        </div>
      </section>

      {/* App Experience */}
      <section id="online_app" style={{ backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-light)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          
          <div style={{ flex: '1 1 280px', minHeight: '600px', padding: '100px 5vw' }}>
            <motion.div {...fadeUpParams} style={{ maxWidth: '500px', margin: '0 auto' }}>
              <p className="text-xs tracking-wider uppercase font-medium" style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.5)' }}>
                THE DIGITAL EXPERIENCE
              </p>
              <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', marginBottom: '2.5rem', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.1 }} dangerouslySetInnerHTML={{ __html: getText('online_app_title', 'A GLOBAL ONLINE<br/>FITNESS EXPERIENCE.') }} />
              
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', listStyle: 'none', padding: 0 }}>
                {[
                  "Personalised workout plan and daily visibility.",
                  "Workout logging, including exercises, repetitions.",
                  "Meal / nutrition logging and updates.",
                  "Daily steps and assigned activity tracking.",
                  "Backend visibility for the Sweat coaching team.",
                  "Periodic coach feedback and member communication.",
                  "Progress dashboard showing relevant assessment.",
                  "A simple interface that prioritises execution."
                ].map((feature, i) => (
                  <motion.li 
                    key={i}
                    variants={{ initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 } }}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', fontSize: '0.95rem', opacity: 0.8 }}
                  >
                    <span style={{ color: '#b49b81' }}>&rarr;</span> {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <div style={{ flex: '1 1 280px', minHeight: '600px' }}>
            <MediaRenderer src={getMedia('online_app_media', defaultImages.app)} alt="Sweat App Experience" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default SweatOnline;
