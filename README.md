# SkillPath AI - Frontend Client

Agentic AI Career & Study Mentor Platform - Frontend Application

## Tech Stack
- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- Better Auth (React Client)
- Axios

## Features
- AI Chat Assistant with conversation history
- AI Smart Recommendation Engine
- Resource library (search, filter, pagination)
- Authentication (Email/Password, Google OAuth, Demo Login)
- Role-based dashboards (Student, Mentor, Admin)
- Admin panel (Add/Manage Resources)
- Fully responsive design

## Environment Variables
Create a `.env.local
NEXT_PUBLIC_API_URL=your_backend_url
NEXT_PUBLIC_APP_URL=your_frontend_url
## Getting Started
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Pages
- `/` - Landing page
- `/login`, `/register` - Authentication
- `/dashboard` - User dashboard
- `/chat` - AI Chat Assistant
- `/resources` - Resource library
- `/resources/[id]` - Resource details
- `/admin/resources` - Add resource (Mentor/Admin)
- `/admin/resources/manage` - Manage resources (Mentor/Admin)
- `/about`, `/contact`, `/blog` - Additional pages