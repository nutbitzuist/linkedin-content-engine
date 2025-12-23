# ContentForge - LinkedIn Content Engine

A powerful web application for creating viral LinkedIn content using proven templates and AI-powered rewriting.

![ContentForge Dashboard](https://via.placeholder.com/800x400?text=ContentForge+Dashboard)

## Features

### 🎯 30 Viral Templates
Proven frameworks from top LinkedIn creators like Justin Welsh, Sahil Bloom, and others:
- **Hook Templates** - Strong opening lines that stop the scroll
- **Structure Templates** - Proven frameworks for post bodies
- **Engagement Templates** - Closers that drive comments
- **Complete Templates** - Full post frameworks ready to use

### 🤖 AI-Powered Rewriting
- **Template Application** - Transform raw ideas into structured posts
- **Hook Enhancement** - Strengthen your opening lines
- **Full Rewrite** - Complete content transformation
- **Tone Adjustment** - Shift between authoritative, conversational, vulnerable, provocative, or inspirational
- **Length Optimization** - Expand or condense to optimal 800-1200 characters

### 📅 Content Calendar
- Visual week/month view
- Drag-and-drop scheduling
- Optimal posting time recommendations
- Queue management

### 📝 Draft Management
- Auto-save drafts
- Bulk operations
- Template tracking

### 🔗 LinkedIn Integration
- OAuth connection
- Direct posting to LinkedIn
- Profile display

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS with custom design system
- Zustand for state management
- React Query for API state
- React Router for navigation
- Vite for development

### Backend
- Node.js with Express
- TypeScript
- Anthropic Claude API for AI
- LinkedIn OAuth 2.0
- Zod for validation

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Anthropic API key
- LinkedIn Developer App (for OAuth)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd linkedin-content-engine
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example env file
cp backend/.env.example backend/.env

# Edit with your values
nano backend/.env
```

Required environment variables:
- `ANTHROPIC_API_KEY` - Get from https://console.anthropic.com
- `LINKEDIN_CLIENT_ID` - Get from LinkedIn Developer Portal
- `LINKEDIN_CLIENT_SECRET` - Get from LinkedIn Developer Portal
- `JWT_SECRET` - Any secure random string

4. **Start development servers**
```bash
npm run dev
```

This starts:
- Frontend at http://localhost:3000
- Backend at http://localhost:4000

### LinkedIn Developer Setup

1. Go to https://www.linkedin.com/developers/
2. Create a new app
3. Add the following OAuth 2.0 scopes:
   - `openid`
   - `profile`
   - `w_member_social`
4. Add redirect URL: `http://localhost:4000/api/linkedin/callback`
5. Copy Client ID and Secret to your `.env` file

## Project Structure

```
linkedin-content-engine/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities, store, templates
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types/          # TypeScript types
│   │   └── styles/         # Global styles
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── index.ts        # Server entry
│   └── package.json
│
└── package.json            # Root package with workspaces
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - List all posts
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/schedule` - Schedule post

### AI
- `POST /api/ai/rewrite` - Rewrite content
- `POST /api/ai/ideas` - Generate content ideas

### LinkedIn
- `GET /api/linkedin/auth` - Start OAuth
- `GET /api/linkedin/callback` - OAuth callback
- `GET /api/linkedin/status` - Connection status
- `POST /api/linkedin/post` - Publish to LinkedIn
- `POST /api/linkedin/disconnect` - Disconnect

### Templates
- `GET /api/templates/usage` - Get usage stats
- `POST /api/templates/:id/use` - Track usage
- `GET /api/templates/popular` - Most used templates

## Template Categories

### Hooks (1-10)
1. The Contradiction Hook
2. The Unexpected Number
3. The Confession
4. The Bold Claim
5. The Time Stamp
6. The Relatable Struggle
7. The Question Hook
8. The Observation
9. The Behind-the-Scenes
10. What I'd Tell My Younger Self

### Structures (11-20)
11. The Story Arc
12. The Listicle with Depth
13. The Framework Introduction
14. The Myth-Buster
15. The Before/After
16. The Step-by-Step Tutorial
17. The Comparison
18. The Prediction
19. The Case Study
20. The Quote Expansion

### Engagement (21-25)
21. The Question Close
22. The Challenge
23. The Resource Offer
24. The Vulnerable Ask
25. The Hot Take Stance

### Complete (26-30)
26. The Weekly Insight
27. The Counterintuitive Truth
28. The Underrated/Overrated
29. The Appreciation Post
30. The Things I Don't Do

## Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel
```

### Backend (Railway/Render)
```bash
cd backend
# Deploy to your preferred platform
```

## Future Roadmap

- [ ] Facebook Pages integration
- [ ] YouTube title/description templates
- [ ] Analytics dashboard
- [ ] Team collaboration
- [ ] Content recycling
- [ ] A/B testing for posts
- [ ] Browser extension

## Contributing

Contributions are welcome! Please read our contributing guidelines first.

## License

MIT License - see LICENSE file for details.

---

Built with ❤️ for content creators who want to grow their LinkedIn presence.
