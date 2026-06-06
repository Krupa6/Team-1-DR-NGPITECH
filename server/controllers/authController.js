const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Student } = require('../models');

const register = async (req, res) => {
  try {
    const { name, email, registerNo, password } = req.body;

    if (!name || !email || !registerNo || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingStudent = await Student.model.findOne({
      where: { [require('sequelize').Op.or]: [{ email }, { registerNo }] },
    });

    if (existingStudent) {
      return res.status(400).json({ error: 'Email or Register No already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const student = await Student.model.create({
      name,
      email,
      registerNo,
      passwordHash,
    });

    const token = jwt.sign(
      { studentId: student.id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Student registered successfully',
      token,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        registerNo: student.registerNo,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, registerNo, password } = req.body;

    if (!password || (!email && !registerNo)) {
      return res.status(400).json({ error: 'Email/RegisterNo and password required' });
    }

    const student = await Student.model.findOne({
      where: { [require('sequelize').Op.or]: [{ email }, { registerNo }] },
    });

    if (!student) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, student.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { studentId: student.id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        registerNo: student.registerNo,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { register, login };
