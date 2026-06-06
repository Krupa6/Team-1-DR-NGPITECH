import React from 'react';

const MentorCard = ({ mentor }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-4">
        <div className="text-5xl mb-3">👨‍💼</div>
        <h3 className="text-2xl font-bold text-gray-800">{mentor.name}</h3>
        <p className="text-indigo-600 font-semibold">{mentor.careerTrack}</p>
      </div>

      <p className="text-gray-600 text-center mb-6">{mentor.bio}</p>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">Expertise:</h4>
        <div className="flex flex-wrap gap-2">
          {mentor.expertise?.map((exp, idx) => (
            <span
              key={idx}
              className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full"
            >
              {exp}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {mentor.email && (
          <a
            href={`mailto:${mentor.email}`}
            className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition"
          >
            📧 Email Mentor
          </a>
        )}
        {mentor.phone && (
          <a
            href={`tel:${mentor.phone}`}
            className="block text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
          >
            📞 Call Mentor
          </a>
        )}
      </div>
    </div>
  );
};

export default MentorCard;
