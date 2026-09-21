import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Image as ImageIcon, LogOut, Loader2, Plus, Edit2, Trash2, ArrowLeft, Eye, X, MessageCircle, Video, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../../api/auth';
import { fetchSiteContent, fetchClassPrograms, createCMSItem, updateCMSItem, deleteCMSItem } from '../../api/cms';
import api from '../../api/client';
import 'react-quill/dist/quill.snow.css';

const cmsOptions = [
  { group: 'Homepage - Hero', value: 'home_hero_title', label: 'Hero Main Title (Large Text)' },
  { group: 'Homepage - Hero', value: 'home_hero_subtitle', label: 'Hero Subtitle' },
  { group: 'Homepage - Hero', value: 'home_hero_image', label: 'Hero Background Image' },
  { group: 'Homepage - Hero', value: 'home_intro_video', label: 'Intro Animation Video' },
  { group: 'Homepage - Hero', value: 'home_video_section', label: 'Homepage Video Section' },
  { group: 'Homepage - Approach', value: 'home_approach_title', label: 'Approach Section Title' },
  { group: 'Homepage - Approach', value: 'home_approach_text', label: 'Approach Section Text' },
  { group: 'Homepage - Approach', value: 'home_approach_image', label: 'Approach Section Image' },
  { group: 'Homepage - Assessment', value: 'home_assessment_title', label: 'Assessment Section Title' },
  { group: 'Homepage - Assessment', value: 'home_assessment_text', label: 'Assessment Section Text' },
  { group: 'Homepage - Assessment', value: 'home_assessment_image', label: 'Assessment Section Image' },
  { group: 'Homepage - Journey', value: 'home_journey_title', label: 'Journey Section Title' },
  { group: 'Homepage - Journey', value: 'home_journey_text', label: 'Journey Section Text' },
  { group: 'Homepage - Journey', value: 'home_journey_image', label: 'Journey Profile Image' },
  { group: 'Homepage - Coach', value: 'home_coach_title', label: 'Coach Section Title' },
  { group: 'Homepage - Coach', value: 'home_coach_subtitle', label: 'Coach Section Subtitle' },
  { group: 'Homepage - Coach', value: 'home_coach_image', label: 'Coach Section Image' },
  { group: 'Homepage - Progress', value: 'home_progress_title', label: 'Progress Section Title' },
  { group: 'Homepage - Progress', value: 'home_progress_text', label: 'Progress Section Text' },
  { group: 'Homepage - Progress', value: 'home_progress_image_1', label: 'Progress Image (Day 01)' },
  { group: 'Homepage - Progress', value: 'home_progress_image_2', label: 'Progress Image (Day 30)' },
  { group: 'Homepage - Progress', value: 'home_progress_image_3', label: 'Progress Image (Day 60)' },
  { group: 'Homepage - Progress', value: 'home_progress_image_4', label: 'Progress Image (Day 90)' },
  { group: 'Homepage - Longevity', value: 'home_longevity_title', label: 'Longevity Section Title' },
  { group: 'Homepage - Longevity', value: 'home_longevity_text', label: 'Longevity Section Text' },
  { group: 'Homepage - Longevity', value: 'home_longevity_image_1', label: 'Longevity Image 1' },
  { group: 'Homepage - Longevity', value: 'home_longevity_image_2', label: 'Longevity Image 2' },
  { group: 'About Page', value: 'about_mission', label: 'About Us - Mission Statement Text' },
  { group: 'About Page', value: 'about_hero_title', label: 'About Us - Hero Title' },
  { group: 'About Page', value: 'about_hero_image', label: 'About Us - Hero Image' },
  { group: 'Contact Page', value: 'contact_title', label: 'Contact Us - Main Title' },
  { group: 'Contact Page', value: 'contact_subtitle', label: 'Contact Us - Subtitle' },
  { group: 'Contact Page', value: 'contact_address', label: 'Contact Us - Address Text' },
  { group: 'Contact Page', value: 'contact_email', label: 'Contact Us - Email Address' },
  { group: 'Contact Page', value: 'contact_phone', label: 'Contact Us - Phone Number' },
  { group: 'Transformations Page', value: 'transformations_title', label: 'Transformations - Main Title' },
  { group: 'Transformations Page', value: 'transformations_subtitle', label: 'Transformations - Subtitle Text' },
  { group: 'Sweat Pilates', value: 'pilates_hero_title', label: 'Hero Title' },
  { group: 'Sweat Pilates', value: 'pilates_hero_subtitle', label: 'Hero Subtitle' },
  { group: 'Sweat Pilates', value: 'pilates_hero_media', label: 'Hero Background Media' },
  { group: 'Sweat Pilates', value: 'pilates_stretch_title', label: 'Stretch Program Title' },
  { group: 'Sweat Pilates', value: 'pilates_stretch_desc', label: 'Stretch Program Text' },
  { group: 'Sweat Pilates', value: 'pilates_stretch_media', label: 'Stretch Program Media' },
  { group: 'Sweat Pilates', value: 'pilates_total_title', label: 'Total Program Title' },
  { group: 'Sweat Pilates', value: 'pilates_total_desc', label: 'Total Program Text' },
  { group: 'Sweat Pilates', value: 'pilates_total_media', label: 'Total Program Media' },
  { group: 'Sweat Pilates', value: 'pilates_athletic_title', label: 'Athletic Program Title' },
  { group: 'Sweat Pilates', value: 'pilates_athletic_desc', label: 'Athletic Program Text' },
  { group: 'Sweat Pilates', value: 'pilates_athletic_media', label: 'Athletic Program Media' },
  { group: 'Sweat Pilates', value: 'pilates_coaching_title', label: 'Coaching Title' },
  { group: 'Sweat Pilates', value: 'pilates_coaching_desc', label: 'Coaching Text' },
  { group: 'Sweat Pilates', value: 'pilates_coaching_media', label: 'Coaching Media' },
  { group: 'Sweat Pilates', value: 'pilates_journey_title', label: 'Journey Title' },
  { group: 'Sweat Pilates', value: 'pilates_journey_desc', label: 'Journey Text' },
  { group: 'Sweat Pilates', value: 'pilates_journey_media', label: 'Journey Media' },
  
  { group: 'Sweat Bootcamp', value: 'bootcamp_hero_title', label: 'Hero Title' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_hero_subtitle', label: 'Hero Subtitle' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_hero_media', label: 'Hero Background Media' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_aspects_title', label: 'Aspects of Fitness Title' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_aspects_desc', label: 'Aspects of Fitness Text' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_foundation_title', label: 'Foundation Title' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_foundation_desc', label: 'Foundation Text' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_foundation_media', label: 'Foundation Media' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_athletic_title', label: 'Athletic Title' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_athletic_desc', label: 'Athletic Text' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_athletic_media', label: 'Athletic Media' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_dtp_title', label: 'DTP Title' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_dtp_desc', label: 'DTP Text' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_dtp_media', label: 'DTP Media' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_coaching_title', label: 'Coaching Title' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_coaching_desc', label: 'Coaching Text' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_coaching_media', label: 'Coaching Media' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_ecosystem_title', label: 'Ecosystem Title' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_ecosystem_desc', label: 'Ecosystem Text' },
  { group: 'Sweat Bootcamp', value: 'bootcamp_ecosystem_media', label: 'Ecosystem Media' },

  { group: 'Sweat Online', value: 'online_hero_title', label: 'Hero Title' },
  { group: 'Sweat Online', value: 'online_hero_subtitle', label: 'Hero Subtitle' },
  { group: 'Sweat Online', value: 'online_hero_media', label: 'Hero Background Media' },
  { group: 'Sweat Online', value: 'online_problem_title', label: 'Promise Title' },
  { group: 'Sweat Online', value: 'online_problem_desc', label: 'Promise Text' },
  { group: 'Sweat Online', value: 'online_problem_media', label: 'Promise Media' },
  { group: 'Sweat Online', value: 'online_pathways_title', label: 'Pathways Title' },
  { group: 'Sweat Online', value: 'online_pathways_desc', label: 'Pathways Text' },
  { group: 'Sweat Online', value: 'online_pathways_media_1', label: 'Pathways Media 1' },
  { group: 'Sweat Online', value: 'online_pathways_media_2', label: 'Pathways Media 2' },
  { group: 'Sweat Online', value: 'online_pathways_media_3', label: 'Pathways Media 3' },
  { group: 'Sweat Online', value: 'online_pathways_media_4', label: 'Pathways Media 4' },
  { group: 'Sweat Online', value: 'online_process_title', label: 'Process Title' },
  { group: 'Sweat Online', value: 'online_process_desc', label: 'Process Text' },
  { group: 'Sweat Online', value: 'online_app_title', label: 'App Experience Title' },
  { group: 'Sweat Online', value: 'online_app_media', label: 'App Experience Media' },
  { group: 'Shop Page', value: 'shop_hero_title', label: 'Shop - Main Title' },
  { group: 'Shop Page', value: 'shop_promo_text', label: 'Shop - Promo Banner Text' },
  { group: 'Footer', value: 'footer_text', label: 'Footer Description Text' },
  { group: 'Footer', value: 'footer_copyright', label: 'Footer Copyright Text' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('content');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [previewMedia, setPreviewMedia] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState('');
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      let endpoint = '';
      if (activeTab === 'content') endpoint = 'cms/site-content/';
      if (activeTab === 'programs') endpoint = 'cms/class-programs/';
      if (activeTab === 'faqs') endpoint = 'cms/faq-items/';
      if (activeTab === 'inbox') endpoint = 'cms/enquiries/';
      if (activeTab === 'transformations') endpoint = 'cms/transformations/';
      
      // We can still use the base client for dynamic endpoints
      const response = await api.get(endpoint);
      setData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      if (err.response?.status === 401) handleLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setEditingItem(null);
  }, [activeTab]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let endpoint = '';
      if (activeTab === 'content') endpoint = `cms/site-content/${editingItem.key}/`;
      if (activeTab === 'programs') endpoint = `cms/class-programs/${editingItem.id}/`;
      if (activeTab === 'faqs') endpoint = `cms/faq-items/${editingItem.id}/`;
      if (activeTab === 'transformations') endpoint = `cms/transformations/${editingItem.id}/`;

      let payload;
      let isMultipart = false;
      
      if (activeTab === 'content') {
        payload = new FormData();
        payload.append('key', editingItem.key);
        if (editingItem.value) payload.append('value', editingItem.value);
        if (editingItem.file_upload instanceof File) {
          payload.append('file_upload', editingItem.file_upload);
        }
        isMultipart = true;
      } else if (activeTab === 'transformations') {
        payload = new FormData();
        payload.append('title', editingItem.title || '');
        payload.append('description', editingItem.description || '');
        if (editingItem.video_upload instanceof File) {
          payload.append('video_upload', editingItem.video_upload);
        }
        isMultipart = true;
      } else {
        payload = editingItem;
      }

      if (editingItem.isNew) {
        let createEndpoint = endpoint.split('/').slice(0, -2).join('/') + '/';
        await createCMSItem(createEndpoint, payload, isMultipart);
      } else {
        await updateCMSItem(endpoint, payload, isMultipart);
      }
      
      setEditingItem(null);
      fetchData();
    } catch (err) {
      console.error("Error saving data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, key) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    
    setLoading(true);
    try {
      let endpoint = '';
      if (activeTab === 'content') endpoint = `cms/site-content/${key}/`;
      if (activeTab === 'programs') endpoint = `cms/class-programs/${id}/`;
      if (activeTab === 'faqs') endpoint = `cms/faq-items/${id}/`;
      if (activeTab === 'inbox') endpoint = `cms/enquiries/${id}/`;
      if (activeTab === 'transformations') endpoint = `cms/transformations/${id}/`;
      
      await deleteCMSItem(endpoint);
      fetchData();
    } catch (err) {
      console.error("Error deleting data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getPreviewUrl = () => {
    let url = "http://localhost:5173";
    if (activeTab === 'faqs') return url + '/faq';
    if (activeTab === 'transformations') return url + '/transformations';
    if (activeTab === 'content' && editingItem && editingItem.key) {
      const option = cmsOptions.find(o => o.value === editingItem.key);
      if (option) {
        if (option.group.includes('Homepage')) url += '/';
        else if (option.group.includes('About')) url += '/about';
        else if (option.group.includes('Contact')) url += '/contact';
        else if (option.group.includes('Transformations')) url += '/transformations';
        else if (option.group.includes('Sweat Pilates')) url += '/pilates';
        else if (option.group.includes('Sweat Bootcamp')) url += '/bootcamp';
        else if (option.group.includes('Sweat Online')) url += '/online';
        else if (option.group.includes('Shop')) url += '/shop';
        
        const sectionId = editingItem.key.replace(/_(title|subtitle|desc|text|media|image|copyright|address|email|phone).*$/, '');
        url += `#${sectionId}`;
      }
    }
    return url;
  };

  const navItems = [
    { id: 'inbox', icon: <MessageCircle size={20} />, label: 'Inbox (Enquiries)' },
    { id: 'content', icon: <FileText size={20} />, label: 'Site Text & Media' },
    { id: 'transformations', icon: <Video size={20} />, label: 'Transformations' },
    { id: 'programs', icon: <LayoutDashboard size={20} />, label: 'Class Programs' },
    { id: 'faqs', icon: <ImageIcon size={20} />, label: 'FAQs' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '280px', backgroundColor: '#000', color: '#fff', padding: '2rem', display: 'flex', flexDirection: 'column', boxShadow: '4px 0 24px rgba(0,0,0,0.1)', zIndex: 50 }}>
        
        <div style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <img 
            src="/assets/logo_new.png" 
            alt="SWEAT" 
            style={{ height: '36px', width: 'auto', objectFit: 'contain', alignSelf: 'flex-start', filter: 'brightness(0) invert(1)' }} 
          />
          <div style={{ color: '#888', fontSize: '1rem', letterSpacing: '0.25em', fontWeight: 600, fontFamily: 'var(--font-serif)' }}>
            CONTROL
          </div>
        </div>
        
        <nav style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', padding: '12px 16px',
                borderRadius: '8px', cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                backgroundColor: activeTab === item.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: activeTab === item.id ? '#fff' : '#9ca3af',
                fontWeight: activeTab === item.id ? 600 : 400
              }}
              onMouseEnter={(e) => { if(activeTab !== item.id) e.currentTarget.style.color = '#fff' }}
              onMouseLeave={(e) => { if(activeTab !== item.id) e.currentTarget.style.color = '#9ca3af' }}
            >
              {item.icon}
              <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '12px 16px', color: '#9ca3af', border: 'none', background: 'none', cursor: 'pointer', marginTop: 'auto', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#f87171'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
        >
          <LogOut size={20} />
          <span style={{ fontSize: '0.95rem' }}>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flexGrow: 1, padding: '3rem 4rem', overflowY: 'auto', height: '100vh', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#111', textTransform: 'capitalize', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
                Manage {activeTab.replace('-', ' ')}
              </h1>
              <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>Create, update, or remove content across your application.</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => navigate('/')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'transparent', color: '#4b5563', padding: '8px 12px', borderRadius: '8px', border: '1px solid #d1d5db', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f3f4f6'; e.currentTarget.style.color = '#111'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#4b5563'; }}
              >
                <ArrowLeft size={16} /> Back to Website
              </button>

              {!editingItem && activeTab !== 'inbox' && (
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setEditingItem({ isNew: true })}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#111', color: '#fff', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                >
                  <Plus size={18} /> Add New Entry
                </motion.button>
              )}
            </div>
          </header>

          <AnimatePresence mode="wait">
            {loading && !editingItem ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0' }}>
                <Loader2 size={40} color="#111" style={{ animation: 'spin 1s linear infinite' }} />
              </motion.div>
            ) : editingItem ? (
              
              /* Editing Form */
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                    {editingItem.isNew ? 'Create New' : 'Edit'} Entry
                  </h2>
                  <button 
                    onClick={() => setEditingItem(null)} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'none', border: 'none', color: '#6b7280', borderRadius: '50%', cursor: 'pointer', transition: 'background-color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#111'; e.currentTarget.style.backgroundColor = '#f3f4f6'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                    title="Go Back"
                  >
                    <ArrowLeft size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {activeTab === 'content' && (
                    <>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Where does this content belong?</label>
                        <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>Select the specific section of the website you want to update.</p>
                        
                        <div ref={dropdownRef} style={{ position: 'relative', marginBottom: '0.5rem' }}>
                          <button
                            type="button"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            style={{ 
                              width: '100%', padding: '12px 16px', borderRadius: '8px', 
                              border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none', 
                              backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'space-between', 
                              alignItems: 'center', cursor: 'pointer', textAlign: 'left',
                              color: editingItem.key ? '#111' : '#6b7280'
                            }}
                          >
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {editingItem.key === 'custom' 
                                ? 'Custom Key (Advanced)' 
                                : (cmsOptions.find(o => o.value === editingItem.key)?.label || (editingItem.key || '-- Select a Website Section --'))}
                            </span>
                            <ChevronDown size={18} style={{ color: '#9ca3af', flexShrink: 0 }} />
                          </button>

                          <AnimatePresence>
                            {dropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                style={{
                                  position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
                                  backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb',
                                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 50, overflow: 'hidden'
                                }}
                              >
                                <div style={{ padding: '8px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <Search size={16} color="#9ca3af" />
                                  <input 
                                    type="text" 
                                    placeholder="Search sections..." 
                                    value={dropdownSearch}
                                    onChange={(e) => setDropdownSearch(e.target.value)}
                                    autoFocus
                                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.95rem' }}
                                  />
                                </div>
                                <div style={{ maxHeight: '250px', overflowY: 'auto', padding: '4px' }}>
                                  {(() => {
                                    const searchLower = dropdownSearch.toLowerCase();
                                    const filtered = cmsOptions.filter(o => 
                                      o.label.toLowerCase().includes(searchLower) || 
                                      o.group.toLowerCase().includes(searchLower) ||
                                      o.value.toLowerCase().includes(searchLower)
                                    );
                                    
                                    if (filtered.length === 0 && !'custom key (advanced)'.includes(searchLower)) {
                                      return <div style={{ padding: '12px', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>No results found</div>;
                                    }

                                    // Group them
                                    const grouped = filtered.reduce((acc, curr) => {
                                      if (!acc[curr.group]) acc[curr.group] = [];
                                      acc[curr.group].push(curr);
                                      return acc;
                                    }, {});

                                    return (
                                      <>
                                        {Object.entries(grouped).map(([group, options]) => (
                                          <div key={group}>
                                            <div style={{ padding: '8px 12px', fontSize: '0.75rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: '#f9fafb' }}>
                                              {group}
                                            </div>
                                            {options.map(opt => (
                                              <div 
                                                key={opt.value}
                                                onClick={() => {
                                                  setEditingItem({...editingItem, key: opt.value});
                                                  setDropdownOpen(false);
                                                  setDropdownSearch('');
                                                }}
                                                style={{ 
                                                  padding: '10px 12px', fontSize: '0.95rem', cursor: 'pointer', 
                                                  backgroundColor: editingItem.key === opt.value ? '#eff6ff' : 'transparent',
                                                  color: editingItem.key === opt.value ? '#2563eb' : '#111',
                                                  borderRadius: '4px'
                                                }}
                                                onMouseEnter={(e) => { if(editingItem.key !== opt.value) e.currentTarget.style.backgroundColor = '#f3f4f6' }}
                                                onMouseLeave={(e) => { if(editingItem.key !== opt.value) e.currentTarget.style.backgroundColor = 'transparent' }}
                                              >
                                                {opt.label}
                                              </div>
                                            ))}
                                          </div>
                                        ))}
                                        
                                        {('custom key (advanced)'.includes(searchLower)) && (
                                          <div 
                                            onClick={() => {
                                              setEditingItem({...editingItem, key: 'custom'});
                                              setDropdownOpen(false);
                                              setDropdownSearch('');
                                            }}
                                            style={{ 
                                              padding: '10px 12px', fontSize: '0.95rem', cursor: 'pointer',
                                              backgroundColor: editingItem.key === 'custom' ? '#eff6ff' : 'transparent',
                                              color: editingItem.key === 'custom' ? '#2563eb' : '#111',
                                              borderRadius: '4px', borderTop: '1px solid #e5e7eb', marginTop: '4px'
                                            }}
                                            onMouseEnter={(e) => { if(editingItem.key !== 'custom') e.currentTarget.style.backgroundColor = '#f3f4f6' }}
                                            onMouseLeave={(e) => { if(editingItem.key !== 'custom') e.currentTarget.style.backgroundColor = 'transparent' }}
                                          >
                                            Custom Key (Advanced)
                                          </div>
                                        )}
                                      </>
                                    );
                                  })()}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {(editingItem.key === 'custom' || (!cmsOptions.find(o => o.value === editingItem.key) && editingItem.key !== undefined && editingItem.key !== 'custom')) && (
                          <input 
                            type="text" 
                            value={editingItem.key === 'custom' ? '' : editingItem.key} 
                            onChange={e => setEditingItem({...editingItem, key: e.target.value})} 
                            placeholder="Enter custom key (e.g., pricing_text)"
                            required 
                            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', marginTop: '0.5rem' }} 
                          />
                        )}
                      </div>
                      
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.75rem', textTransform: 'uppercase' }}>What type of content are you adding?</label>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.95rem' }}>
                            <input 
                              type="radio" 
                              name="contentType" 
                              checked={!editingItem.file_upload} 
                              onChange={() => setEditingItem({ ...editingItem, file_upload: null })}
                              style={{ width: '16px', height: '16px', accentColor: '#111' }}
                            />
                            📝 Text Content
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.95rem' }}>
                            <input 
                              type="radio" 
                              name="contentType" 
                              checked={!!editingItem.file_upload || editingItem.contentType === 'file'} 
                              onChange={() => setEditingItem({ ...editingItem, contentType: 'file', value: '' })}
                              style={{ width: '16px', height: '16px', accentColor: '#111' }}
                            />
                            🖼️ Image or Video File
                          </label>
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                          <span>{(!editingItem.file_upload && editingItem.contentType !== 'file') ? 'Text Content' : 'Upload File'}</span>
                          { (editingItem.file_upload || (editingItem.value && editingItem.value.match(/^https?:\/\/.+/))) && (
                            <button 
                              type="button" 
                              onClick={() => {
                                let mediaSrc = '';
                                if (editingItem.file_upload instanceof File) {
                                  mediaSrc = URL.createObjectURL(editingItem.file_upload);
                                } else if (editingItem.file_upload) {
                                  mediaSrc = editingItem.file_upload;
                                } else if (editingItem.value && editingItem.value.match(/^https?:\/\/.+/)) {
                                  mediaSrc = editingItem.value;
                                }
                                if (mediaSrc) setPreviewMedia(mediaSrc);
                              }}
                              style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#eff6ff', color: '#2563eb', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
                            >
                              <Eye size={14} /> Preview
                            </button>
                          )}
                        </label>
                        
                        {(!!editingItem.file_upload || editingItem.contentType === 'file') ? (
                          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                            <input 
                              type="file" 
                              accept="image/*,video/*"
                              onChange={e => setEditingItem({...editingItem, file_upload: e.target.files[0], contentType: 'file'})}
                              style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '8px', flex: 1, backgroundColor: '#f9fafb' }}
                            />
                          </div>
                        ) : (
                          <textarea 
                            value={editingItem.value || ''} 
                            onChange={e => setEditingItem({...editingItem, value: e.target.value})} 
                            placeholder="Type your text content here..." 
                            style={{ width: '100%', height: '150px', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }} 
                          />
                        )}
                      </div>
                    </>
                  )}

                  {activeTab === 'programs' && (
                    <>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Program Title</label>
                        <input type="text" value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Category</label>
                        <select value={editingItem.category || 'Pilates'} onChange={e => setEditingItem({...editingItem, category: e.target.value})} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}>
                          <option value="Pilates">Pilates</option>
                          <option value="Bootcamp">Bootcamp</option>
                          <option value="Online">Online</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Description</label>
                        <textarea value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} style={{ width: '100%', height: '250px', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }} />
                      </div>
                    </>
                  )}

                  {activeTab === 'faqs' && (
                    <>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Question</label>
                        <input type="text" value={editingItem.question || ''} onChange={e => setEditingItem({...editingItem, question: e.target.value})} required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Category ID (Temp)</label>
                        <input type="number" value={editingItem.category || 1} onChange={e => setEditingItem({...editingItem, category: e.target.value})} required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Answer</label>
                        <textarea value={editingItem.answer || ''} onChange={e => setEditingItem({...editingItem, answer: e.target.value})} style={{ width: '100%', height: '250px', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }} />
                      </div>
                    </>
                  )}

                  {activeTab === 'transformations' && (
                    <>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Transformation Title</label>
                        <input type="text" value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Upload Video File</label>
                        <input type="file" accept="video/*" onChange={e => setEditingItem({...editingItem, video_upload: e.target.files[0]})} required={editingItem.isNew} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', backgroundColor: '#f9fafb' }} />
                        {editingItem.video_upload && typeof editingItem.video_upload === 'string' && (
                          <p style={{ marginTop: '8px', fontSize: '0.85rem', color: '#059669' }}>Current Video: {editingItem.video_upload.split('/').pop()}</p>
                        )}
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Description (Optional)</label>
                        <textarea value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} style={{ width: '100%', height: '150px', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }} />
                      </div>
                    </>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb', marginTop: '1rem', alignItems: 'center' }}>
                    <button type="button" onClick={() => setIsPreviewOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white', color: '#374151', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
                      <Eye size={18} /> Live Preview
                    </button>
                    <button type="button" onClick={() => setEditingItem(null)} style={{ padding: '12px 24px', backgroundColor: 'transparent', color: '#4b5563', border: '1px solid #d1d5db', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                    <button type="submit" disabled={loading} style={{ padding: '12px 24px', backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </motion.div>
              
            ) : (
              
              /* Data Table */
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #e5e7eb' }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <tr>
                      <th style={{ padding: '16px 24px', fontSize: '0.85rem', fontWeight: 600, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{activeTab === 'inbox' ? 'Sender' : 'Identifier / Title'}</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.85rem', fontWeight: 600, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }} className="hidden md:table-cell">{activeTab === 'inbox' ? 'Message' : 'Preview'}</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.85rem', fontWeight: 600, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: idx !== data.length -1 ? '1px solid #f3f4f6' : 'none', transition: 'background-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <td style={{ padding: '20px 24px', fontWeight: 500, color: '#111' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              {item.first_name ? `${item.first_name} ${item.last_name}` : (item.key || item.title || item.question)}
                              {item.category && <span style={{ padding: '4px 10px', backgroundColor: '#f3f4f6', fontSize: '0.75rem', borderRadius: '99px', color: '#4b5563' }}>{item.category}</span>}
                              {item.subject && <span style={{ padding: '4px 10px', backgroundColor: '#e0e7ff', color: '#4338ca', fontSize: '0.75rem', borderRadius: '99px' }}>{item.subject}</span>}
                            </div>
                            {item.email && <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>{item.email} • {item.contact}</span>}
                          </div>
                        </td>
                        <td style={{ padding: '20px 24px', color: '#6b7280', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className="hidden md:table-cell">
                          <div dangerouslySetInnerHTML={{ __html: item.message || item.value || item.description || item.answer || (item.video_upload ? 'Video File' : '') }} />
                        </td>
                        <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            {activeTab !== 'inbox' && (
                              <button onClick={() => setEditingItem(item)} style={{ padding: '8px', backgroundColor: '#eff6ff', color: '#2563eb', border: 'none', borderRadius: '6px', cursor: 'pointer' }} title="Edit"><Edit2 size={16} /></button>
                            )}
                            <button onClick={() => handleDelete(item.id, item.key)} style={{ padding: '8px', backgroundColor: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer' }} title="Delete"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {data.length === 0 && (
                      <tr>
                        <td colSpan="3" style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.95rem' }}>
                          No content found. Click "Add New Entry" to get started.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Media File Preview Modal */}
      <AnimatePresence>
        {previewMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
            onClick={() => setPreviewMedia(null)}
          >
            <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setPreviewMedia(null)}
                style={{ position: 'absolute', top: '-40px', right: '0', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <X size={32} />
              </button>
              
              {previewMedia.match(/\.(mp4|webm|ogg)$/i) || previewMedia.includes('video') ? (
                <video src={previewMedia} controls autoPlay style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '8px' }} />
              ) : (
                <img src={previewMedia} alt="Preview" style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '8px', objectFit: 'contain' }} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Website Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setIsPreviewOpen(false)}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '1400px', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', backgroundColor: '#111', color: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>LIVE WEBSITE PREVIEW</span>
                </div>
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <X size={24} className="hover:text-white transition-colors" />
                </button>
              </div>
              <iframe 
                src={getPreviewUrl()} 
                title="Live Website Preview" 
                style={{ width: '100%', height: '100%', border: 'none' }} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
