
import React, { useState, useEffect } from 'react';

interface LogoProps {
  isDarkMode: boolean;
  className?: string;
}

const Logo = ({ isDarkMode, className = "h-full w-full object-contain" }: LogoProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

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

  if (hasError) {
    return (
      <div className={`${className} flex items-center justify-center bg-fpYellow text-black font-bold text-lg`}>
        FinancialPress
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt="FinancialPress Logo"
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
      loading="eager"
      onLoad={handleImageLoad}
      onError={handleImageError}
    />
  );
};

export default Logo;
