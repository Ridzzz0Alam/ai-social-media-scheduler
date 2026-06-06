# 📱 SocialFlow — AI-Powered Social Media Management (IN-PROGRESS)

> A full-stack social media management platform built with Next.js, featuring AI-assisted content creation, multi-platform scheduling, and a visual kanban board for content ideation.

---

## 🗝️ Key Features

- 🔐 **Authentication** — Secure user auth powered by Clerk
- 🔗 **Social Account Management** — Connect and disconnect social media accounts with OAuth
- 📱 **Multi-Platform Support** — Manage multiple social channels from a single dashboard
- 📝 **Post Management** — Create, edit, and organize posts across platforms
- 👀 **Custom Channel Previews** — Platform-specific preview components for accurate rendering
- 🤖 **AI Writing Assistant** — Generate, shorten, rewrite, and expand post content using AI
- 📅 **Calendar & List Views** — Visualize and manage your scheduled content timeline
- ⏰ **Automated Scheduling** — Cron job-based publishing powered by Inngest
- 📌 **Kanban Board** — Drag-and-drop board for managing content ideas
- ✨ **AI Content Generation** — AI-powered suggestions for post creation
- 🚀 **Production-Ready** — Full deployment setup included

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) + React |
| Authentication | [Clerk](https://clerk.com/) |
| Database | [Neon](https://neon.tech/) (via Insforge) |
| Background Jobs | [Inngest](https://www.inngest.com/) |
| UI Components | [Shadcn UI](https://ui.shadcn.com/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| AI | Anthropic / OpenAI API |

---

## 📁 Project Structure

```
├── app/
│   ├── (auth)/          # Clerk authentication routes
│   ├── (dashboard)/     # Main app layout
│   │   ├── calendar/    # Calendar view
│   │   ├── ideas/       # Kanban board
│   │   ├── posts/       # Post management
│   │   └── settings/    # Social account connections
│   └── api/             # API routes & webhooks
├── components/
│   ├── channels/        # Per-platform preview components
│   ├── editor/          # Post editor with AI tools
│   └── ui/              # Shadcn UI components
├── inngest/             # Cron job functions
├── lib/                 # Utilities, db client, helpers
└── prisma/              # Database schema & migrations
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- A [Clerk](https://clerk.com/) account
- A [Neon](https://neon.tech/) or compatible PostgreSQL database
- An [Inngest](https://www.inngest.com/) account (for scheduling)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/socialflow.git
cd socialflow

# Install dependencies
npm install

# Copy the environment template
cp .env.example .env.local
```

### Environment Variables

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Database (Insforge / Neon)
DATABASE_URL=

# Inngest
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

# Social Platform OAuth Keys
TWITTER_CLIENT_ID=
TWITTER_CLIENT_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
# ... add others as needed

# AI
OPENAI_API_KEY=
```

### Run Locally

```bash
# Start the Next.js dev server
npm run dev

# In a separate terminal, start the Inngest dev server
npx inngest-cli@latest dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🗄️ Database Setup

```bash
# Push schema to your database
npx prisma db push

# (Optional) Open Prisma Studio
npx prisma studio
```

---

## 📅 Scheduling with Inngest

Inngest handles all background job processing, including:

- **Post publishing cron jobs** — Polls for due posts and publishes them to connected platforms
- **Retry logic** — Automatic retries on failed publish attempts
- **Webhook events** — Triggered on post creation and status changes

To test Inngest locally, visit the [Inngest Dev UI](http://localhost:8288) after running the dev server.

---

## 🏗️ Architecture

### System overview

```
┌─────────────────────────────────────┐
│         Client (Browser)            │
│   React · Shadcn UI · Tailwind CSS  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Next.js App (Vercel)           │
│  App Router · API Routes · Clerk    │
└──────┬───────────┬──────────┬───────┘
       │           │          │
┌──────▼──┐  ┌─────▼───┐  ┌──▼──────────┐
│  Clerk  │  │  Neon   │  │  OpenAI API │
│  Auth   │  │  Prisma │  │  (AI assist)│
└─────────┘  └────┬────┘  └─────────────┘
                  │
       ┌──────────▼──────────┐
       │   Inngest (cron)    │
       │  Schedule · Retry   │
       └──┬────┬────┬────┬───┘
          │    │    │    │
      Twitter  LI  IG  ...more
```

### Post scheduling flow

When a user creates a post with a future publish time:

1. Post is saved to the database with `status: SCHEDULED`
2. Inngest polls every minute for due posts
3. For each due post, Inngest calls the relevant social platform's API
4. Post status is updated to `PUBLISHED` or `FAILED`
5. Failed posts are automatically retried with exponential backoff

![Workflow Diagram](https://raw.githubusercontent.com/Ridzzz0Alam/ai-social-media-scheduler/main/Workflow%20Diagram.jpg)

### Database schema

| Table | Key fields |
|---|---|
| `users` | `id`, `clerk_id`, `email` |
| `social_accounts` | `user_id`, `platform`, `access_token`, `expires_at` |
| `posts` | `user_id`, `social_account_id`, `content`, `status`, `publish_at` |
| `ideas` | `user_id`, `title`, `content`, `status`, `board_order` |

---

## 🚢 Deployment

This project is production-ready and can be deployed to [Vercel](https://vercel.com/) in a few steps:

```bash
# Install the Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Make sure to add all environment variables in your Vercel project dashboard before deploying.

---

## 📄 License

MIT License — feel free to use this project for personal or commercial purposes.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a PR or issue.

---

<p align="center">Built with ❤️ using Next.js, Clerk, Inngest & Shadcn UI</p>
