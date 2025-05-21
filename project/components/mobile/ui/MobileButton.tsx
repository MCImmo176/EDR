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
  const baseStyles = 'w-full py-3 px-6 rounded-lg font-medium transition-all duration-300';
  const variantStyles = {
    primary: 'bg-luxury-gold text-white hover:bg-opacity-90',
    secondary: 'border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white'
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