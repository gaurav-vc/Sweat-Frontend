import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Demo from '../components/demo';
import { fetchSiteContent } from '../api/cms';

const fallbackImages = {
  hero: "/assets/hero_bg_new.png",
  approach: "/assets/Two_women_having_conversation_20260917133117.jpeg",
  assessment: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop",
  journeyProfile: "/assets/Screenshot 2026-09-17 132321.png",
  trainingReformer: "/assets/Woman_performing_Pilates_reforme…_20260917143644.jpeg",
  trainingStrength: "/assets/Person_performing_barbell_squat_20260917143636.jpeg",
  trainingPerformance: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop",
  coach: "/assets/Fitness_coach_interacting_with_c…_20260917144358.jpeg",
  progress1: "/assets/Woman_standing_in_athletic_wear_20260917144353.jpeg",
  progress2: "/assets/Woman_standing_in_athletic_wear_20260917144353.jpeg",
  progress3: "/assets/Woman_standing_in_athletic_wear_20260917144353.jpeg",
  progress4: "/assets/Woman_standing_in_athletic_wear_20260917144353.jpeg",
  longevity1: "/assets/Trainer_guiding_woman_during_wor…_20260917144833.jpeg",
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
    <section id="home_hero" style={{
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
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-studio-modal'))} className="btn btn-light cursor-pointer" style={{ padding: '15px 30px', fontSize: '0.85rem' }}>EXPERIENCE THE STUDIO →</button>
        </motion.div>
      </div>
    </section>
  );
};

const VideoSection = ({ getMedia }) => {
  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '90vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 60, ease: "linear" }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -2 }}
      >
        <video 
          src={getMedia('home_video_section', "/assets/default.mp4")} 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0.2) 100%)', zIndex: -1 }}></div>
    </section>
  );
};

const ApproachSection = ({ getText, getMedia }) => {
  return (
    <section id="home_approach" style={{ backgroundColor: '#f9f8f6', padding: '6rem 0' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ flex: '1 1 280px', color: 'var(--color-text-dark)' }}
          >
            <p className="text-xs tracking-wider uppercase" style={{ marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--color-text-muted)' }}>THE APPROACH</p>
            
            <h2 
              style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '2rem', fontWeight: 400, lineHeight: 1.2, fontFamily: 'Georgia, serif' }}
            >
              {getText('home_approach_title', "WE DON'T START\nWITH A WORKOUT.\n\nWE START WITH YOU.").split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br/>
                </React.Fragment>
              ))}
            </h2>
            
            <p 
              style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: 1.6, fontWeight: 400, maxWidth: '500px' }}
            >
              {getText('home_approach_text', "Every journey begins with understanding your body, your lifestyle, your goals and what you want to achieve.")}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            style={{ flex: '1 1 280px' }}
          >
            <img 
              src={getMedia('home_approach_image', fallbackImages.approach)} 
              alt="Approach" 
              style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '4px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AssessmentSection = ({ getText, getMedia }) => {
  return (
    <section id="home_assessment" style={{ backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-light)' }}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', minHeight: '80vh' }}>
        
        <div style={{ flex: '1 1 280px', padding: '100px 5%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div {...fadeUpParams} style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
            
            <div style={{ flex: '1 1 250px', paddingRight: '1rem' }}>
              <p className="text-xs tracking-wider uppercase" style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.6)' }}>01 &mdash; ASSESSMENT</p>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '2rem', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.1 }}>
                {getText('home_assessment_title', "Know where\nyou're starting.").split('\n').map((line, i) => (
                  <React.Fragment key={i}>{line}<br/></React.Fragment>
                ))}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '300px' }}>
                {getText('home_assessment_text', "Before we prescribe a programme,\nwe understand your starting point.").split('\n').map((line, i) => (
                  <React.Fragment key={i}>{line}<br/></React.Fragment>
                ))}
              </p>
            </div>
            
            <div style={{ flex: '1 1 200px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <motion.ul 
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-100px" }}
                style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '3rem' }}
              >
                {['Movement', 'Strength', 'Mobility', 'Body Composition', 'Lifestyle', 'Goals'].map((item) => (
                  <motion.li 
                    key={item} 
                    variants={{ initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 } }}
                    style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)' }}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <div>
                <a href="#" className="text-xs tracking-wider uppercase font-medium" style={{ color: 'var(--color-text-light)', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '0.5rem', textDecoration: 'none', display: 'inline-block' }}>DISCOVER THE ASSESSMENT &rarr;</a>
              </div>
            </div>

          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          style={{ flex: '1 1 280px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
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
    <section className="section-padding" style={{ backgroundColor: '#f9f8f6' }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        <motion.div {...fadeUpParams} style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
          
          <div style={{ flex: '1 1 250px', maxWidth: '350px' }}>
            <p className="text-xs tracking-wider uppercase" style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>02 &mdash; YOUR JOURNEY</p>
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', marginBottom: '1.5rem', fontWeight: 400, lineHeight: 1.1, fontFamily: 'Georgia, serif' }}>
              {getText('home_journey_title', "SEE THE JOURNEY.\nNOT JUST THE\nDESTINATION.").split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}<br/></React.Fragment>
              ))}
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>
              {getText('home_journey_text', "Your training is structured and reviewable, ensuring your progress is always transparent to you.")}
            </p>
          </div>
          
          <div style={{ flex: '2 1 400px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              {['TODAY', '90 DAYS', '180 DAYS', '360 DAYS'].map(title => (
                <div key={title} className="text-xs tracking-wider uppercase font-medium" style={{ color: 'var(--color-text-muted)' }}>{title}</div>
              ))}
            </div>
            <div style={{ position: 'relative', height: '1px', backgroundColor: 'rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
              {[0, 33.3, 66.6, 100].map(pos => (
                <div key={pos} style={{ position: 'absolute', left: `${pos}%`, top: '50%', transform: 'translate(-50%, -50%)', width: '5px', height: '5px', backgroundColor: 'var(--color-text-dark)', borderRadius: '50%' }}></div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {[
                { icon: '⭐', label: 'Training' },
                { icon: '♡', label: 'Nutrition' },
                { icon: '🌱', label: 'Recovery' },
                { icon: '💧', label: 'Movement' },
                { icon: '✓', label: 'Consistency' }
              ].map(step => (
                <div key={step.label} className="text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem', opacity: 0.6 }}>{step.icon}</div>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-text-dark)' }}>{step.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ flex: '1.5 1 350px', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
             <img src={getMedia('home_journey_image', fallbackImages.journeyProfile)} alt="Profile" style={{ width: '130px', height: '180px', objectFit: 'cover', borderRadius: '4px' }} />
             <motion.div 
               variants={staggerContainer}
               initial="initial"
               whileInView="whileInView"
               style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}
             >
                {['TRAINING', 'NUTRITION', 'RECOVERY', 'MOVEMENT', 'CONSISTENCY'].map((stat, i) => (
                  <motion.div 
                    key={stat} 
                    variants={{ initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 } }}
                    style={{ display: 'flex', alignItems: 'center', fontSize: '0.7rem', letterSpacing: '0.1em' }}
                  >
                    <div style={{ width: '110px', fontWeight: 500 }}>{stat}</div>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0,0,0,0.1)', position: 'relative' }}>
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.random() * 50 + 40}%` }}
                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                        style={{ position: 'absolute', left: 0, top: 0, height: '1px', backgroundColor: 'var(--color-text-dark)' }}
                      >
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
             </motion.div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
};

const TrnKioskSection = ({ getText, getMedia }) => {
  const cards = [
    {
      imageKey: 'home_kiosk_image_1',
      fallback: fallbackImages.trainingReformer,
      title: 'REFORMER',
      subtitle: 'CORE STRENGTH'
    },
    {
      imageKey: 'home_kiosk_image_2',
      fallback: fallbackImages.trainingStrength,
      title: 'STRENGTH',
      subtitle: 'MUSCLE BUILDING'
    },
    {
      imageKey: 'home_kiosk_image_3',
      fallback: fallbackImages.trainingPerformance,
      title: 'PERFORMANCE',
      subtitle: 'ATHLETIC MOVEMENT'
    }
  ];

  return (
    <section id="home_kiosk" className="section-padding" style={{ backgroundColor: '#f9f8f6' }}>
      <div className="container" style={{ maxWidth: '1600px' }}>
        <p className="text-xs tracking-wider uppercase font-medium" style={{ color: 'var(--color-text-dark)', marginBottom: '1.5rem' }}>
          0.2 &mdash; TRN KIOSK
        </p>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '1rem' }}>
          {cards.map((card, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              style={{ flex: '1 0 300px', height: '500px', position: 'relative', overflow: 'hidden' }}
            >
              <img 
                src={getMedia(card.imageKey, card.fallback)} 
                alt={card.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 40%)' }}></div>
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', color: '#fff' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 500, letterSpacing: '0.05em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{card.title}</h3>
                <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.8, textTransform: 'uppercase' }}>{card.subtitle}</p>
              </div>
            </motion.div>
          ))}
          
          <div style={{ flex: '0 0 250px', paddingLeft: '2rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.2rem)', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.2, color: 'var(--color-text-dark)', marginBottom: '1.5rem' }}>
              {getText('home_kiosk_title', 'Different goals\nrequire different\napproaches.').split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}<br/></React.Fragment>
              ))}
            </h2>
            <div style={{ width: '30px', height: '1px', backgroundColor: 'var(--color-text-dark)' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CoachSection = ({ getText, getMedia }) => {
  return (
    <section id="home_coach" className="section-padding" style={{ backgroundColor: '#f9f8f6' }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        <motion.div {...fadeUpParams} style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
          
          <div style={{ flex: '1 1 300px', maxWidth: '350px' }}>
            <p className="text-xs tracking-wider uppercase font-medium" style={{ marginBottom: '1.5rem', color: 'var(--color-text-dark)' }}>
              04 &mdash; THE COACH
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '2rem', fontWeight: 400, lineHeight: 1.1, fontFamily: 'Georgia, serif', color: 'var(--color-text-dark)' }}>
              {getText('home_coach_title', "TECHNOLOGY DOESN'T\nREPLACE THE COACH.").split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}<br/></React.Fragment>
              ))}
            </h2>
            <p className="text-xs tracking-wider uppercase font-medium" style={{ color: 'var(--color-text-dark)', opacity: 0.6, letterSpacing: '0.1em' }}>
              {getText('home_coach_subtitle', "IT MAKES THE COACH\nBETTER INFORMED.").split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}<br/></React.Fragment>
              ))}
            </p>
          </div>
          
          <div style={{ flex: '1 1 200px', display: 'flex', justifyContent: 'center' }}>
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', fontSize: '0.9rem', fontWeight: 500 }}
            >
              {['Assessment', '↓', 'Programme', '↓', 'Coaching', '↓', 'Measurement', '↓', 'Adaptation'].map((text, i) => (
                <motion.div key={i} variants={{ initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 } }} style={{ color: text === '↓' ? 'rgba(0,0,0,0.3)' : 'var(--color-text-dark)' }}>
                  {text}
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'flex-end' }}>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} style={{ width: '100%', maxWidth: '380px' }}>
              <img src={getMedia('home_coach_image', fallbackImages.coach)} alt="Coach advising client" style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '4px' }} />
            </motion.div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
};

const ProgressSection = ({ getText, getMedia }) => {
  return (
    <section id="home_progress" style={{ backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-light)', padding: '100px 0' }}>
      <div className="container">
        <p className="text-xs tracking-wider uppercase" style={{ marginBottom: '4rem', color: 'rgba(255,255,255,0.6)' }}>05 &mdash; PROGRESS</p>
        
        <motion.div {...fadeUpParams} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <motion.div 
            variants={{ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 } }}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <img 
              src={getMedia('home_progress_image_1', fallbackImages.progress1)} 
              alt="Progress Over 90 Days" 
              style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '4px' }} 
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.2rem' }}>
              {['DAY 01', 'DAY 30', 'DAY 60', 'DAY 90'].map((day, i) => (
                <p key={i} className="text-xs text-center tracking-wider font-semibold" style={{ color: 'rgba(255,255,255,0.6)', flex: 1 }}>
                  {day}
                </p>
              ))}
            </div>
          </motion.div>
          
          <div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '1.5rem', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.1 }}>
              {getText('home_progress_title', "PROGRESS\nDESERVES\nEVIDENCE.").split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}<br/></React.Fragment>
              ))}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', maxWidth: '300px', fontSize: '1.1rem', lineHeight: 1.6 }}>
              {getText('home_progress_text', "Your journey is documented, measured and reviewed — so your training evolves as you do at SWEAT FIT.")}
            </p>
            <a href="#" className="link-arrow btn-light" style={{ padding: 0, border: 'none', borderBottom: '1px solid currentColor', fontSize: '0.85rem' }}>SEE THE APP &rarr;</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const LongevitySection = ({ getText, getMedia }) => {
  return (
    <section id="home_longevity" className="section-padding" style={{ backgroundColor: '#f9f8f6' }}>
      <div className="container" style={{ maxWidth: '1600px' }}>
        <motion.div {...fadeUpParams} style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
          
          <div style={{ flex: '1 1 350px', maxWidth: '450px' }}>
            <p className="text-xs tracking-wider uppercase font-medium" style={{ marginBottom: '1.5rem', color: 'var(--color-text-dark)' }}>
              06 &mdash; LONGEVITY
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '1.5rem', fontWeight: 400, lineHeight: 1.1, fontFamily: 'Georgia, serif', color: 'var(--color-text-dark)' }}>
              {getText('home_longevity_title', "YOUR STRONGEST YEARS\nSHOULDN'T BE BEHIND YOU.").split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}<br/></React.Fragment>
              ))}
            </h2>
            <p style={{ color: 'var(--color-text-dark)', opacity: 0.8, marginBottom: '2.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
              {getText('home_longevity_text', "Strength, mobility, balance and confidence become even more important as we age. We adapt training to the person — not the other way around.")}
            </p>
            <a href="#" className="link-arrow" style={{ fontSize: '0.85rem', color: 'var(--color-text-dark)', fontWeight: 500, letterSpacing: '0.05em' }}>EXPLORE LONGEVITY &rarr;</a>
          </div>
          
          <div style={{ flex: '2 1 500px', display: 'flex', justifyContent: 'center' }}>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} style={{ width: '100%' }}>
              <img src={getMedia('home_longevity_image_1', fallbackImages.longevity1)} alt="Longevity Training" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '4px' }} />
            </motion.div>
          </div>
          
          <div style={{ flex: '1 1 200px' }}>
            <motion.div {...fadeUpParams} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p className="text-xs tracking-wider uppercase font-semibold" style={{ color: 'var(--color-text-dark)', lineHeight: 1.6 }}>A SPACE DESIGNED<br/>FOR FOCUS. MOVEMENT<br/>AND PROGRESS.</p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', letterSpacing: '0.1em', fontWeight: 500 }}>
                <li><a href="#" className="hover:opacity-60 transition-opacity" style={{ color: 'var(--color-text-dark)' }}>REFORMER</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity" style={{ color: 'var(--color-text-dark)' }}>STRENGTH</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity" style={{ color: 'var(--color-text-dark)' }}>MOVEMENT</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity" style={{ color: 'var(--color-text-dark)' }}>COACHING</a></li>
              </ul>
            </motion.div>
          </div>
          
        </motion.div>
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
      <VideoSection getMedia={getMedia} />
      <ApproachSection getText={getText} getMedia={getMedia} />
      <AssessmentSection getText={getText} getMedia={getMedia} />
      <JourneySection getText={getText} getMedia={getMedia} />
      <TrnKioskSection getText={getText} getMedia={getMedia} />
      <Demo />
      <CoachSection getText={getText} getMedia={getMedia} />
      <ProgressSection getText={getText} getMedia={getMedia} />
      <LongevitySection getText={getText} getMedia={getMedia} />
    </main>
  );
}
