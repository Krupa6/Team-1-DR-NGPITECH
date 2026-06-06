import React from 'react';

const Card = ({ title, children, className = '' }) => {
  return (
    <div
      className={`rounded-xl p-6 ${className}`}
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.60))',
        boxShadow: '0 10px 30px rgba(2,6,23,0.12)',
        border: '1px solid rgba(255,255,255,0.6)',
        backdropFilter: 'blur(8px)'
      }}
    >
      {title && <h3 className="text-lg font-display text-gray-800 mb-3">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
