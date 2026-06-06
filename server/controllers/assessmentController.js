const { Assessment } = require('../models');

const submitAssessment = async (req, res) => {
  try {
    const { aptitude, programming, careerSpecific } = req.body;
    const studentId = req.studentId;

    // Calculate scores (out of 100)
    const aptitudeScore =
      ((aptitude.logic + aptitude.quant + aptitude.problem) / 300) * 100;
    const programmingScore =
      ((programming.python + programming.java + programming.c) / 300) * 100;
    const careerSpecificScore = careerSpecific.score || 0;

    const totalScore =
      (aptitudeScore + programmingScore + careerSpecificScore) / 3;

    const assessment = await Assessment.model.create({
      studentId,
      aptitudeLogic: aptitude.logic,
      aptitudeQuant: aptitude.quant,
      aptitudeProblem: aptitude.problem,
      programmingPython: programming.python,
      programmingJava: programming.java,
      programmingC: programming.c,
      careerSpecificScore: careerSpecific.score || 0,
      totalScore: Math.round(totalScore),
    });

    res.status(201).json({
      message: 'Assessment submitted successfully',
      assessment,
      scores: {
        aptitudeScore: Math.round(aptitudeScore),
        programmingScore: Math.round(programmingScore),
        careerSpecificScore: Math.round(careerSpecificScore),
        totalScore: Math.round(totalScore),
      },
    });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    res.status(500).json({ error: 'Failed to submit assessment' });
  }
};

const getAssessment = async (req, res) => {
  try {
    const studentId = req.studentId;

    const assessment = await Assessment.model.findOne({
      where: { studentId },
      order: [['createdAt', 'DESC']],
    });

    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }

    res.status(200).json(assessment);
  } catch (error) {
    console.error('Error fetching assessment:', error);
    res.status(500).json({ error: 'Failed to fetch assessment' });
  }
};

module.exports = { submitAssessment, getAssessment };
