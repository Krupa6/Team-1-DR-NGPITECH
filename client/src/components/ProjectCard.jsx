import React from 'react';

const ProjectCard = ({ project }) => {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-800 flex-1">{project.title}</h3>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-2 ${
            difficultyColors[project.difficulty] ||
            difficultyColors['Medium']
          }`}
        >
          {project.difficulty}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{project.description}</p>

      <div className="flex gap-2">
        <a
          href="#"
          className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition"
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
