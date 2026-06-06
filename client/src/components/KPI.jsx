import React from 'react';

const KPI = ({ label, value, unit = '', color = 'primary', className = '' }) => {
  const gradients = {
    primary: 'from-primary to-accent',
    purple: 'from-purple-500 to-indigo-600',
    green: 'from-green-400 to-green-600',
    orange: 'from-yellow-400 to-orange-500',
  };

  const grad = gradients[color] || gradients.primary;

  return (
    <div className={`rounded-xl p-6 text-center text-white bg-gradient-to-br ${grad} shadow-subtle ${className}`}>
      <p className="text-sm opacity-90">{label}</p>
      <p className="text-3xl font-bold mt-2">
        {value}
        {unit && <span className="text-base font-medium ml-2 opacity-90">{unit}</span>}
      </p>
    </div>
  );
};

export default KPI;
