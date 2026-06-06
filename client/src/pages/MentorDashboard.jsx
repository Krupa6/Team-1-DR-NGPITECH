import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import MentorCard from '../components/MentorCard';
import axiosInstance from '../api/axios';

const MentorDashboard = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [mentorStudents, setMentorStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      // Try to get mentors for the user's career goal
      const student = JSON.parse(localStorage.getItem('student') || '{}');
      const response = await axiosInstance.get(
        `/mentor/AI Engineer`
      );
      setMentors(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch mentors');
    }
  };

  const handleSelectMentor = async (mentor) => {
    setSelectedMentor(mentor);
    setLoading(true);
    try {
      // Try to fetch mentor's students
      const response = await axiosInstance.get(
        `/mentor/dashboard/${mentor._id}`
      );
      setMentorStudents(response.data.students || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch mentor details');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignMentor = async (mentor) => {
    try {
      await axiosInstance.post('/mentor/assign', { mentorId: mentor._id });
      alert('Mentor assigned successfully!');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to assign mentor');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar student={JSON.parse(localStorage.getItem('student') || '{}')} />

      <div className="max-w-7xl mx-auto px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Mentor Network</h1>
        <p className="text-gray-600 mb-8">
          Connect with experienced mentors in your field
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mentors List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Available Mentors
              </h2>
              <div className="space-y-4">
                {mentors.map((mentor) => (
                  <div
                    key={mentor._id}
                    className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-indigo-50 transition"
                    onClick={() => handleSelectMentor(mentor)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {mentor.name}
                        </h3>
                        <p className="text-gray-600 text-sm">{mentor.careerTrack}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {mentor.expertise?.map((exp, idx) => (
                            <span
                              key={idx}
                              className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs"
                            >
                              {exp}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm mt-2">{mentor.bio}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAssignMentor(mentor);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition"
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mentor Details */}
          <div>
            {selectedMentor ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {selectedMentor.name}
                </h2>
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">
                    <strong>Career Track:</strong> {selectedMentor.careerTrack}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Email:</strong> {selectedMentor.email || 'N/A'}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Phone:</strong> {selectedMentor.phone || 'N/A'}
                  </p>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto"></div>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-gray-800 mb-4">
                      Assigned Students ({mentorStudents.length})
                    </h3>
                    <div className="space-y-3">
                      {mentorStudents.map((student, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded">
                          <p className="font-semibold text-gray-800">
                            {student.student.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Level: <span className="font-semibold">{student.level}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-600">
                Select a mentor to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
