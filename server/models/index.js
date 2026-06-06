const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false, // Disable SQL logging
});

// Import models
const Student = require('./Student');
const Goal = require('./Goal');
const Assessment = require('./Assessment');
const Portfolio = require('./Portfolio');
const SkillProfile = require('./SkillProfile');
const Mentor = require('./Mentor');
const Assignment = require('./Assignment');

// Initialize all models
Student.initialize(sequelize);
Goal.initialize(sequelize);
Assessment.initialize(sequelize);
Portfolio.initialize(sequelize);
SkillProfile.initialize(sequelize);
Mentor.initialize(sequelize);
Assignment.initialize(sequelize);

// Setup associations
Student.model.hasOne(Goal.model, { foreignKey: 'studentId' });
Student.model.hasOne(Assessment.model, { foreignKey: 'studentId' });
Student.model.hasOne(Portfolio.model, { foreignKey: 'studentId' });
Student.model.hasOne(SkillProfile.model, { foreignKey: 'studentId' });
Student.model.hasOne(Assignment.model, { foreignKey: 'studentId' });

Goal.model.belongsTo(Student.model, { foreignKey: 'studentId' });
Assessment.model.belongsTo(Student.model, { foreignKey: 'studentId' });
Portfolio.model.belongsTo(Student.model, { foreignKey: 'studentId' });
SkillProfile.model.belongsTo(Student.model, { foreignKey: 'studentId' });
Assignment.model.belongsTo(Student.model, { foreignKey: 'studentId' });
Assignment.model.belongsTo(Mentor.model, { foreignKey: 'mentorId' });
Mentor.model.hasMany(Assignment.model, { foreignKey: 'mentorId' });

module.exports = {
  sequelize,
  Student,
  Goal,
  Assessment,
  Portfolio,
  SkillProfile,
  Mentor,
  Assignment,
};
