const {
  Student,
  Goal,
  Assessment,
  Portfolio,
  SkillProfile,
  Assignment,
} = require('../models');

const getDashboard = async (req, res) => {
  try {
    const studentId = req.studentId;

    const student = await Student.model.findByPk(studentId);
    const goal = await Goal.model.findOne({ where: { studentId } });
    const assessment = await Assessment.model.findOne({
      where: { studentId },
      order: [['createdAt', 'DESC']],
    });
    const portfolio = await Portfolio.model.findOne({ where: { studentId } });
    const skillProfile = await SkillProfile.model.findOne({ where: { studentId } });
    const assignment = await Assignment.model.findOne({ where: { studentId } });

    res.status(200).json({
      student,
      goal,
      assessment,
      portfolio,
      skillProfile,
      mentor: assignment?.mentorId || null,
    });
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard' });
  }
};

module.exports = { getDashboard };
