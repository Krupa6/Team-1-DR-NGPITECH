require('dotenv').config();
const { sequelize, Mentor } = require('./models');

const seedMentors = async () => {
  try {
    // Sync database
    await sequelize.sync();
    console.log('✅ Database synced');

    // Clear existing mentors
    await Mentor.model.destroy({ where: {} });

    const mentors = [
      {
        name: 'Dr. Rajesh Kumar',
        expertise: ['ML', 'Deep Learning', 'LLM'],
        bio: 'ML Engineer with 10+ years of experience building AI systems at tech giants',
        careerTrack: 'AI Engineer',
        email: 'rajesh.kumar@example.com',
        phone: '+91-9876543210',
      },
      {
        name: 'Prof. Ananya Sharma',
        expertise: ['Statistics', 'SQL', 'Tableau'],
        bio: 'Data Science expert specializing in business analytics and predictive modeling',
        careerTrack: 'Data Scientist',
        email: 'ananya.sharma@example.com',
        phone: '+91-9876543211',
      },
      {
        name: 'Arjun Singh',
        expertise: ['AWS', 'Docker', 'Kubernetes'],
        bio: 'Cloud architect with expertise in building scalable cloud solutions on AWS',
        careerTrack: 'Cloud Engineer',
        email: 'arjun.singh@example.com',
        phone: '+91-9876543212',
      },
      {
        name: 'Dr. Priya Verma',
        expertise: ['Deep Learning', 'LLM', 'NLP'],
        bio: 'AI Research Scientist specializing in natural language processing',
        careerTrack: 'AI Engineer',
        email: 'priya.verma@example.com',
        phone: '+91-9876543213',
      },
      {
        name: 'Vikram Patel',
        expertise: ['AWS', 'Linux', 'Networking'],
        bio: 'Infrastructure specialist with deep expertise in cloud networking',
        careerTrack: 'Cloud Engineer',
        email: 'vikram.patel@example.com',
        phone: '+91-9876543214',
      },
      {
        name: 'Deepa Nair',
        expertise: ['Statistics', 'Tableau', 'SQL'],
        bio: 'Data visualization expert helping companies make data-driven decisions',
        careerTrack: 'Data Scientist',
        email: 'deepa.nair@example.com',
        phone: '+91-9876543215',
      },
    ];

    const savedMentors = await Mentor.model.bulkCreate(mentors);
    console.log(`✅ Seeded ${savedMentors.length} mentors successfully!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedMentors();
