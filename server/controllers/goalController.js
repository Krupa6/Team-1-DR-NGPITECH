const { Goal } = require('../models');

const saveGoal = async (req, res) => {
  try {
    const { careerGoal } = req.body;
    const studentId = req.studentId;

    if (!careerGoal) {
      return res.status(400).json({ error: 'Career goal is required' });
    }

    if (!['AI Engineer', 'Data Scientist', 'Cloud Engineer'].includes(careerGoal)) {
      return res.status(400).json({ error: 'Invalid career goal' });
    }

    let goal = await Goal.model.findOne({ where: { studentId } });

    if (goal) {
      await goal.update({ careerGoal });
    } else {
      goal = await Goal.model.create({ studentId, careerGoal });
    }

    res.status(200).json({
      message: 'Career goal saved successfully',
      goal,
    });
  } catch (error) {
    console.error('Error saving goal:', error);
    res.status(500).json({ error: 'Failed to save goal' });
  }
};

const getGoal = async (req, res) => {
  try {
    const studentId = req.studentId;

    const goal = await Goal.model.findOne({ where: { studentId } });

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.status(200).json(goal);
  } catch (error) {
    console.error('Error fetching goal:', error);
    res.status(500).json({ error: 'Failed to fetch goal' });
  }
};

module.exports = { saveGoal, getGoal };
