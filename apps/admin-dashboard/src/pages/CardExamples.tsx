import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import StatCards from '../components/dashboard/StatCards';

const CardExamples = () => {
  const [viewportSize, setViewportSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const renderViewportSimulator = () => {
    switch (viewportSize) {
      case 'mobile':
        return (
          <div className="mx-auto bg-white p-3 rounded-3 shadow-sm border border-gray-200" style={{ maxWidth: '320px' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="bg-secondary rounded-pill" style={{ width: '64px', height: '8px' }}></div>
              <div className="d-flex gap-1">
                <div className="rounded-circle bg-secondary" style={{ width: '8px', height: '8px' }}></div>
                <div className="rounded-circle bg-secondary" style={{ width: '8px', height: '8px' }}></div>
                <div className="rounded-circle bg-secondary" style={{ width: '8px', height: '8px' }}></div>
              </div>
            </div>
            <div className="mb-4" style={{ height: '32px' }}></div>
            <StatCards />
          </div>
        );
      case 'tablet':
        return (
          <div className="mx-auto bg-white p-4 rounded-3 shadow-sm border border-gray-200" style={{ maxWidth: '576px' }}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="bg-secondary rounded-pill" style={{ width: '96px', height: '12px' }}></div>
              <div className="d-flex gap-1">
                <div className="rounded-circle bg-secondary" style={{ width: '12px', height: '12px' }}></div>
                <div className="rounded-circle bg-secondary" style={{ width: '12px', height: '12px' }}></div>
                <div className="rounded-circle bg-secondary" style={{ width: '12px', height: '12px' }}></div>
              </div>
            </div>
            <div className="mb-4" style={{ height: '40px' }}></div>
            <StatCards />
          </div>
        );
      case 'desktop':
      default:
        return (
          <div className="mx-auto bg-white p-4 p-md-5 rounded-3 shadow-sm border border-gray-200" style={{ maxWidth: '1140px' }}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="bg-secondary rounded-pill" style={{ width: '128px', height: '16px' }}></div>
              <div className="d-flex gap-2">
                <div className="rounded-circle bg-secondary" style={{ width: '16px', height: '16px' }}></div>
                <div className="rounded-circle bg-secondary" style={{ width: '16px', height: '16px' }}></div>
                <div className="rounded-circle bg-secondary" style={{ width: '16px', height: '16px' }}></div>
              </div>
            </div>
            <div className="mb-5" style={{ height: '48px' }}></div>
            <StatCards />
          </div>
        );
    }
  };

  return (
    <MainLayout>
      <div className="mb-5">
        <div>
          <h1 className="fs-2 fw-bold text-primary mb-3">Responsive Stat Cards</h1>
          <p className="text-muted mb-4">
            This example shows the stat cards component in different viewport sizes. The cards automatically adjust from 1 column on mobile, 2 columns on tablets, to 4 columns on desktop screens.
          </p>
          
          <div className="d-flex justify-content-center mb-4 gap-2">
            <button 
              onClick={() => setViewportSize('mobile')}
              className={`btn ${
                viewportSize === 'mobile' 
                  ? 'btn-primary' 
                  : 'btn-light'
              }`}
            >
              Mobile View
            </button>
            <button 
              onClick={() => setViewportSize('tablet')}
              className={`btn ${
                viewportSize === 'tablet' 
                  ? 'btn-primary' 
                  : 'btn-light'
              }`}
            >
              Tablet View
            </button>
            <button 
              onClick={() => setViewportSize('desktop')}
              className={`btn ${
                viewportSize === 'desktop' 
                  ? 'btn-primary' 
                  : 'btn-light'
              }`}
            >
              Desktop View
            </button>
          </div>
        </div>
        
        {renderViewportSimulator()}
        
        <div className="mt-5 p-4 bg-light rounded-3">
          <h2 className="fs-4 fw-bold mb-3">Implementation Details</h2>
          <div className="d-flex flex-column gap-4">
            <div>
              <h3 className="fw-medium text-primary">Responsive Grid Layout</h3>
              <p className="text-muted">The card layout uses Bootstrap's grid system with responsive breakpoints:</p>
              <pre className="mt-2 p-3 bg-dark text-white rounded-3 overflow-auto small">
                {`<div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 g-xl-4">
  {/* Card components */}
</div>`}
              </pre>
            </div>
            
            <div>
              <h3 className="fw-medium text-primary">Card Component</h3>
              <p className="text-muted">Each card uses Bootstrap's card component with custom theme styles:</p>
              <pre className="mt-2 p-3 bg-dark text-white rounded-3 overflow-auto small">
                {`<div className="card h-100 hover:shadow-soft-lg transition-all duration-300">
  <div className="card-body p-3 p-md-4">
    {/* Card content */}
  </div>
</div>`}
              </pre>
            </div>
            
            <div>
              <h3 className="fw-medium text-primary">Animated Counters</h3>
              <p className="text-muted">The numbers animate using a custom AnimatedCounter component with an easing function for smooth transitions.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CardExamples; 