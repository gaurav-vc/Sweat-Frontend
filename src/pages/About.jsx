import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Users, Sparkles, ArrowRight } from 'lucide-react';

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="about_hero" className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/Two_women_having_conversation_20260917133117.jpeg" 
            alt="Our Story background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-10" />
        </div>
        
        <div className="relative z-20 container mx-auto px-8 text-center mt-20 flex flex-col items-center justify-center w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide text-center"
            style={{ fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}
          >
            OUR STORY
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 max-w-4xl text-center font-light leading-relaxed"
          >
            Welcome to Sweat Fit Wellness where your fitness journey begins and transformations happen!
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-white" style={{ padding: '4rem 0' }}>
        <div className="container mx-auto px-8 max-w-5xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-black mb-8" style={{ fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>Who We Are</h2>
            <p className="text-xl text-gray-800 leading-relaxed font-light">
              We are more than just a fitness program; we’re a vibrant community focused on helping you achieve your best self through expertly crafted group exercise classes and a supportive, motivating environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="about_mission" className="bg-gray-50" style={{ padding: '6rem 0', backgroundColor: '#f9fafb' }}>
        <div className="container mx-auto px-8 max-w-5xl">
          <div className="grid md:grid-cols-2 items-start" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-xl" style={{ marginBottom: '1.5rem', width: '56px', height: '56px', backgroundColor: 'black', color: 'white', borderRadius: '50%' }}>
                <Target size={24} />
              </div>
              <h2 className="text-3xl font-bold text-black" style={{ fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed" style={{ marginBottom: '1rem' }}>
                To empower individuals to push past their limits, build lasting healthy habits, and achieve incredible results—physically, mentally, and emotionally.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Whether you’re a beginner taking your first step toward fitness or an enthusiast looking to level up, we’ve designed our classes to suit every fitness level and goal.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-xl" style={{ marginBottom: '1.5rem', width: '56px', height: '56px', backgroundColor: 'black', color: 'white', borderRadius: '50%' }}>
                <Heart size={24} />
              </div>
              <h2 className="text-3xl font-bold text-black" style={{ fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>A Holistic Experience</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Sweat we believe fitness is a holistic experience. Our highly skilled trainers bring a mix of expertise and energy to every session, ensuring you not only meet your goals but exceed them.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs & Benefits (The Grid) */}
      <section className="bg-white" style={{ padding: '6rem 0' }}>
        <div className="container mx-auto px-8 max-w-5xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            style={{ marginBottom: '4rem' }}
          >
            <h2 className="text-4xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>
              Tailored For You
            </h2>
            <p className="text-xl text-gray-600">
              From strength-building and endurance training to flexibility and stress relief, our programs are tailored to help you:
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}
          >
            {[
              { title: "Unlock your full potential", icon: Sparkles },
              { title: "Gain confidence and resilience", icon: Heart },
              { title: "Build a stronger, healthier body", icon: Target },
              { title: "Transform your mindset", icon: Users }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="group p-8 rounded-3xl bg-gray-50 hover:bg-black transition-colors duration-500 cursor-pointer"
                style={{ padding: '2rem', borderRadius: '1.5rem', backgroundColor: '#f9fafb' }}
              >
                <item.icon className="w-10 h-10 text-black mb-6 group-hover:text-white transition-colors duration-500" style={{ marginBottom: '1.5rem' }} />
                <h3 className="text-2xl font-bold text-black group-hover:text-white transition-colors duration-500" style={{ fontFamily: 'var(--font-serif)' }}>
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Community & Space */}
      <section className="bg-gray-50" style={{ padding: '6rem 0', backgroundColor: '#f9fafb' }}>
        <div className="container mx-auto px-8 max-w-5xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-black" style={{ fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>Our Space, Your Community</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We pride ourselves on creating a safe, inclusive, and welcoming space where everyone can thrive. With state-of-the-art facilities, innovative workout techniques, and a community that cheers you on, you’ll feel inspired and motivated every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white text-black" style={{ padding: '8rem 0 6rem 0' }}>
        <div className="container mx-auto px-8 max-w-5xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>
              At Sweat Studios we don’t just focus on fitness—we focus on you.
            </h2>
            <p className="text-xl text-gray-600" style={{ marginBottom: '3rem' }}>
              Together, let’s break barriers, celebrate progress, and redefine what’s possible.
            </p>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
