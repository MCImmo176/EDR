'use client';

import React from 'react';
import Image from 'next/image';
import SnakeRectangleAnimation from '../../components/SnakeRectangleAnimation';

const ContactPage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/contact/Salon.png"
          alt="Salon de la villa"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="w-full h-full">
          <SnakeRectangleAnimation 
            textLine1="Contactez-nous pour votre séjour"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 