import React from 'react';

const SkillBadge = ({ level }) => {
  const colors = {
    Beginner: 'bg-green-100 text-green-800 border-green-300',
    Intermediate: 'bg-blue-100 text-blue-800 border-blue-300',
    Advanced: 'bg-purple-100 text-purple-800 border-purple-300',
  };

  const icons = {
    Beginner: '🌱',
    Intermediate: '🚀',
    Advanced: '⭐',
  };

  return (
    <div
      className={`border-2 px-6 py-3 rounded-full font-bold flex items-center gap-2 ${
        colors[level] || colors['Beginner']
      }`}
    >
      <span className="text-2xl">{icons[level] || '🌱'}</span>
      <span>{level || 'Beginner'}</span>
    </div>
  );
};

export default SkillBadge;
