import React from 'react';

const RoadmapCard = ({ phase }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-600">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{phase.phase}</h3>
          <p className="text-sm text-gray-600">{phase.duration}</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Tasks:</h4>
        <ul className="space-y-2">
          {phase.tasks?.map((task, idx) => (
            <li key={idx} className="flex items-start gap-2 text-gray-600">
              <span className="text-indigo-600 font-bold mt-1">•</span>
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Resources:</h4>
        <ul className="space-y-2">
          {phase.resources?.map((resource, idx) => (
            <li key={idx} className="flex items-start gap-2 text-gray-600">
              <span className="text-green-600 font-bold mt-1">→</span>
              <span>{resource}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoadmapCard;
