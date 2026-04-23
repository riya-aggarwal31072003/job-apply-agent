\# JobAgent — Apply on Autopilot 🤖



> AI-powered job application automation platform. Set your profile once, and let the agent find and apply to jobs on your behalf — saving hours of repetitive work.



Built by \[Riya Aggarwal](https://github.com/riya-aggarwal31072003)



\---



\## ✨ Features



\- \*\*AI Agent Dashboard\*\* — Watch the agent scan job boards and apply in real time

\- \*\*Smart Job Matching\*\* — Scores each job against your skills and preferences

\- \*\*AI Cover Letters\*\* — Generates a tailored cover letter per job using your profile

\- \*\*Job Queue\*\* — Browse, filter, and manually manage all found jobs

\- \*\*Profile Builder\*\* — Fill once, apply everywhere

\- \*\*Preference Engine\*\* — Set salary floor, work type, role, locations, and exclusions

\- \*\*Activity Log\*\* — Full audit trail of everything the agent does

\- \*\*Dark-first UI\*\* — Clean, terminal-inspired design built with React + Tailwind



\---



\## 🚀 Quick Start



```bash

\# 1. Clone the repo

git clone https://github.com/riya-aggarwal31072003/job-apply-agent.git

cd job-apply-agent



\# 2. Install dependencies

npm install



\# 3. Start the dev server

npm run dev



\# 4. Open http://localhost:5173

```



\---



\## 🏗️ Project Structure

job-apply-agent/

├── src/

│   ├── components/

│   │   ├── UI.jsx              # Shared UI components

│   │   ├── Sidebar.jsx         # Navigation sidebar

│   │   └── JobCard.jsx         # Job listing card

│   ├── pages/

│   │   ├── Dashboard.jsx       # Agent controls and activity log

│   │   ├── Profile.jsx         # User profile form

│   │   ├── Preferences.jsx     # Job search preferences

│   │   ├── Jobs.jsx            # Job queue with filters

│   │   └── CoverLetter.jsx     # AI cover letter generator

│   ├── utils/

│   │   └── agent.js            # Agent engine and cover letter logic

│   ├── styles/

│   │   └── index.css           # Design system and tokens

│   ├── store.js                # Zustand global state

│   ├── App.jsx                 # Root component with routing

│   └── main.jsx                # Entry point

├── docs/

│   ├── SETUP.md                # Full backend setup guide

│   └── ROADMAP.md              # Feature roadmap

├── index.html

├── vite.config.js

├── tailwind.config.js

└── package.json

\---



\## 🛠️ Tech Stack



| Layer      | Technology                         |

|------------|------------------------------------|

| Frontend   | React 18, Vite, React Router v6    |

| Styling    | Tailwind CSS, CSS Variables        |

| State      | Zustand with localStorage persist  |

| Icons      | Lucide React                       |

| Toasts     | React Hot Toast                    |

| AI (future)| Anthropic Claude API               |

| Backend    | Node.js + Express (see SETUP.md)   |

| Database   | PostgreSQL / Supabase              |

| Scraping   | Playwright / Puppeteer             |

| Scheduling | node-cron                          |



\---



\## 🔌 Making the Agent Real



The frontend ships with a simulated agent for demo purposes.

To make it fully functional see \*\*docs/SETUP.md\*\* for:



\- LinkedIn, Naukri, Indeed scraper setup

\- Auto form filling with Playwright

\- Claude API cover letter integration

\- Node.js backend and PostgreSQL schema

\- Daily cron scheduler

\- Email summary setup

\- Vercel + Railway deployment



\---



\## 🗺️ Roadmap



\- \[x] Frontend UI with simulated agent

\- \[x] Profile and preferences management

\- \[x] AI cover letter generator

\- \[x] Job queue with filters

\- \[ ] LinkedIn scraper with Playwright

\- \[ ] Naukri.com and Indeed scrapers

\- \[ ] Claude API real cover letters

\- \[ ] Node.js backend with PostgreSQL

\- \[ ] Email daily summaries

\- \[ ] User authentication

\- \[ ] Resume PDF upload

\- \[ ] Interview tracker

\- \[ ] Chrome extension



\---



\## 📄 License



MIT — free to use, modify, and distribute.



\---



⭐ Star this repo if it helped you land a job!

