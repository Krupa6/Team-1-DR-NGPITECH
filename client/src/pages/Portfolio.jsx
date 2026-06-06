import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import Card from '../components/Card';
import Stepper from '../components/Stepper';

const Portfolio = () => {
  const [projects, setProjects] = useState([
    { title: '', description: '', techStack: '', githubLink: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleProjectChange = (idx, field, value) => {
    const newProjects = [...projects];
    if (field === 'techStack') {
      newProjects[idx][field] = value.split(',').map((t) => t.trim());
    } else {
      newProjects[idx][field] = value;
    }
    setProjects(newProjects);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { title: '', description: '', techStack: '', githubLink: '' },
    ]);
  };

  const removeProject = (idx) => {
    setProjects(projects.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    setError('');

    const validProjects = projects.filter((p) => p.title.trim());

    if (validProjects.length === 0) {
      setError('Please add at least one project');
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.post('/portfolio/upload', { projects: validProjects });
      navigate('/analyzing');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload portfolio');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Stepper steps={["Login", "Assessment", "Career Goal", "Portfolio", "Analyze"]} active={3} />

        <Card title="Your Portfolio">
          <p className="text-gray-600 text-center mb-6">Add your projects and GitHub links</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

          <div className="space-y-6 mb-8">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Project {idx + 1}</h3>
                  {projects.length > 1 && (
                    <button onClick={() => removeProject(idx)} className="text-red-500 hover:text-red-700 font-semibold">Remove</button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Project Title</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., House Price Prediction"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea value={project.description} onChange={(e) => handleProjectChange(idx, 'description', e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Describe your project" rows="3" />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Tech Stack (comma-separated)</label>
                    <input type="text" value={Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack} onChange={(e) => handleProjectChange(idx, 'techStack', e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Python, TensorFlow, Pandas" />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">GitHub Link</label>
                    <input type="url" value={project.githubLink} onChange={(e) => handleProjectChange(idx, 'githubLink', e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="https://github.com/username/repo" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={addProject} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded mb-6 transition">+ Add Another Project</button>

          <div className="flex gap-4">
            <button onClick={() => navigate('/dashboard')} className="flex-1 bg-white text-gray-700 border border-gray-200 py-3 rounded">Skip Upload</button>
            <button onClick={handleSubmit} disabled={loading} className="flex-1 bg-primary text-white py-3 rounded-lg">{loading ? 'Uploading...' : 'Continue to Analysis'}</button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;
