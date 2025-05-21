"use client"
import { ButtonHTMLAttributes } from 'react';

interface MobileButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const MobileButton = ({ 
  children, 
  variant = 'primary',
  className = '',
  ...props 
}: MobileButtonProps) => {
  const baseStyles = 'min-w-[44px] min-h-[44px] px-6 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-2 active:scale-95';
  const variantStyles = {
    primary: 'bg-luxury-gold text-white hover:bg-luxury-gold/90',
    secondary: 'border-2 border-luxury-gold text-luxury-gold bg-white hover:bg-luxury-gold hover:text-white'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}; 