
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  isDarkMode: boolean;
  className?: string;
  onNavigate?: (screen: number) => void;
}

const Logo = ({ isDarkMode, className = "h-full w-full object-contain", onNavigate }: LogoProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  // Preload both images on component mount
  useEffect(() => {
    const preloadImages = () => {
      const lightImage = new Image();
      const darkImage = new Image();
      
      lightImage.src = '/lovable-uploads/FullLightMode.png';
      darkImage.src = '/lovable-uploads/logo.png';
      
      Promise.all([
        new Promise((resolve) => {
          lightImage.onload = resolve;
          lightImage.onerror = resolve;
        }),
        new Promise((resolve) => {
          darkImage.onload = resolve;
          darkImage.onerror = resolve;
        })
      ]).then(() => {
        setIsLoaded(true);
      });
    };

    preloadImages();
  }, []);

  const currentSrc = isDarkMode ? '/lovable-uploads/logo.png' : '/lovable-uploads/FullLightMode.png';

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  if (hasError) {
    return (
      <div 
        className={`${className} flex items-center justify-center bg-fpYellow text-black font-bold text-lg cursor-pointer`}
        onClick={handleLogoClick}
      >
        FinancialPress
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt="FinancialPress Logo"
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200 cursor-pointer`}
      loading="eager"
      onLoad={handleImageLoad}
      onError={handleImageError}
      onClick={handleLogoClick}
      style={{ transition: 'opacity 0.2s' }}
    />
  );
};

export default Logo;
