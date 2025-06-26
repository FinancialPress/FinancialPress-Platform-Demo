
import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'default' | 'wide' | 'full';
}

const PageWrapper = ({ 
  children, 
  className = '', 
  maxWidth = 'default' 
}: PageWrapperProps) => {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'wide':
        return 'max-w-[1440px]';
      case 'full':
        return 'max-w-full';
      default:
        return 'max-w-[1350px]';
    }
  };

  return (
    <div className={`${getMaxWidthClass()} mx-auto px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
};

export default PageWrapper;
