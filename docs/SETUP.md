\# 🛠️ Full Setup Guide — JobAgent



\## Prerequisites



\- Node.js 18+ → https://nodejs.org

\- Git → https://git-scm.com

\- GitHub account → https://github.com



\---



\## Part 1: Run the Frontend Demo



```bash

git clone https://github.com/riya-aggarwal31072003/job-apply-agent.git

cd job-apply-agent

npm install

npm run dev

\# Open http://localhost:5173

```



\---



\## Part 2: Real Backend Setup



\### Install backend dependencies



```bash

mkdir backend \&\& cd backend

npm init -y

npm install express cors pg dotenv @anthropic-ai/sdk playwright node-cron nodemailer

```



\### Express server



```javascript

// backend/server.js

require('dotenv').config()

const express = require('express')

const cors = require('cors')

const app = express()



app.use(cors())

app.use(express.json())

app.use('/api/jobs',  require('./routes/jobs'))

app.use('/api/agent', require('./routes/agent'))



app.listen(process.env.PORT || 3001, () =>

&#x20; console.log('Backend running on port 3001')

)

```



\---



\## Part 3: Job Scraping with Playwright



```javascript

// backend/scrapers/linkedin.js

const { chromium } = require('playwright')



async function scrapeLinkedIn({ role, location, cookies }) {

&#x20; const browser = await chromium.launch({ headless: true })

&#x20; const page = await browser.newPage()

&#x20; await page.context().addCookies(cookies)

&#x20; await page.goto(`https://www.linkedin.com/jobs/search/?keywords=${role}\&location=${location}`)

&#x20; await page.waitForSelector('.job-card-container')

&#x20; const jobs = await page.$$eval('.job-card-container', cards =>

&#x20;   cards.map(card => ({

&#x20;     title:    card.querySelector('.job-card-list\_\_title')?.innerText,

&#x20;     company:  card.querySelector('.job-card-container\_\_company-name')?.innerText,

&#x20;     location: card.querySelector('.job-card-container\_\_metadata-item')?.innerText,

&#x20;     link:     card.querySelector('a')?.href,

&#x20;   }))

&#x20; )

&#x20; await browser.close()

&#x20; return jobs

}

```



\---



\## Part 4: Auto Apply with Playwright



```javascript

// backend/apply/easyApply.js

async function easyApply({ page, job, profile }) {

&#x20; await page.goto(job.link)

&#x20; const btn = await page.$('\[aria-label="Easy Apply"]')

&#x20; if (!btn) return { success: false, reason: 'No Easy Apply' }

&#x20; await btn.click()

&#x20; const phoneInput = await page.$('input\[id\*="phone"]')

&#x20; if (phoneInput) await phoneInput.fill(profile.phone)

&#x20; const fileInput = await page.$('input\[type="file"]')

&#x20; if (fileInput) await fileInput.setInputFiles(profile.resumePath)

&#x20; await page.click('\[aria-label="Submit application"]')

&#x20; return { success: true }

}

```



\---



\## Part 5: AI Cover Letters with Claude



```javascript

// backend/ai/coverLetter.js

const Anthropic = require('@anthropic-ai/sdk')

const client = new Anthropic({ apiKey: process.env.ANTHROPIC\_API\_KEY })



async function generateCoverLetter({ jobTitle, company, jobDescription, profile }) {

&#x20; const message = await client.messages.create({

&#x20;   model: 'claude-sonnet-4-6',

&#x20;   max\_tokens: 600,

&#x20;   system: 'You are an expert career coach. Write concise compelling cover letters. Max 3 paragraphs.',

&#x20;   messages: \[{

&#x20;     role: 'user',

&#x20;     content: `Job: ${jobTitle} at ${company}

Description: ${jobDescription}

Candidate: ${JSON.stringify(profile)}`

&#x20;   }]

&#x20; })

&#x20; return message.content\[0].text

}

```



\---



\## Part 6: Schedule Daily Runs



```javascript

// backend/scheduler.js

const cron = require('node-cron')



cron.schedule('0 9 \* \* \*', async () => {

&#x20; console.log('Running daily job agent...')

&#x20; const users = await db.query('SELECT \* FROM users WHERE agent\_enabled = true')

&#x20; for (const user of users.rows) {

&#x20;   await runAgentForUser(user)

&#x20; }

})

```



\---



\## Part 7: Environment Variables



```env

VITE\_API\_URL=http://localhost:3001

DATABASE\_URL=postgresql://user:pass@localhost:5432/jobagent

ANTHROPIC\_API\_KEY=sk-ant-...

SMTP\_HOST=smtp.gmail.com

SMTP\_USER=you@gmail.com

SMTP\_PASS=your-app-password

PORT=3001

```



\---



\## Part 8: Deploy



\### Frontend — Vercel (free)

1\. Push to GitHub

2\. Go to https://vercel.com → New Project → Import repo

3\. Framework: Vite → Deploy



\### Backend — Railway (free tier)

1\. Go to https://railway.app → New Project

2\. Connect GitHub repo

3\. Add PostgreSQL plugin

4\. Set environment variables

