import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User as UserIcon, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await login(username, password);
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#f9fafb', margin: 0, padding: 0 }}>
      {/* Left Side - Image/Branding */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', backgroundColor: '#111' }} className="hidden md:flex">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4 }} />
        <div style={{ position: 'relative', zIndex: 10, color: 'white', maxWidth: '32rem' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '3.5rem', fontWeight: 700, fontFamily: 'var(--font-serif)', letterSpacing: '0.05em', lineHeight: 1.1, marginBottom: '1.5rem' }}
          >
            SWEAT FIT<br/>CONTROL
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}
          >
            Secure superuser access. Manage your site's content, classes, and frequently asked questions dynamically in real-time.
          </motion.p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: 'white' }}>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: '24rem' }}
        >
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>Welcome Back</h2>
            <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>Please enter your admin credentials to continue.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1.5rem', border: '1px solid #f87171' }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Username Input */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Username
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', left: '16px', color: '#9ca3af', display: 'flex' }}>
                  <UserIcon size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin_username"
                  required
                  style={{
                    width: '100%', padding: '14px 16px 14px 48px',
                    borderRadius: '12px', border: '1px solid #e5e7eb',
                    backgroundColor: '#f9fafb', fontSize: '1rem', color: '#111',
                    outline: 'none', transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#111'; e.target.style.backgroundColor = 'white'; e.target.style.boxShadow = '0 0 0 4px rgba(0,0,0,0.05)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#e5e7eb'; e.target.style.backgroundColor = '#f9fafb'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', left: '16px', color: '#9ca3af', display: 'flex' }}>
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%', padding: '14px 16px 14px 48px',
                    borderRadius: '12px', border: '1px solid #e5e7eb',
                    backgroundColor: '#f9fafb', fontSize: '1rem', color: '#111',
                    outline: 'none', transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#111'; e.target.style.backgroundColor = 'white'; e.target.style.boxShadow = '0 0 0 4px rgba(0,0,0,0.05)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#e5e7eb'; e.target.style.backgroundColor = '#f9fafb'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              style={{
                width: '100%', padding: '16px', marginTop: '1rem',
                backgroundColor: loading ? '#9ca3af' : '#111', color: 'white',
                border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
                transition: 'background-color 0.2s ease', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In Securely'}
              {!loading && <ArrowRight size={18} />}
            </motion.button>

          </form>
        </motion.div>
      </div>
    </div>
  );
}
