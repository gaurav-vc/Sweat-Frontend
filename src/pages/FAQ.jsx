import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchFAQCategories } from '../api/cms';

const fallbackData = [
  {
    category: "Getting Started",
    items: [
      { q: "What should I bring to my first class?", a: "Bring a water bottle, a towel, and wear comfortable workout attire. Grip socks are required for Pilates." },
      { q: "How early should I arrive?", a: "Please arrive 15 minutes before your first class to check in, sign a waiver, and get a studio tour." },
      { q: "Do I need to be fit to join?", a: "Not at all! Our classes are designed for all fitness levels, with instructors providing modifications for beginners." },
      { q: "How do I book a class?", a: "Classes can be booked through our app or website up to 7 days in advance." }
    ]
  },
  {
    category: "Sweat Pilates",
    items: [
      { q: "What is Reformer Pilates?", a: "Reformer Pilates uses a specialized machine with springs and pulleys to provide resistance, improving strength and flexibility." },
      { q: "Are grip socks mandatory?", a: "Yes, for hygiene and safety reasons, grip socks are required in all Pilates classes." },
      { q: "Can I do Pilates if I'm pregnant?", a: "We offer specialized prenatal classes. Please consult your doctor and inform our instructors before joining a regular class." },
      { q: "How often should I attend?", a: "For best results, we recommend 2-3 sessions per week." }
    ]
  },
  {
    category: "Sweat Bootcamp",
    items: [
      { q: "What is the structure of a Bootcamp class?", a: "Our 45-minute Bootcamp classes combine HIIT, strength training, and cardiovascular exercises in a fast-paced environment." },
      { q: "Will I get too bulky?", a: "No, our programs are designed to build lean muscle and burn fat, not to create bulk." },
      { q: "What shoes should I wear?", a: "Proper cross-training or running shoes with good support are required." }
    ]
  },
  {
    category: "Memberships & App",
    items: [
      { q: "Can I freeze my membership?", a: "Yes, memberships can be frozen for up to 4 weeks per year with a 7-day notice." },
      { q: "What's your cancellation policy?", a: "Classes must be cancelled at least 12 hours in advance to avoid a late cancellation fee." },
      { q: "What details help resolve app issues faster?", a: "Providing your registered mobile/email, device type, app version, a screenshot or screen recording, and a short note describing what happened will help resolve issues much faster." },
      { q: "How quickly does support respond?", a: "The team strives to respond to emails within 24 hours." }
    ]
  },
  {
    category: "Sweat Online & Training",
    items: [
      { q: "Is Sweat Online customized?", a: "Yes. The online program is presented as a personalized plan shaped by your goals, questionnaire responses, and progress updates." },
      { q: "How does Sweat Online onboarding work?", a: "After purchase, members receive a questionnaire, and a customized plan is shared within four working days. The experience also highlights weekly follow-ups and progress questionnaires every 25 days." },
      { q: "How do I get nutrition support while on an online plan?", a: "The online FAQ points members to the Plan Production Team and website live chat for added support, highlighting quick query resolution as part of the program experience." },
      { q: "Can I follow Sweat Online from home?", a: "Yes. Sweat Online is designed to support training from home, in the gym, or wherever you are most consistent." },
      { q: "What equipment is helpful for the online plan?", a: "We recommend simple, practical equipment such as dumbbells, a skipping rope, an adjustable bench, and resistance bands." },
      { q: "How are meal-plan options handled?", a: "The latest food preference options are shown during enrollment and onboarding, so you can choose the plan style that best fits your goals." },
      { q: "How does 1:1 Personal Training work?", a: "1:1 training is booked through the application based on availability. Members may work with different trainers across sessions while their progress is tracked by the backend team." }
    ]
  },
  {
    category: "Shop Orders & Pickup",
    items: [
      { q: "How are Sweat Shop orders fulfilled?", a: "Accessories are currently fulfilled through studio pickup, which creates a simple and clear collection experience for members." },
      { q: "Is home delivery available for accessories?", a: "Accessory orders are studio pickup only, with collection from the reception desk at the selected studio location." },
      { q: "Can I change my pickup location after ordering?", a: "Yes. Members may request a pickup-location update within 48 hours of placing the order, subject to stock availability and location." },
      { q: "What should I know when I collect my order?", a: "A quick item check at pickup is the best experience. If anything needs immediate attention, the studio team can assist right away at the reception desk." },
      { q: "How do returns for accessories work?", a: "Accessory orders are prepared as final pickup purchases, so we encourage you to review your order carefully before checkout and inspect the item at collection." }
    ]
  }
];

const FlipCard = ({ q, a }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-[250px] cursor-pointer group perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Front side - Question */}
        <div className="absolute w-full h-full backface-hidden bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] group-hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] transition-shadow">
          <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-6 font-serif text-2xl">
            Q
          </div>
          <h3 className="text-xl font-bold text-gray-800 leading-snug" dangerouslySetInnerHTML={{ __html: q }}>
          </h3>
          <p className="absolute bottom-6 text-sm text-gray-400 font-medium tracking-widest uppercase">
            Hover to Reveal
          </p>
        </div>

        {/* Back side - Answer */}
        <div 
          className="absolute w-full h-full backface-hidden bg-black text-white rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-2xl"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-[1.05rem] leading-relaxed font-light text-gray-200" dangerouslySetInnerHTML={{ __html: a }}>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const FAQ = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [faqData, setFaqData] = useState(fallbackData);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await fetchFAQCategories();
        if (data && data.length > 0) {
          // Transform backend data to match frontend structure
          const formattedData = data.map(cat => ({
            category: cat.name,
            items: cat.items.map(item => ({ q: item.question, a: item.answer }))
          }));
          setFaqData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      }
    };
    fetchFAQs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-24" style={{ paddingTop: '150px' }}>
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div style={{ marginBottom: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-black"
            style={{ fontFamily: 'var(--font-serif)', marginBottom: '1.5rem', width: '100%' }}
          >
            How Can We Help?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
            style={{ marginBottom: '2rem', maxWidth: '42rem', marginInline: 'auto' }}
          >
            Everything you need to know about SWEAT FIT memberships, classes, billing, and the app.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '4rem' }}>
          {faqData.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide`}
              style={{
                padding: '12px 24px',
                borderRadius: '9999px',
                backgroundColor: activeTab === idx ? 'black' : 'white',
                color: activeTab === idx ? 'white' : '#4b5563',
                border: activeTab === idx ? 'none' : '1px solid #e5e7eb',
                boxShadow: activeTab === idx ? '0 10px 15px -3px rgba(0,0,0,0.1)' : '0 1px 2px 0 rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease'
              }}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="relative" style={{ minHeight: '600px' }}>
          <AnimatePresence mode="wait">
            {faqData[activeTab] && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
              >
                {faqData[activeTab].items.map((item, i) => (
                  <FlipCard key={i} q={item.q} a={item.a} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default FAQ;
