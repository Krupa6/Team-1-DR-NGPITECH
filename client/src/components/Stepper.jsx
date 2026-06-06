import React from 'react';

const Stepper = ({ steps = [], active = 0 }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      {steps.map((s, idx) => (
        <div key={s} className="flex items-center gap-3">
          <div className={`rounded-full w-8 h-8 flex items-center justify-center ${idx <= active ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
            {idx + 1}
          </div>
          <div className={`hidden md:block ${idx <= active ? 'text-gray-800 font-semibold' : 'text-gray-500'}`}>{s}</div>
          {idx < steps.length - 1 && <div className="w-8 h-0.5 bg-gray-200 mx-2" />}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
