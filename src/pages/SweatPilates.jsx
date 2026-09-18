import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchSiteContent } from '../api/cms';
import { MediaRenderer } from '../components/ui/MediaRenderer';

const fadeUpParams = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const defaultImages = {
  hero: "/assets/sweat_pilates_hero_1789638652882.jpg",
  stretch: "/assets/sweat_pilates_stretch_1789638666715.jpg",
  total: "/assets/sweat_pilates_total_1789638678713.jpg",
  athletic: "/assets/sweat_pilates_athletic_1789638693352.jpg",
  coaching: "/assets/sweat_pilates_coaching_1789638705450.jpg",
  journey: "/assets/sweat_pilates_journey_1789638740839.jpg"
};

const SweatPilates = () => {
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
        console.error('Failed to load CMS content for Pilates', err);
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
      {/* Hero Section */}
      <section id="pilates_hero" style={{ position: 'relative', height: '90vh', minHeight: '700px', width: '100%', overflow: 'hidden', backgroundColor: '#000' }}>
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <MediaRenderer 
            src={getMedia('pilates_hero_media', defaultImages.hero)} 
            alt="Sweat Pilates Studio" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} 
          />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)' }} />
        
        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '6rem' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ maxWidth: '800px', color: '#fff' }}
          >
            <p className="text-xs tracking-wider uppercase font-medium" style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
              {getText('pilates_hero_subtitle', 'THE CORE CONCEPT')}
            </p>
            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.1, marginBottom: '2rem' }}>
              {getText('pilates_hero_title', 'Sweat Pilates')}
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6, maxWidth: '650px', marginBottom: '1rem', textAlign: 'justify' }}>
              An athletic Pilates system designed to use the reformer and supporting apparatus to improve overall fitness—not simply to strengthen isolated muscle groups.
            </p>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6, maxWidth: '650px', marginBottom: '2.5rem', textAlign: 'justify' }}>
              Controlled movement, breathing, resistance, mobility, strength and conditioning are combined within the Sweat system to improve how you move, feel, perform and progress.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Three Programs */}
      <section className="section-padding" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <motion.div {...fadeUpParams} style={{ marginBottom: '4rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <p className="text-xs tracking-wider uppercase font-medium" style={{ color: 'var(--color-text-dark)', marginBottom: '1rem' }}>
              THE PROGRAMS
            </p>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.1, color: 'var(--color-text-dark)' }}>
              Three Connected Parts of One System
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
          >
            {[
              {
                id: 'pilates_stretch',
                title: getText('pilates_stretch_title', 'Sweat Stretch'),
                img: getMedia('pilates_stretch_media', defaultImages.stretch),
                focus: 'Lengthening, mobility, controlled strength',
                equipment: 'Reformer + Pilates apparatus',
                outcome: 'Flexibility, joint mobility, core strength, posture and confidence.',
                desc: getText('pilates_stretch_desc', 'The foundation and recommended entry point. Simultaneously strengthens and lengthens muscles while improving flexibility and joint mobility.')
              },
              {
                id: 'pilates_total',
                title: getText('pilates_total_title', 'Sweat Total'),
                img: getMedia('pilates_total_media', defaultImages.total),
                focus: 'Higher-intensity full-body fitness',
                equipment: 'Reformer + dumbbells & plates',
                outcome: 'Overall fitness, cardiovascular conditioning, muscular endurance and strength.',
                desc: getText('pilates_total_desc', 'Combines intense reformer movements with compound full-body movements and external resistance to progressively challenge the body.')
              },
              {
                id: 'pilates_athletic',
                title: getText('pilates_athletic_title', 'Sweat Athletic'),
                img: getMedia('pilates_athletic_media', defaultImages.athletic),
                focus: 'Functional and athletic movement',
                equipment: 'Reformer + TRX + Viper',
                outcome: 'Functional fitness across sagittal, frontal and transverse planes.',
                desc: getText('pilates_athletic_desc', 'Takes reformer training into a more functional environment to make the body better prepared for real-world and athletic movement.')
              }
            ].map((program, index) => (
              <motion.div 
                id={program.id}
                key={index}
                variants={{ 
                  hidden: { opacity: 0, y: 40 }, 
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } 
                }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
                style={{ backgroundColor: 'var(--color-bg-light)', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.03)', transition: 'all 0.3s ease' }}
                className="group"
              >
                <div style={{ position: 'relative', height: '350px', overflow: 'hidden' }}>
                  <MediaRenderer 
                    src={program.img} 
                    alt={program.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
                <div style={{ padding: '2.5rem 2rem' }}>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 400, fontFamily: 'Georgia, serif', color: 'var(--color-text-dark)', marginBottom: '1.5rem' }}>{program.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-text-dark)', opacity: 0.8, lineHeight: 1.6, marginBottom: '2rem', textAlign: 'justify' }}>
                    {program.desc}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <strong style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-dark)', opacity: 0.6 }}>Primary Focus</strong>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dark)', marginTop: '0.25rem' }}>{program.focus}</p>
                    </div>
                    <div>
                      <strong style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-dark)', opacity: 0.6 }}>Equipment</strong>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dark)', marginTop: '0.25rem' }}>{program.equipment}</p>
                    </div>
                    <div>
                      <strong style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-dark)', opacity: 0.6 }}>Key Outcome</strong>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dark)', marginTop: '0.25rem' }}>{program.outcome}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recommended Progression & Philosophy */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-dark)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '5rem' }}>
            
            <motion.div {...fadeUpParams}>
              <p className="text-xs tracking-wider uppercase font-medium" style={{ marginBottom: '1rem', opacity: 0.7 }}>
                PROGRESSION
              </p>
              <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.2, marginBottom: '2.5rem' }}>
                Recommended Pathway
              </h2>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.15 } },
                  hidden: {}
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}
              >
                <motion.div 
                  variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: { duration: 1.5, ease: "easeInOut" } } }}
                  style={{ position: 'absolute', left: '11px', top: '24px', bottom: '24px', width: '2px', backgroundColor: 'rgba(0,0,0,0.1)', originY: 0 }} 
                />
                
                {[
                  { title: "Start with Sweat Stretch", desc: "Learn the reformer, breathing, control, basic movement patterns and body awareness." },
                  { title: "Build the Foundation", desc: "Develop mobility, core strength, movement quality and conditioning." },
                  { title: "Progress (2-3 weeks)", desc: "As you become fitter and more conditioned, introduce Sweat Total and/or Sweat Athletic." },
                  { title: "Complete Profile", desc: "Use all three programs as connected parts of one progressive fitness system." }
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '2rem', position: 'relative', zIndex: 1 }}>
                    <motion.div 
                      variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { type: "spring", stiffness: 200 } } }}
                      style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#000', flexShrink: 0, marginTop: '2px' }} 
                    />
                    <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.5rem' }}>{step.title}</h4>
                      <p style={{ fontSize: '0.95rem', opacity: 0.7, lineHeight: 1.6 }}>{step.desc}</p>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div {...fadeUpParams} transition={{ delay: 0.2, duration: 0.8 }}>
              <p className="text-xs tracking-wider uppercase font-medium" style={{ marginBottom: '1rem', opacity: 0.7 }}>
                PHILOSOPHY
              </p>
              <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.2, marginBottom: '2.5rem' }}>
                Athletic vs. Rehab
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ padding: '2rem', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '4px' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: '1rem', opacity: 0.6 }}>Rehabilitation Pilates</h4>
                  <p style={{ fontSize: '0.95rem', opacity: 0.8, lineHeight: 1.6, textAlign: 'justify' }}>Controlled and gradual movement for someone recovering from injury and requiring an appropriately modified approach.</p>
                </div>
                <div style={{ padding: '2rem', backgroundColor: '#000', color: '#fff', borderRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem' }}>Athletic Pilates (The Sweat Philosophy)</h4>
                  <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.6, textAlign: 'justify' }}>Using Pilates principles to improve overall fitness, strength, endurance, mobility, movement quality and functional capability. We position Pilates as a whole-fitness system, rather than limiting it to isolated muscle strengthening.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Class Format & Coaching */}
      <section id="pilates_coaching" className="section-padding">
        <div className="container">
          <motion.div {...fadeUpParams} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '4rem', maxWidth: '800px' }}>
            <p className="text-xs tracking-wider uppercase font-medium" style={{ color: 'var(--color-text-dark)', marginBottom: '1rem' }}>
              COACHING MODEL
            </p>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.1, color: 'var(--color-text-dark)', marginBottom: '1.5rem' }}>
              {getText('pilates_coaching_title', 'Clear Command & Individual Coaching')}
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-dark)', opacity: 0.8, lineHeight: 1.6, maxWidth: '650px', textAlign: 'justify' }}>
              {getText('pilates_coaching_desc', 'Classes run for 15 minutes with approximately eight reformers, creating an intimate small-group experience. The combination of our two-trainer system is a key part of the Sweat experience.')}
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <motion.div {...fadeUpParams}>
              <div style={{ position: 'relative', height: '600px', borderRadius: '4px', overflow: 'hidden' }}>
                <MediaRenderer src={getMedia('pilates_coaching_media', defaultImages.coaching)} alt="Sweat Coaching Model" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </motion.div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <motion.div {...fadeUpParams} transition={{ delay: 0.1 }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 400, fontFamily: 'Georgia, serif', color: 'var(--color-text-dark)', marginBottom: '1rem' }}>The Teaching Trainer</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--color-text-dark)', marginBottom: '1rem' }}>Own the Class</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {['Give a clear and confident introduction', 'Explain what members should expect', 'Use precise pre-cues, follow-up and motivational cues', 'Maintain energy, clarity and control'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '1rem', color: 'var(--color-text-dark)', opacity: 0.8, fontSize: '0.95rem', lineHeight: 1.5 }}>
                      <span style={{ color: '#000', fontWeight: 700 }}>→</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div {...fadeUpParams} transition={{ delay: 0.2 }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 400, fontFamily: 'Georgia, serif', color: 'var(--color-text-dark)', marginBottom: '1rem' }}>The Assistant Trainer</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--color-text-dark)', marginBottom: '1rem' }}>Enhance Every Member</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {['Walk the floor and observe members one by one', 'Identify small technique or movement improvements', 'Give individual indications and corrections', 'Support members without disrupting class flow'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '1rem', color: 'var(--color-text-dark)', opacity: 0.8, fontSize: '0.95rem', lineHeight: 1.5 }}>
                      <span style={{ color: '#000', fontWeight: 700 }}>→</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Member Journey */}
      <section id="pilates_journey" className="section-padding" style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <motion.div {...fadeUpParams} style={{ marginBottom: '3rem' }}>
                <p className="text-xs tracking-wider uppercase font-medium" style={{ color: 'var(--color-text-dark)', marginBottom: '1rem' }}>
                  THE JOURNEY
                </p>
                <h2 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-dark)', marginBottom: '1.5rem' }}>
                  {getText('pilates_journey_title', 'Assess • Understand • Recommend • Train • Reassess')}
                </h2>
                <p style={{ fontSize: '1.05rem', color: 'var(--color-text-dark)', opacity: 0.8, lineHeight: 1.6, textAlign: 'justify' }}>
                  {getText('pilates_journey_desc', 'Our objective is not simply to conduct classes. It is to create a focused community where members understand their body, follow a structured plan, receive professional guidance and stay accountable to measurable progress.')}
                </p>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {}
                }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
              >
                {[
                  { title: "Assessment", desc: "Understand your current fitness level." },
                  { title: "Consultation", desc: "Review lifestyle, stress, sleep and goals." },
                  { title: "Action Plan", desc: "A practical timeline and pathway." },
                  { title: "Nutrition", desc: "Integrated support where appropriate." },
                  { title: "Reassessment", desc: "Every 15 days to track direction." },
                  { title: "Accountability", desc: "Professional system + Personal consistency." }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    variants={{ 
                      hidden: { opacity: 0, y: 30, scale: 0.95 }, 
                      visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 } } 
                    }}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: '0 15px 30px rgba(0,0,0,0.05)',
                      borderColor: 'rgba(0,0,0,0.1)'
                    }}
                    style={{ 
                      padding: '1.5rem', 
                      backgroundColor: '#fff', 
                      borderRadius: '6px', 
                      border: '1px solid rgba(0,0,0,0.04)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-dark)', marginBottom: '0.5rem' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dark)', opacity: 0.7, lineHeight: 1.4 }}>{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div {...fadeUpParams}>
              <div style={{ position: 'relative', height: '700px', borderRadius: '4px', overflow: 'hidden' }}>
                <MediaRenderer src={getMedia('pilates_journey_media', defaultImages.journey)} alt="Fitness Consultation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SweatPilates;
