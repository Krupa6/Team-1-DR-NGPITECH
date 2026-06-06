const { DataTypes } = require('sequelize');

class Portfolio {
  static initialize(sequelize) {
    this.sequelize = sequelize;
    this.model = sequelize.define('Portfolio', {
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
      projects: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      projectCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    });
  }
}

module.exports = Portfolio;
