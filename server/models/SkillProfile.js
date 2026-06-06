const { DataTypes } = require('sequelize');

class SkillProfile {
  static initialize(sequelize) {
    this.sequelize = sequelize;
    this.model = sequelize.define('SkillProfile', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      studentId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      level: {
        type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
        defaultValue: 'Beginner',
      },
      aiSummaryReason: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      aiSummaryRoadmap: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      aiSummaryProjects: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      aiSummaryMentorFocus: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
    });
  }
}

module.exports = SkillProfile;
