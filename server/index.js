require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sequelize Sync
sequelize
  .sync()
  .then(() => console.log('✅ SQLite database synced'))
  .catch((err) => {
    console.error('❌ Database sync error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/goal', require('./routes/goal'));
app.use('/api/assessment', require('./routes/assessment'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/mentor', require('./routes/mentor'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', database: 'SQLite' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
