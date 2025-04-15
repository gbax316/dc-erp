import React, { useEffect, useState } from 'react';
import { Users, DollarSign, PiggyBank, Calendar } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

interface StatCardProps {
  title: string;
  value: number;
  valuePrefix?: string;
  valueSuffix?: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  decimals?: number;
}

const StatCard = ({ 
  title, 
  value, 
  valuePrefix = '', 
  valueSuffix = '', 
  description, 
  icon, 
  trend, 
  decimals = 0 
}: StatCardProps) => {
  // Use state to track if component is mounted for animation
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Delay the animation slightly for a staggered effect
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="card h-100 hover:shadow-soft-lg transition-all duration-300">
      <div className="card-body p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="text-sm fw-medium text-gray-600 mb-1">{title}</p>
            <h3 className="fs-4 fw-bold text-primary mb-1">
              {isMounted ? (
                <AnimatedCounter 
                  end={value} 
                  prefix={valuePrefix} 
                  suffix={valueSuffix}
                  decimals={decimals}
                />
              ) : (
                `${valuePrefix}0${valueSuffix}`
              )}
            </h3>
            <p className="text-xs text-gray-500">{description}</p>
            
            {trend && (
              <div className={`d-flex align-items-center mt-2 text-xs fw-medium ${trend.isPositive ? 'text-success' : 'text-danger'}`}>
                <span className="me-1">
                  {trend.isPositive ? '↑' : '↓'}
                </span>
                <span>{trend.value}% from last month</span>
              </div>
            )}
          </div>
          <div className="h-10 w-10 rounded-xl bg-primary-50 d-flex align-items-center justify-content-center text-primary flex-shrink-0">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCards = () => {
  console.log("StatCards component rendering");
  
  const [hasError, setHasError] = useState(false);
  
  try {
    return (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 g-xl-4">
        <div className="col">
          <StatCard
            title="Total Members"
            value={1247}
            description="Active church members"
            icon={<Users size={20} />}
            trend={{ value: 12, isPositive: true }}
          />
        </div>
        
        <div className="col">
          <StatCard
            title="Weekly Offering"
            value={8942}
            valuePrefix="$"
            description="Last 7 days"
            icon={<DollarSign size={20} />}
            trend={{ value: 8, isPositive: true }}
          />
        </div>
        
        <div className="col">
          <StatCard
            title="Monthly Tithes"
            value={24389}
            valuePrefix="$"
            description="Current month"
            icon={<PiggyBank size={20} />}
            trend={{ value: 3, isPositive: false }}
          />
        </div>
        
        <div className="col">
          <StatCard
            title="Upcoming Events"
            value={18}
            description="Next 30 days"
            icon={<Calendar size={20} />}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering StatCards:", error);
    setHasError(true);
    
    return (
      <div className="alert alert-danger">
        <h4>Error rendering statistics</h4>
        <p>There was a problem displaying the statistics. Please refresh the page or contact support.</p>
      </div>
    );
  }
};

export default StatCards; 