    'use client'
    import React from 'react';

    const Premium = ({ premium }) => {
      return (
        <div className={`inline-flex items-center md:mb-2 text-sm p-1 bg-black rounded-lg lg:mb-0 ${premium ? 'text-red-500' : 'text-white'}`}>
          {premium ? 'Members Only $' : 'Free'}
        </div>
      );
    };
    
    export default Premium;
    