import React from 'react';

const Avatar = ({ name, src, size = 10, className = '' }) => {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?';

  const px = Math.max(36, size * 4);

  return (
    <div className={`inline-flex items-center justify-center rounded-full ${className}`} style={{ width: px, height: px }}>
      <div style={{
        padding: 4,
        borderRadius: '50%',
        background: 'linear-gradient(90deg,#7c3aed 0%, #06b6d4 100%)'
      }}>
        <div style={{
          width: px - 8,
          height: px - 8,
          borderRadius: '50%',
          background: 'white',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {src ? (
            <img src={src} alt={name || 'avatar'} className="object-cover w-full h-full" />
          ) : (
            <span className="text-primary font-semibold">{initials}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Avatar;
