const { DataTypes } = require('sequelize');

class Assessment {
  static initialize(sequelize) {
    this.sequelize = sequelize;
    this.model = sequelize.define('Assessment', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      studentId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      aptitudeLogic: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      aptitudeQuant: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      aptitudeProblem: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      programmingPython: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      programmingJava: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      programmingC: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      careerSpecificScore: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      totalScore: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    });
  }
}

module.exports = Assessment;
