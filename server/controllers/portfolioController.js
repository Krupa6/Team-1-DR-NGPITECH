const { Portfolio } = require('../models');

const uploadPortfolio = async (req, res) => {
  try {
    const { projects } = req.body;
    const studentId = req.studentId;

    if (!Array.isArray(projects) || projects.length === 0) {
      return res.status(400).json({ error: 'Projects array is required' });
    }

    let portfolio = await Portfolio.model.findOne({ where: { studentId } });

    if (portfolio) {
      await portfolio.update({
        projects,
        projectCount: projects.length,
      });
    } else {
      portfolio = await Portfolio.model.create({
        studentId,
        projects,
        projectCount: projects.length,
      });
    }

    res.status(200).json({
      message: 'Portfolio uploaded successfully',
      portfolio,
    });
  } catch (error) {
    console.error('Error uploading portfolio:', error);
    res.status(500).json({ error: 'Failed to upload portfolio' });
  }
};

const getPortfolio = async (req, res) => {
  try {
    const studentId = req.studentId;

    const portfolio = await Portfolio.model.findOne({ where: { studentId } });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
};

module.exports = { uploadPortfolio, getPortfolio };
