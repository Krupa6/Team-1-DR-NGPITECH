import React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';

const Navbar = ({ student }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    navigate('/login');
  };

  return (
    <header style={{backdropFilter: 'blur(8px)'}} className="sticky top-0 z-40 bg-gradient-to-r from-white/70 to-white/50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="text-3xl">🎓</div>
          <div>
            <div className="text-lg font-display text-gray-800">AI Future Campus</div>
            <div className="text-xs text-gray-500">Personalized learning & mentorship</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="p-2 rounded-md hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z" />
            </svg>
          </button>

          {student && (
            <div className="flex items-center gap-3">
              <div className="text-right mr-2">
                <div className="text-sm font-medium text-gray-800">{student.name}</div>
                <div className="text-xs text-gray-500">{student.email}</div>
              </div>
              <Avatar name={student.name} />
            </div>
          )}

          <button onClick={handleLogout} className="ml-4 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-95">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
