'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // For demo purposes, allow login with any credentials
      // In a real app, this would validate with the backend
      if (isLogin) {
        // Demo authentication
        localStorage.setItem('authToken', 'demo-token');
        localStorage.setItem('userName', email.split('@')[0] || 'User');
        router.push('/dashboard');
      } else {
        // Demo registration
        alert('Account created successfully! Please sign in.');
        setIsLogin(true);
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '40px auto', 
      padding: '30px', 
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
      backgroundColor: 'white'
    }}>
      <h1 style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginBottom: '24px',
        textAlign: 'center',
        color: '#0284c7'
      }}>
        {isLogin ? 'Sign in to your account' : 'Create a new account'}
      </h1>

      {error && (
        <div style={{
          padding: '10px 16px',
          backgroundColor: '#fef2f2',
          color: '#b91c1c',
          borderRadius: '4px',
          marginBottom: '16px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div style={{ marginBottom: '16px' }}>
            <label 
              htmlFor="name" 
              style={{ 
                display: 'block', 
                marginBottom: '6px', 
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151'
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                fontSize: '14px'
              }}
              placeholder="Enter your full name"
            />
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
          <label 
            htmlFor="email" 
            style={{ 
              display: 'block', 
              marginBottom: '6px', 
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              fontSize: '14px'
            }}
            placeholder="Enter your email"
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label 
            htmlFor="password" 
            style={{ 
              display: 'block', 
              marginBottom: '6px', 
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              fontSize: '14px'
            }}
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: isLoading ? '#93c5fd' : '#0284c7',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
        </button>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#4b5563' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: 'none',
              border: 'none',
              color: '#0284c7',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>

        {isLogin && (
          <div style={{ 
            marginTop: '12px', 
            textAlign: 'center', 
            fontSize: '14px', 
            color: '#4b5563' 
          }}>
            <p style={{ marginTop: '6px' }}>
              <small>
                <strong>Demo:</strong> admin@dc-erp.com / admin123
              </small>
            </p>
          </div>
        )}
      </form>
    </div>
  );
} 