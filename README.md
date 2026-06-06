<<<<<<< HEAD

# AI Future Campus 🎓

An AI-powered career guidance platform for students to discover their career path, assess their skills, and get personalized roadmaps from experienced mentors.

## 🎯 Features

✅ **Student Authentication** - JWT-based secure registration & login  
✅ **Career Goal Selection** - Choose from AI Engineer, Data Scientist, or Cloud Engineer  
✅ **Assessment System** - Comprehensive MCQ-based aptitude & skill assessment  
✅ **Portfolio Management** - Upload projects and GitHub links  
✅ **AI Analysis** - OpenAI GPT-4o integration for intelligent skill classification  
✅ **Personalized Roadmap** - ML-driven learning paths with phases and tasks  
✅ **Mentor Network** - Connect with experienced mentors in your field  
✅ **Interactive Dashboard** - Visual representation of progress and recommendations  
✅ **Responsive Design** - Beautiful UI built with React & Tailwind CSS

## 📋 Tech Stack

**Frontend:**

- React.js 18
- React Router v6
- Axios for API calls
- Tailwind CSS for styling

**Backend:**

- Node.js + Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- OpenAI GPT-4o API for AI analysis

**Deployment:**

- Vercel (Frontend)
- Render.com (Backend)
- MongoDB Atlas (Database)

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account (free tier available)
- OpenAI API key (or Anthropic Claude API key)

### Backend Setup

1. **Clone and navigate to server:**

   ```bash
   cd server
   npm install
   ```

2. **Create `.env` file:**

   ```bash
   cp .env.example .env
   ```

3. **Fill in your environment variables:**

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-campus
   JWT_SECRET=your-secret-key
   OPENAI_API_KEY=sk-your-key
   CLIENT_URL=http://localhost:3000
   PORT=5000
   ```

4. **Seed mentor database:**

   ```bash
   npm run seed
   ```

5. **Start development server:**

   ```bash
   npm run dev
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client:**

   ```bash
   cd client
   npm install
   ```

2. **Create `.env` file:**

   ```bash
   cp .env.example .env
   ```

3. **Update API URL (if needed):**

   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start React app:**

   ```bash
   npm start
   ```

   App will open at `http://localhost:3000`

## 📊 Database Schema

### Student

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  registerNo: String (unique),
  passwordHash: String,
  createdAt: Date
}
```

### Goal

```javascript
{
  studentId: ObjectId,
  careerGoal: "AI Engineer" | "Data Scientist" | "Cloud Engineer"
}
```

### Assessment

```javascript
{
  studentId: ObjectId,
  aptitude: { logic, quant, problem },
  programming: { python, java, c },
  careerSpecific: { score },
  totalScore: Number,
  createdAt: Date
}
```

### Portfolio

```javascript
{
  studentId: ObjectId,
  projects: [{ title, description, techStack, githubLink }],
  projectCount: Number
}
```

### SkillProfile

```javascript
{
  studentId: ObjectId,
  level: "Beginner" | "Intermediate" | "Advanced",
  aiSummary: {
    reason: String,
    roadmap: [{ phase, duration, tasks, resources }],
    recommendedProjects: [{ title, description, difficulty }],
    mentorFocus: String
  }
}
```

### Mentor

```javascript
{
  _id: ObjectId,
  name: String,
  expertise: [String],
  bio: String,
  careerTrack: String,
  email: String,
  phone: String
}
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new student
- `POST /api/auth/login` - Login student

### Career Goal

- `POST /api/goal/save` - Save career goal (Protected)
- `GET /api/goal/get` - Get saved goal (Protected)

### Assessment

- `POST /api/assessment/submit` - Submit assessment (Protected)
- `GET /api/assessment/get` - Get assessment (Protected)

### Portfolio

- `POST /api/portfolio/upload` - Upload portfolio (Protected)
- `GET /api/portfolio/get` - Get portfolio (Protected)

### AI Analysis

- `POST /api/ai/analyze` - Trigger AI analysis (Protected)
- `GET /api/ai/skill-profile` - Get skill profile (Protected)

### Dashboard

- `GET /api/dashboard/:studentId` - Get full dashboard data (Protected)

### Mentors

- `GET /api/mentor/:careerGoal` - Get mentors by career goal
- `POST /api/mentor/assign` - Assign mentor to student (Protected)
- `GET /api/mentor/dashboard/:mentorId` - Get mentor's students

## 🎨 UI Pages

1. **Login** - Email/RegisterNo + Password authentication
2. **Register** - Create new student account
3. **Goal Selection** - Choose career track with interactive cards
4. **Assessment** - Tabbed MCQ form (Aptitude → Programming → Career-Specific)
5. **Portfolio** - Add projects with GitHub links
6. **Analyzing** - Loading screen while AI processes data
7. **Dashboard** - Main hub with stats, roadmap, projects, mentor card
8. **Mentor Dashboard** - Browse and connect with mentors

## 🤖 AI Analysis Logic

The system sends student data to OpenAI GPT-4o with this prompt:

```
System Prompt: "You are a career assessment engine..."
User Input: Student's scores, goal, projects, skills

Returns JSON:
{
  level: "Beginner" | "Intermediate" | "Advanced",
  reason: "Classification explanation",
  roadmap: [{ phase, duration, tasks[], resources[] }],
  recommendedProjects: [{ title, description, difficulty }],
  mentorFocus: "Mentor guidance focus area"
}
```

### Classification Rules:

- **Beginner**: totalScore < 40 OR projectCount < 2
- **Intermediate**: totalScore 40-70 AND projectCount 2-5
- **Advanced**: totalScore > 70 AND projectCount > 5

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS breakpoints (sm, md, lg, xl)
- Touch-friendly buttons and inputs
- Adaptive layouts for all screen sizes

## 🔐 Security Features

✅ Password hashing with bcrypt (10 salt rounds)  
✅ JWT token-based authentication (7-day expiry)  
✅ Protected routes with middleware  
✅ CORS enabled for cross-origin requests  
✅ Input validation on all endpoints  
✅ MongoDB injection prevention via Mongoose

## 🚀 Deployment Guide

### Deploy Backend to Render

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repo
5. Set environment variables in Render dashboard
6. Deploy

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import project
4. Set `REACT_APP_API_URL` to your Render backend URL
5. Deploy

### MongoDB Atlas Setup

1. Go to [mongodb.com/cloud](https://mongodb.com/cloud)
2. Create free M0 cluster
3. Create database user
4. Whitelist IP 0.0.0.0/0 (for development)
5. Get connection string
6. Add to `.env` file

## 📈 Project Recommendations Examples

### AI Engineer Path

- **Beginner**: House Price Prediction (Linear Regression)
- **Intermediate**: Heart Disease Prediction (ML Classification)
- **Advanced**: AI Career Assistant Chatbot (LLM + RAG)

### Data Scientist Path

- **Beginner**: EDA on Titanic Dataset
- **Intermediate**: Customer Churn Analysis
- **Advanced**: Real-time Sales Forecasting Dashboard

### Cloud Engineer Path

- **Beginner**: Deploy Static Site on AWS S3
- **Intermediate**: Docker + CI/CD Pipeline
- **Advanced**: Kubernetes Microservices on GCP

## 🤝 Mentor Assignments

Mentors are auto-matched based on:

1. Career goal alignment
2. Mentor's expertise areas
3. Manual assignment by admin

## 🛠️ Development Tips

1. **Debug API calls**: Check browser DevTools Network tab
2. **Token issues**: Clear localStorage if login fails
3. **Styling**: Tailwind classes are pre-configured
4. **MongoDB**: Use MongoDB Compass for local testing

## 📝 Environment Variables Checklist

- [ ] `MONGODB_URI` configured
- [ ] `JWT_SECRET` set (use strong random string)
- [ ] `OPENAI_API_KEY` added
- [ ] `CLIENT_URL` set correctly
- [ ] `.env` files in both server and client

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB University](https://university.mongodb.com)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🐛 Troubleshooting

**"Cannot find module" error**

```bash
npm install
```

**MongoDB connection error**

- Check connection string
- Verify IP whitelist on Atlas
- Check network connectivity

**API 401 errors**

- Token missing or expired
- Clear localStorage and re-login
- Check JWT_SECRET matches

**Styling not working**

- Tailwind CSS needs build step
- Run `npm start` for dev server
- Check `tailwind.config.js` exists

## 📄 License

MIT License - Feel free to use for personal projects

## 👨‍💻 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ for students pursuing tech careers**

<img width="337" height="500" alt="image" src="https://github.com/user-attachments/assets/ff42bef1-d24a-4058-8209-6121b6b7c7dc" />

# Student Side

Authentication

Login Page

Registration Page

Forgot Password Page

Career Module

Career Goal Selection Page

Skill Assessment Page

Portfolio Module

Portfolio Upload Page

Project Management Page

Dashboard Module

Student Dashboard

Progress Tracker

Recommendations Page

# Mentor Side

Mentor Dashboard

Assigned Students

Student Progress Monitoring

Feedback Submission

Project Evaluation

> > > > > > > origin/main
