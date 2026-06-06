const { DataTypes } = require('sequelize');

class Goal {
  static initialize(sequelize) {
    this.sequelize = sequelize;
    this.model = sequelize.define('Goal', {
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
      careerGoal: {
        type: DataTypes.ENUM('AI Engineer', 'Data Scientist', 'Cloud Engineer'),
        allowNull: false,
      },
    });
  }
}

module.exports = Goal;
