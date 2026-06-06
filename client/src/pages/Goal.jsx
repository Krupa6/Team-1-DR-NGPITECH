import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import Stepper from '../components/Stepper';
import Card from '../components/Card';

const Goal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const careers = [
    {
      id: 'AI Engineer',
      title: 'AI Engineer',
      icon: '🤖',
      description:
        'Build machine learning models, develop AI applications, and work with neural networks',
      color: 'from-blue-400 to-blue-600',
    },
    {
      id: 'Data Scientist',
      title: 'Data Scientist',
      icon: '📊',
      description:
        'Analyze complex data, create predictive models, and drive data-driven decisions',
      color: 'from-purple-400 to-purple-600',
    },
    {
      id: 'Cloud Engineer',
      title: 'Cloud Engineer',
      icon: '☁️',
      description:
        'Deploy scalable cloud solutions, manage infrastructure, and optimize cloud services',
      color: 'from-green-400 to-green-600',
    },
  ];

  const handleSelectCareer = async (careerGoal) => {
    setLoading(true);
    setError('');

    try {
      await axiosInstance.post('/goal/save', { careerGoal });
      navigate('/assessment');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save career goal');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <Stepper steps={["Login", "Assessment", "Career Goal", "Portfolio", "Analyze"]} active={2} />

        <Card>
          <h1 className="text-4xl font-display text-gray-800 text-center mb-4">
            Choose Your Career Path
          </h1>
          <p className="text-gray-600 text-center mb-8 text-lg">Select the career track that interests you most</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8 text-center">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {careers.map((career) => (
            <div key={career.id} className="overflow-hidden rounded-xl shadow-subtle">
              <div className={`p-6 text-center primary-gradient text-white`}>
                <div className="text-6xl mb-4">{career.icon}</div>
                <h2 className="text-2xl font-bold">{career.title}</h2>
              </div>

              <div className="p-6 bg-white">
                <p className="text-gray-600 mb-6">{career.description}</p>

                <button
                  onClick={() => handleSelectCareer(career.id)}
                  disabled={loading}
                  className="w-full bg-primary hover:opacity-95 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition"
                >
                  {loading ? 'Selecting...' : 'Select Path'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button onClick={() => navigate('/dashboard')} className="text-primary hover:underline font-semibold">Skip to Dashboard</button>
        </div>
        </Card>
      </div>
    </div>
  );
};

export default Goal;
