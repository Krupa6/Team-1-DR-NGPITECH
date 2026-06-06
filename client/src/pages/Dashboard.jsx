import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import Navbar from '../components/Navbar';
import SkillBadge from '../components/SkillBadge';
import RoadmapCard from '../components/RoadmapCard';
import ProjectCard from '../components/ProjectCard';
import MentorCard from '../components/MentorCard';
import Card from '../components/Card';
import KPI from '../components/KPI';
import Avatar from '../components/Avatar';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const student = JSON.parse(localStorage.getItem('student') || '{}');
        const response = await axiosInstance.get(
          `/dashboard/${student.id}`
        );
        setDashboardData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load dashboard');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-primary-fade border-t-primary rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-indigo-600 text-white px-6 py-2 rounded font-semibold"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar student={dashboardData?.student} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header with Student Info */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-display text-gray-800 mb-2">
                Welcome, {dashboardData?.student?.name}!
              </h1>
              <p className="text-gray-600 text-lg">Your personalized career roadmap is ready</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary-fade p-3 rounded-lg">
                <p className="text-sm text-gray-600">Career Goal</p>
                <p className="text-xl font-bold text-primary">
                  {dashboardData?.goal?.careerGoal || 'Not Set'}
                </p>
              </div>
              <SkillBadge level={dashboardData?.skillProfile?.level} />
            </div>
          </div>
        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPI label="Total Score" value={`${dashboardData?.assessment?.totalScore || 0}/100`} color="indigo" />
          <KPI label="Level" value={dashboardData?.skillProfile?.level || 'Beginner'} color="purple" />
          <KPI label="Projects" value={dashboardData?.portfolio?.projectCount || 0} color="green" />
          <KPI label="Mentor" value={dashboardData?.mentor ? dashboardData.mentor.name : '—'} color="orange" />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Roadmap Column */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Roadmap</h2>
            <div className="space-y-4">
              {dashboardData?.skillProfile?.aiSummary?.roadmap?.map(
                (phase, idx) => (
                  <RoadmapCard key={idx} phase={phase} />
                )
              )}
            </div>
          </div>

          {/* Mentor Card Column */}
          <div>
            {dashboardData?.mentor ? (
              <MentorCard mentor={dashboardData.mentor} />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <p className="text-gray-600 mb-4">Mentor not assigned yet</p>
                <button
                  onClick={() => navigate('/mentors')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition"
                >
                  Find a Mentor
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Projects */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {dashboardData?.skillProfile?.aiSummary?.recommendedProjects?.map(
              (project, idx) => (
                <ProjectCard key={idx} project={project} />
              )
            )}
          </div>
        </div>

        {/* Your Projects */}
        {dashboardData?.portfolio?.projects && dashboardData.portfolio.projects.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {dashboardData.portfolio.projects.map((project, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack?.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline font-semibold"
                    >
                      View on GitHub →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
