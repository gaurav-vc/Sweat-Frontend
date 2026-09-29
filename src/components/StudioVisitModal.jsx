import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { submitStudioVisit } from '../api/cms';

const goalsList = [
  "Weight loss", "Build muscle", "Improve mobility",
  "General fitness", "Athletic conditioning", "Post-rehab"
];

const stateCityMap = {
  "Andaman and Nicobar Islands": ["Port Blair"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
  "Arunachal Pradesh": ["Itanagar", "Tawang"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur"],
  "Chandigarh": ["Chandigarh"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Manali"],
  "Jammu and Kashmir": ["Srinagar", "Jammu"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Ladakh": ["Leh", "Kargil"],
  "Lakshadweep": ["Kavaratti"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  "Manipur": ["Imphal"],
  "Meghalaya": ["Shillong"],
  "Mizoram": ["Aizawl"],
  "Nagaland": ["Dimapur", "Kohima"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
  "Puducherry": ["Puducherry", "Oulgaret"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  "Sikkim": ["Gangtok"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
  "Tripura": ["Agartala"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Noida"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee"],
  "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Siliguri"]
};

const indianStates = Object.keys(stateCityMap);

const StudioVisitModal = ({ isOpen: propIsOpen, onClose: propOnClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (propIsOpen !== undefined) {
      setIsOpen(propIsOpen);
    }
  }, [propIsOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-studio-modal', handleOpen);
    return () => window.removeEventListener('open-studio-modal', handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (propOnClose) propOnClose();
  };

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact_number: '',
    gender: '',
    birthday: '',
    branch_name: '',
    interested_in: '',
    pincode: '',
    country: 'India',
    state: '',
    location_area: '',
    goal: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError(null);
    if (name === 'email') {
      setEmailError('');
    }
    if (name === 'pincode') {
      setPincodeError('');
      // Auto-fetch when 6 digits are entered
      if (/^\d{6}$/.test(value)) {
        fetchLocationFromPincode(value);
      }
    }
  };

  const fetchLocationFromPincode = async (pincode) => {
    setPincodeLoading(true);
    setPincodeError('');
    try {
      // Primary: zippopotam (CORS enabled, fast ~100ms)
      const res = await fetch(`https://api.zippopotam.us/in/${pincode}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.places?.length > 0) {
          const place = data.places[0];
          const rawState = place.state || '';
          const matchedState = indianStates.find(
            (s) =>
              s.toLowerCase() === rawState.toLowerCase() ||
              rawState.toLowerCase().includes(s.toLowerCase()) ||
              s.toLowerCase().includes(rawState.toLowerCase())
          ) || rawState;

          setFormData((prev) => ({
            ...prev,
            country: 'India',
            state: matchedState,
            location_area: place['place name'] || prev.location_area,
          }));
          return;
        }
      }

      // Fallback: postalpincode
      try {
        const fallbackRes = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const fallbackData = await fallbackRes.json();
        if (fallbackData?.[0]?.Status === 'Success' && fallbackData[0].PostOffice?.length > 0) {
          const po = fallbackData[0].PostOffice[0];
          const matchedState = indianStates.find(
            (s) =>
              s.toLowerCase() === (po.State || '').toLowerCase() ||
              (po.State || '').toLowerCase().includes(s.toLowerCase())
          ) || po.State;

          setFormData((prev) => ({
            ...prev,
            country: 'India',
            state: matchedState,
            location_area: po.District || po.Name || prev.location_area,
          }));
          return;
        }
      } catch (_) {}

      setPincodeError('Pincode not found. Please select state manually.');
    } catch (err) {
      console.warn('Pincode lookup error:', err);
      setPincodeError('Could not fetch location. Please select state manually.');
    } finally {
      setPincodeLoading(false);
    }
  };

  const handleGoalToggle = (goal) => {
    setFormData((prev) => {
      let currentGoals = prev.goal ? prev.goal.split(',').map(g => g.trim()).filter(Boolean) : [];
      if (currentGoals.includes(goal)) {
        currentGoals = currentGoals.filter(g => g !== goal);
      } else {
        currentGoals.push(goal);
      }
      return { ...prev, goal: currentGoals.join(', ') };
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };


    const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['first_name', 'last_name', 'email', 'contact_number', 'branch_name', 'interested_in'];
    const isAnyRequiredEmpty = requiredFields.some(field => !formData[field] || !formData[field].trim());

    if (isAnyRequiredEmpty) {
      setError('Please fill the mandatory details!!');
      return;
    }

    if (!validateEmail(formData.email)) return;

    setLoading(true);
    setError(null);
    try {
      // 1. Primary Action — Save to Django backend (falls back to live endpoint if local port 8000 is occupied by CRM)
      try {
        await submitStudioVisit({
          ...formData,
          contact_number: `+91 ${formData.contact_number}`
        });
      } catch (cmsErr) {
        console.warn('CMS submission via client.js failed (e.g. port 8000 used by CRM), attempting direct live CMS endpoint:', cmsErr);
        try {
          await fetch('https://sweatfit.vibesandbox.live/api/cms/studio-visits/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...formData,
              contact_number: `+91 ${formData.contact_number}`
            })
          });
        } catch (liveErr) {
          console.warn('Direct live CMS post also failed:', liveErr);
        }
      }

      // 2. CRM Webhook — Send ALL fields to CRM (fails silently if CRM is offline)
      try {
        const tenantSlug = 'sweat';
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const crmBackendUrl = isLocalhost ? 'http://localhost:8000' : null; // CRM not live yet — skip in production

        if (crmBackendUrl) {
          await fetch(`${crmBackendUrl}/api/v1/webhooks/leads/${tenantSlug}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              // Contact details
              first_name: formData.first_name,
              last_name: formData.last_name,
              email: formData.email,
              phone: `+91 ${formData.contact_number}`,
              // Interest & location
              branch_name: formData.branch_name,
              interested_in: formData.interested_in,
              goal: formData.goal,
              // Location fields
              pincode: formData.pincode,
              country: formData.country,
              state: formData.state,
              location_area: formData.location_area,
              // Personal details
              gender: formData.gender,
              birthday: formData.birthday,
              // Lead source
              lead_source: 'WEBSITE',
            })
          });
        }
      } catch (crmError) {
        // CRM webhook fails silently — form submission still succeeds
        console.warn('CRM Webhook connection failed, but proceeding:', crmError);
      }

      // 3. Always show success
      setSuccess(true);
      setTimeout(() => {
        handleClose();
        setSuccess(false);
        setFormData({
          first_name: '', last_name: '', email: '', contact_number: '',
          gender: '', birthday: '', branch_name: '', interested_in: '',
          pincode: '', country: 'India', state: '', location_area: '', goal: ''
        });
      }, 3000);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <AnimatePresence>
      {isOpen && (
        <div className="studio-modal-overlay">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="studio-modal-container"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-8 right-8 p-3 text-black hover:bg-black hover:text-white rounded-full transition-all z-20 cursor-pointer border-none bg-transparent"
              style={{ zIndex: 50, right: '2rem', top: '2rem', position: 'absolute' }}
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {success ? (
              <div style={{ padding: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.4, delay: 0.1 }}
                >
                  <CheckCircle size={80} strokeWidth={1} style={{ marginBottom: '32px', color: '#000' }} />
                </motion.div>
                <h2 style={{ fontSize: '36px', fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>REQUEST RECEIVED</h2>
                <p style={{ color: '#666', fontSize: '18px', maxWidth: '450px', lineHeight: '1.6' }}>
                  Thank you for choosing SWEAT. Our concierge will contact you shortly to confirm your private visit.
                </p>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, width: '100%' }}>

                <div className="studio-modal-header">
                  <h2 style={{ fontSize: '42px', fontFamily: 'var(--font-serif)', margin: '0 0 12px 0', letterSpacing: '-0.02em', lineHeight: '1' }}>EXPERIENCE THE STUDIO</h2>
                  <p style={{ fontSize: '15px', color: '#666', margin: 0 }}>
                    Request a private visit and personalized tour. Please provide your details below and our team will be in touch.
                  </p>
                </div>

                <div className="studio-modal-body">

                  <div>
                    <h3 style={{ fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '40px', paddingBottom: '16px', borderBottom: '1px solid #000', display: 'inline-block' }}>
                      01. Contact Details
                    </h3>

                    <div className="studio-grid">
                      <div className="studio-input-group">
                        <label className="studio-label">First Name *</label>
                        <input required name="first_name" value={formData.first_name} onChange={handleChange} placeholder="e.g. Rahul" className="studio-input" />
                      </div>
                      <div className="studio-input-group">
                        <label className="studio-label">Last Name *</label>
                        <input required name="last_name" value={formData.last_name} onChange={handleChange} placeholder="e.g. Sharma" className="studio-input" />
                      </div>

                      <div className="studio-input-group">
                        <label className="studio-label">Email Address *</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="rahul.sharma@example.com" className="studio-input" style={{ borderColor: emailError ? '#ef4444' : '#e0e0e0' }} />
                        {emailError && <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '8px', margin: 0 }}>{emailError}</p>}
                      </div>

                      <div className="studio-input-group">
                        <label className="studio-label">Contact Number *</label>
                        <div style={{ display: 'flex', width: '100%' }}>
                          <span style={{ backgroundColor: '#f8f8f8', color: '#1a1a1a', padding: '16px 20px', fontSize: '15px', border: '1px solid #e0e0e0', borderRight: 'none', fontWeight: '500', borderRadius: '4px 0 0 4px', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>IN +91</span>
                          <input required name="contact_number" value={formData.contact_number} onChange={handleChange} placeholder="9876543210" className="studio-input" style={{ borderRadius: '0 4px 4px 0', minWidth: 0, flex: 1 }} />
                        </div>
                      </div>

                      <div className="studio-input-group">
                        <label className="studio-label">Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} className="studio-input" style={{ appearance: 'none', cursor: 'pointer' }}>
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="studio-input-group">
                        <label className="studio-label">Birthday</label>
                        <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} className="studio-input" style={{ cursor: 'pointer' }} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '40px', paddingBottom: '16px', borderBottom: '1px solid #000', display: 'inline-block' }}>
                      02. Interest & Location
                    </h3>

                    <div className="studio-grid" style={{ marginBottom: '40px' }}>
                      <div className="studio-input-group">
                        <label className="studio-label">Branch Name *</label>
                        <select required name="branch_name" value={formData.branch_name} onChange={handleChange} className="studio-input" style={{ appearance: 'none', cursor: 'pointer' }}>
                          <option value="">Select branch</option>
                          <option value="Goregaon">Goregaon</option>
                          <option value="Andheri">Andheri</option>
                          <option value="Malad">Malad</option>
                        </select>
                      </div>
                      <div className="studio-input-group">
                        <label className="studio-label">Interested In *</label>
                        <select required name="interested_in" value={formData.interested_in} onChange={handleChange} className="studio-input" style={{ appearance: 'none', cursor: 'pointer' }}>
                          <option value="">Select interest / program</option>
                          <option value="Pilates">Pilates</option>
                          <option value="Bootcamp">Bootcamp</option>
                          <option value="Personal Training">Personal Training</option>
                        </select>
                      </div>

                      <div className="studio-input-group">
                        <label className="studio-label">
                          Pincode <span style={{ fontSize: '11px', color: '#888', fontWeight: 'normal', textTransform: 'none' }}>(Auto-fill)</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                          <input
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            placeholder="e.g. 400001"
                            maxLength={6}
                            className="studio-input"
                            style={{ borderColor: pincodeError ? '#ef4444' : '#e0e0e0' }}
                          />
                          {pincodeLoading && (
                            <span style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#888' }}>
                              Fetching...
                            </span>
                          )}
                        </div>
                        {pincodeError && <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px', margin: 0 }}>{pincodeError}</p>}
                      </div>

                      <div className="studio-input-group">
                        <label className="studio-label">Country</label>
                        <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="studio-input" readOnly style={{ backgroundColor: '#f8f8f8', cursor: 'default' }} />
                      </div>

                      <div className="studio-input-group">
                        <label className="studio-label">State</label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="studio-input"
                          style={{ appearance: 'none', cursor: 'pointer' }}
                        >
                          <option value="">Select state</option>
                          {indianStates.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="studio-input-group">
                        <label className="studio-label">City / Area</label>
                        <input
                          name="location_area"
                          value={formData.location_area}
                          onChange={handleChange}
                          placeholder="e.g. Bandra West, Mumbai"
                          className="studio-input"
                        />
                      </div>
                    </div>

                    <div className="studio-input-group" style={{ marginBottom: '20px' }}>
                      <label className="studio-label">Primary Goal</label>
                      <input name="goal" value={formData.goal} onChange={handleChange} placeholder="e.g. Weight loss, tone core, improve mobility" className="studio-input" />
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                      {goalsList.map((g) => {
                        const isSelected = formData.goal.includes(g);
                        return (
                          <button
                            key={g}
                            type="button"
                            onClick={() => handleGoalToggle(g)}
                            style={{
                              padding: '12px 20px',
                              fontSize: '13px',
                              letterSpacing: '0.05em',
                              fontWeight: '500',
                              cursor: 'pointer',
                              border: '1px solid transparent',
                              borderRadius: '4px',
                              transition: 'all 0.2s',
                              backgroundColor: isSelected ? '#000' : '#f8f8f8',
                              color: isSelected ? '#fff' : '#666',
                            }}
                          >
                            {g}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {error && (
                    <div style={{ padding: '24px', backgroundColor: '#fef2f2', color: '#ef4444', fontSize: '14px', fontWeight: '500', border: '1px solid #fee2e2', borderRadius: '4px' }}>
                      {error}
                    </div>
                  )}
                </div>

                <div className="studio-modal-footer">
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: '#000',
                      color: '#fff',
                      padding: '20px 40px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      border: 'none',
                      borderRadius: '4px',
                      opacity: loading ? 0.5 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '240px',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                      />
                    ) : (
                      'SUBMIT REQUEST'
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default StudioVisitModal;
