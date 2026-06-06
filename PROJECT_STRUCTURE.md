# Project Structure

```
ai-future-campus/
├── server/                          # Node.js + Express backend
│   ├── models/                      # Mongoose schemas
│   │   ├── Student.js
│   │   ├── Goal.js
│   │   ├── Assessment.js
│   │   ├── Portfolio.js
│   │   ├── SkillProfile.js
│   │   ├── Mentor.js
│   │   └── Assignment.js
│   ├── controllers/                 # Request handlers
│   │   ├── authController.js
│   │   ├── goalController.js
│   │   ├── assessmentController.js
│   │   ├── portfolioController.js
│   │   ├── aiController.js
│   │   ├── dashboardController.js
│   │   └── mentorController.js
│   ├── routes/                      # API routes
│   │   ├── auth.js
│   │   ├── goal.js
│   │   ├── assessment.js
│   │   ├── portfolio.js
│   │   ├── ai.js
│   │   ├── dashboard.js
│   │   └── mentor.js
│   ├── middleware/                  # Express middleware
│   │   └── auth.js                  # JWT verification
│   ├── utils/                       # Utility functions
│   │   └── aiAnalyzer.js            # OpenAI integration
│   ├── index.js                     # Server entry point
│   ├── seed.js                      # Database seeding
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── client/                          # React.js frontend
│   ├── src/
│   │   ├── pages/                   # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Goal.jsx
│   │   │   ├── Assessment.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Analyzing.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── MentorDashboard.jsx
│   │   ├── components/              # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── SkillBadge.jsx
│   │   │   ├── RoadmapCard.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   └── MentorCard.jsx
│   │   ├── api/                     # API setup
│   │   │   └── axios.js             # Axios instance with interceptors
│   │   ├── App.jsx                  # Main app component with routing
│   │   ├── index.jsx                # React entry point
│   │   └── index.css                # Global styles
│   ├── public/
│   │   └── index.html               # HTML template
│   ├── package.json
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── postcss.config.js
│   ├── .env.example
│   └── .gitignore
│
├── README.md                        # Project documentation
└── .gitignore                       # Git ignore rules
```

## Key Technologies

### Backend

- **Express.js** - REST API framework
- **MongoDB & Mongoose** - Database & ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Axios** - HTTP client for AI API calls
- **CORS** - Cross-origin request handling

### Frontend

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - API client
- **Tailwind CSS** - Styling
- **Context API** (optional) - State management

## Data Flow

```
Login/Register → Goal Selection → Assessment → Portfolio Upload
  ↓
AI Analysis (OpenAI) → Skill Profile Generated
  ↓
Dashboard Display → Mentor Connection → Learning Path
```

## Authentication Flow

```
1. User registers → Password hashed with bcrypt
2. User logs in → Email/RegisterNo + password verified
3. JWT token created → Stored in localStorage
4. API requests include Authorization header
5. Server verifies JWT → Extracts studentId
6. Request processed with studentId context
```

## API Call Sequence (MVP)

```
1. POST /api/auth/register or /api/auth/login
2. POST /api/goal/save
3. POST /api/assessment/submit
4. POST /api/portfolio/upload
5. POST /api/ai/analyze (triggers AI analysis)
6. GET /api/dashboard/{studentId} (fetch all data)
7. GET /api/mentor/{careerGoal} (list available mentors)
8. POST /api/mentor/assign (assign mentor to student)
```

## Environment Setup Quick Reference

**Server (.env)**

```
MONGODB_URI=<connection string>
JWT_SECRET=<random string>
OPENAI_API_KEY=<api key>
CLIENT_URL=http://localhost:3000
PORT=5000
```

**Client (.env)**

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Deployment Checklist

- [ ] Push code to GitHub
- [ ] Set up MongoDB Atlas
- [ ] Configure Render for backend
- [ ] Configure Vercel for frontend
- [ ] Set all environment variables
- [ ] Run database seed script
- [ ] Test all endpoints
- [ ] Verify email/phone inputs work
- [ ] Test AI API integration
- [ ] Check responsive design

## Performance Optimizations

- ✅ Code splitting with React lazy loading
- ✅ Image optimization (Tailwind no images, CSS only)
- ✅ Debounced API calls
- ✅ Local storage for auth tokens
- ✅ MongoDB indexing on frequently queried fields
- ✅ JWT token caching
