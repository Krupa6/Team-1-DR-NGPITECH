import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import Card from '../components/Card';
import Stepper from '../components/Stepper';

const Assessment = () => {
  const [activeTab, setActiveTab] = useState('aptitude');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({
    aptitude: { logic: 0, quant: 0, problem: 0 },
    programming: { python: 0, java: 0, c: 0 },
    careerSpecific: { score: 0 },
  });

  const mcqs = {
    aptitude: [
      {
        key: 'logic',
        question: 'If 2 + 2 = 4, then 2 + 2 + 2 = ?',
        options: [
          { text: '5', points: 0 },
          { text: '6', points: 1 },
          { text: '7', points: 0 },
          { text: '8', points: 0 },
        ],
      },
      {
        key: 'quant',
        question: 'What is 25% of 200?',
        options: [
          { text: '25', points: 0 },
          { text: '50', points: 1 },
          { text: '75', points: 0 },
          { text: '100', points: 0 },
        ],
      },
      {
        key: 'problem',
        question: 'Solve: x + 5 = 12, find x',
        options: [
          { text: '5', points: 0 },
          { text: '7', points: 1 },
          { text: '8', points: 0 },
          { text: '10', points: 0 },
        ],
      },
    ],
    programming: [
      {
        key: 'python',
        question: 'What is the output of print(2 ** 3)?',
        options: [
          { text: '5', points: 0 },
          { text: '6', points: 0 },
          { text: '8', points: 1 },
          { text: '9', points: 0 },
        ],
      },
      {
        key: 'java',
        question: 'Which is the correct syntax to declare a variable in Java?',
        options: [
          { text: 'var x = 5', points: 0 },
          { text: 'int x = 5;', points: 1 },
          { text: 'x = 5', points: 0 },
          { text: 'define x = 5', points: 0 },
        ],
      },
      {
        key: 'c',
        question: 'What is the size of int in C (typically)?',
        options: [
          { text: '2 bytes', points: 0 },
          { text: '4 bytes', points: 1 },
          { text: '8 bytes', points: 0 },
          { text: '1 byte', points: 0 },
        ],
      },
    ],
    careerSpecific: [
      {
        key: 'score',
        question: 'Rate your overall interest in your chosen career (1-100)',
        options: [
          { text: 'Very Low (0-25)', points: 0 },
          { text: 'Low (25-50)', points: 1 },
          { text: 'Medium (50-75)', points: 2 },
          { text: 'Very High (75-100)', points: 3 },
        ],
      },
    ],
  };

  const handleSelectAnswer = (tabName, questionKey, points) => {
    setAnswers({
      ...answers,
      [tabName]: {
        ...answers[tabName],
        [questionKey]: points * 25, // Scale to 100
      },
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      await axiosInstance.post('/assessment/submit', answers);
      navigate('/portfolio');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit assessment');
      setLoading(false);
    }
  };

  const renderTab = (tabName) => {
    const questions = mcqs[tabName];
    return (
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-800 mb-4 text-lg">
              {idx + 1}. {q.question}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {q.options.map((option, optIdx) => (
                <button
                  key={optIdx}
                  onClick={() => handleSelectAnswer(tabName, q.key, option.points)}
                  className={`p-3 rounded border-2 transition ${
                    answers[tabName][q.key] === option.points * 25
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Stepper steps={["Login", "Assessment", "Career Goal", "Portfolio", "Analyze"]} active={1} />

        <Card title="Career Assessment">
          <h2 className="text-2xl text-gray-700 mb-2">Answer a few short questions</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        <div className="flex gap-2 mb-8 bg-white p-2 rounded-lg shadow">
          {['aptitude', 'programming', 'careerSpecific'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded font-semibold transition ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab === 'aptitude' && '📐 Aptitude'}
              {tab === 'programming' && '💻 Programming'}
              {tab === 'careerSpecific' && '🎯 Career'}
            </button>
          ))}
        </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">{renderTab(activeTab)}</div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-primary hover:opacity-95 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition text-lg"
          >
            {loading ? 'Submitting...' : 'Submit Assessment'}
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;
