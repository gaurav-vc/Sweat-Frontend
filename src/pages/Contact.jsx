import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { submitEnquiry, fetchSiteContent } from '../api/cms';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    subject: '',
    message: '',
    newsletter: false
  });
  
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  const [cmsMap, setCmsMap] = useState({});

  useEffect(() => {
    const loadCMSData = async () => {
      try {
        const content = await fetchSiteContent();
        const map = {};
        content.forEach(item => {
          map[item.key] = item;
        });
        setCmsMap(map);
      } catch (err) {
        console.error("Failed to load CMS data on Contact:", err);
      }
    };
    loadCMSData();
  }, []);

  const getText = (key, fallback) => {
    const item = cmsMap[key];
    if (item && item.value) return item.value;
    return fallback;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      await submitEnquiry(formData);
      setStatus({ loading: false, success: true, error: '' });
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        contact: '',
        subject: '',
        message: '',
        newsletter: false
      });
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, success: false, error: 'Failed to submit enquiry. Please try again.' });
    }
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', fontFamily: 'var(--font-sans)', paddingBottom: '100px' }}>
      
      {/* Header Section */}
      <section style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '120px 20px 80px', textAlign: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {getText('contact_title', 'CONTACT US')}
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', opacity: 0.9, lineHeight: 1.6, letterSpacing: '0.05em' }}>
            {getText('contact_subtitle', "Have a question or something to share? Let us know by dropping us a message, and we'll get back to you as soon as possible.")}
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section id="contact" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', marginTop: '60px' }}>
        
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '40px', textTransform: 'uppercase' }}>
          {getText('contact_form_title', 'LEAVE US A NOTE')}
        </h2>
        
        <div style={{ backgroundColor: '#f5f5f5', borderRadius: '4px', display: 'flex', flexWrap: 'wrap' }}>
          
          {/* Left Side: Map and Info */}
          <div style={{ flex: '1 1 400px', padding: '40px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '20px' }}>
              {getText('contact_reach_us', 'Reach us at')}
            </h3>
            
            {/* Map Frame */}
            <div style={{ width: '100%', height: '250px', backgroundColor: '#e5e5e5', marginBottom: '30px', borderRadius: '4px', overflow: 'hidden' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3496924401874!2d72.83155707520677!3d19.13615308208151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b62fb7ecdc25%3A0xd6897914757530be!2sSweat%20Pilates%20Goregaon%20West!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="SWEAT FIT Location"
              ></iframe>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Phone size={20} />
                <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{getText('contact_phone', '+91 00000 00000')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Mail size={20} />
                <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{getText('contact_email', 'support@sweatfitwellness.com')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <MapPin size={20} style={{ marginTop: '3px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.5 }}>
                  {getText('contact_address', '244/1952 Motilalnagar.1 near Vibgyor, school, New Link Rd, off to, Goregaon West, Mumbai, Maharashtra 400104')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div style={{ flex: '1 1 400px', padding: '40px' }}>
            {status.success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ backgroundColor: '#ecfdf5', padding: '2rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #10b981' }}
              >
                <h3 style={{ color: '#059669', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Thank You!</h3>
                <p style={{ color: '#047857' }}>Your message has been sent successfully. We will get back to you soon.</p>
                <button 
                  onClick={() => setStatus({ ...status, success: false })}
                  style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Send Another Note
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {status.error && (
                  <div style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: '4px', fontSize: '0.9rem', border: '1px solid #f87171' }}>
                    {status.error}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>First Name</label>
                  <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', backgroundColor: 'transparent' }} />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Last Name</label>
                  <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', backgroundColor: 'transparent' }} />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Your Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', backgroundColor: 'transparent' }} />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Contact</label>
                  <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', backgroundColor: 'transparent' }} />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Subject</label>
                  <select name="subject" value={formData.subject} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', backgroundColor: 'transparent', appearance: 'menulist' }}>
                    <option value="" disabled>—Please choose an option—</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Classes & Programs">Classes & Programs</option>
                    <option value="Membership">Membership</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Your Message (Optional)</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', backgroundColor: 'transparent', height: '100px', resize: 'vertical' }}></textarea>
                </div>
                
                <div>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} style={{ marginTop: '2px' }} />
                    ADD ME TO THE SWEAT FIT WELLNESS NEWSLETTER TOO!
                  </label>
                </div>
                
                <div style={{ marginTop: '10px' }}>
                  <button type="submit" disabled={status.loading} style={{ backgroundColor: 'black', color: 'white', padding: '12px 30px', border: 'none', fontWeight: 600, letterSpacing: '0.1em', cursor: status.loading ? 'not-allowed' : 'pointer', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                    {status.loading ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
