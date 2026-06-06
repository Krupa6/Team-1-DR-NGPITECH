const { Mentor, Assignment, SkillProfile } = require('../models');

const getMentorsByCareerGoal = async (req, res) => {
  try {
    const { careerGoal } = req.params;

    if (!['AI Engineer', 'Data Scientist', 'Cloud Engineer'].includes(careerGoal)) {
      return res.status(400).json({ error: 'Invalid career goal' });
    }

    const mentors = await Mentor.model.findAll({ where: { careerTrack: careerGoal } });

    res.status(200).json(mentors);
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({ error: 'Failed to fetch mentors' });
  }
};

const assignMentor = async (req, res) => {
  try {
    const { mentorId } = req.body;
    const studentId = req.studentId;

    const mentor = await Mentor.model.findByPk(mentorId);
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    let assignment = await Assignment.model.findOne({ where: { studentId } });

    if (assignment) {
      await assignment.update({ mentorId });
    } else {
      assignment = await Assignment.model.create({ studentId, mentorId });
    }

    res.status(200).json({
      message: 'Mentor assigned successfully',
      assignment,
    });
  } catch (error) {
    console.error('Error assigning mentor:', error);
    res.status(500).json({ error: 'Failed to assign mentor' });
  }
};

const getMentorDashboard = async (req, res) => {
  try {
    const { mentorId } = req.params;

    const mentor = await Mentor.model.findByPk(mentorId);
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    const assignments = await Assignment.model.findAll({ where: { mentorId } });

    const studentsData = await Promise.all(
      assignments.map(async (assignment) => {
        const skillProfile = await SkillProfile.model.findOne({
          where: { studentId: assignment.studentId },
        });
        return {
          student: assignment,
          level: skillProfile?.level || 'Beginner',
          sessionNotes: assignment.sessionNotes,
        };
      })
    );

    res.status(200).json({
      mentor,
      students: studentsData,
    });
  } catch (error) {
    console.error('Error fetching mentor dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch mentor dashboard' });
  }
};

module.exports = { getMentorsByCareerGoal, assignMentor, getMentorDashboard };
