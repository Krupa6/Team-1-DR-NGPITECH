const { DataTypes } = require('sequelize');

class Assignment {
  static initialize(sequelize) {
    this.sequelize = sequelize;
    this.model = sequelize.define('Assignment', {
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
      mentorId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      sessionNotes: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
    });
  }
}

module.exports = Assignment;
