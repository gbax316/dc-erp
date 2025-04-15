import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0
}) => {
  console.log("AnimatedCounter rendering with props:", { end, duration, prefix, suffix, decimals });
  
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  countRef.current = count;
  
  // Format the number with commas and decimals
  const formatNumber = (num: number) => {
    try {
      // Format with specified decimal places
      const withDecimals = num.toFixed(decimals);
      
      // Add thousand separators
      const parts = withDecimals.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      
      return parts.join('.');
    } catch (error) {
      console.error("Error formatting number:", error);
      return "0";
    }
  };
  
  // Animation function with easing
  const animate = (timestamp: number, startTime: number | null, startValue: number) => {
    if (!startTime) startTime = timestamp;
    const runtime = timestamp - startTime;
    const progress = runtime / duration;
    
    try {
      if (runtime >= duration) {
        setCount(end);
        return;
      }
      
      // Easing function - ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextCount = startValue + (end - startValue) * easedProgress;
      
      setCount(nextCount);
      
      // Continue animation
      requestAnimationFrame((time) => animate(time, startTime, startValue));
    } catch (error) {
      console.error("Animation error:", error);
      setCount(end); // Fallback to end value
    }
  };
  
  useEffect(() => {
    console.log("AnimatedCounter useEffect running");
    try {
      // Start animation
      let startValue = 0;
      
      // Better transition when updating existing values
      if (countRef.current > 0) {
        startValue = countRef.current;
      }
      
      requestAnimationFrame((timestamp) => animate(timestamp, null, startValue));
    } catch (error) {
      console.error("Error in AnimatedCounter effect:", error);
      setCount(end); // Fallback to end value
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, duration]);
  
  try {
    return (
      <span>
        {prefix}{formatNumber(count)}{suffix}
      </span>
    );
  } catch (error) {
    console.error("Error rendering AnimatedCounter:", error);
    return (
      <span>
        {prefix}{formatNumber(end)}{suffix}
      </span>
    );
  }
};

export default AnimatedCounter; 