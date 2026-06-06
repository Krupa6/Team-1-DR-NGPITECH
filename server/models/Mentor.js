const { DataTypes } = require('sequelize');

class Mentor {
  static initialize(sequelize) {
    this.sequelize = sequelize;
    this.model = sequelize.define('Mentor', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expertise: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      bio: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      careerTrack: {
        type: DataTypes.ENUM('AI Engineer', 'Data Scientist', 'Cloud Engineer'),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      phone: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
    });
  }
}

module.exports = Mentor;
