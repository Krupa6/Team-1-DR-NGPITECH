import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';

const Analyzing = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const analyze = async () => {
      try {
        await axiosInstance.post('/ai/analyze');
        setTimeout(() => navigate('/dashboard'), 3000);
      } catch (err) {
        setError(err.response?.data?.error || 'Analysis failed');
        setTimeout(() => navigate('/dashboard'), 3000);
      }
    };

    analyze();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="animate-spin mb-8">
          <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Analyzing Your Profile...
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Our AI is evaluating your skills and generating your personalized roadmap
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8 max-w-md mx-auto">
            {error}
          </div>
        )}

        <div className="flex gap-2 justify-center mb-8">
          <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce delay-200"></div>
        </div>

        <p className="text-gray-500">This usually takes a few seconds...</p>
      </div>
    </div>
  );
};

export default Analyzing;
