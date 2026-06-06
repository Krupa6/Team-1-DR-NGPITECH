const { SkillProfile, Assessment, Portfolio, Goal } = require('../models');
const { analyzeWithAI } = require('../utils/aiAnalyzer');

const analyzeStudent = async (req, res) => {
  try {
    const studentId = req.studentId;

    const assessment = await Assessment.model.findOne({
      where: { studentId },
      order: [['createdAt', 'DESC']],
    });
    const portfolio = await Portfolio.model.findOne({ where: { studentId } });
    const goal = await Goal.model.findOne({ where: { studentId } });

    if (!assessment || !goal) {
      return res.status(400).json({
        error: 'Please complete assessment and set career goal first',
      });
    }

    const payload = {
      careerGoal: goal.careerGoal,
      aptitudeScore: Math.round(
        ((assessment.aptitudeLogic +
          assessment.aptitudeQuant +
          assessment.aptitudeProblem) /
          300) *
          100
      ),
      programmingScore: Math.round(
        ((assessment.programmingPython +
          assessment.programmingJava +
          assessment.programmingC) /
          300) *
          100
      ),
      careerSpecificScore: assessment.careerSpecificScore || 0,
      projectCount: portfolio?.projectCount || 0,
      projectTitles: portfolio?.projects?.map((p) => p.title) || [],
    };

    const aiAnalysis = await analyzeWithAI(payload);

    let skillProfile = await SkillProfile.model.findOne({ where: { studentId } });

    if (skillProfile) {
      await skillProfile.update({
        level: aiAnalysis.level,
        aiSummaryReason: aiAnalysis.reason,
        aiSummaryRoadmap: aiAnalysis.roadmap,
        aiSummaryProjects: aiAnalysis.recommendedProjects,
        aiSummaryMentorFocus: aiAnalysis.mentorFocus,
      });
    } else {
      skillProfile = await SkillProfile.model.create({
        studentId,
        level: aiAnalysis.level,
        aiSummaryReason: aiAnalysis.reason,
        aiSummaryRoadmap: aiAnalysis.roadmap,
        aiSummaryProjects: aiAnalysis.recommendedProjects,
        aiSummaryMentorFocus: aiAnalysis.mentorFocus,
      });
    }

    res.status(200).json({
      message: 'AI analysis completed',
      skillProfile,
    });
  } catch (error) {
    console.error('Error analyzing student:', error);
    res.status(500).json({ error: 'Failed to analyze student' });
  }
};

const getSkillProfile = async (req, res) => {
  try {
    const studentId = req.studentId;

    const skillProfile = await SkillProfile.model.findOne({ where: { studentId } });

    if (!skillProfile) {
      return res.status(404).json({ error: 'Skill profile not found' });
    }

    res.status(200).json(skillProfile);
  } catch (error) {
    console.error('Error fetching skill profile:', error);
    res.status(500).json({ error: 'Failed to fetch skill profile' });
  }
};

module.exports = { analyzeStudent, getSkillProfile };
