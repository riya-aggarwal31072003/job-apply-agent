const AGENT_STEPS = [
  { delay:  600, msg: 'Initializing agent and loading your profile...',            type: 'info' },
  { delay: 1400, msg: 'Scanning LinkedIn for matching jobs...',                    type: 'info' },
  { delay: 2100, msg: 'Scanning Naukri.com for matching jobs...',                  type: 'info' },
  { delay: 2700, msg: 'Scanning Indeed for matching jobs...',                      type: 'info' },
  { delay: 3300, msg: 'Found 8 jobs matching your criteria. Analysing scores...',  type: 'success' },
  { delay: 4000, msg: 'Generating tailored cover letter for Razorpay...',          type: 'ai' },
  { delay: 4800, msg: 'Applying to Frontend Engineer at Razorpay (94% match)...',  type: 'info', applyId: 1 },
  { delay: 5400, msg: 'Successfully applied to Razorpay!',                         type: 'success' },
  { delay: 5900, msg: 'Generating tailored cover letter for CRED...',              type: 'ai' },
  { delay: 6600, msg: 'Applying to React Developer at CRED (91% match)...',        type: 'info', applyId: 4 },
  { delay: 7200, msg: 'Successfully applied to CRED!',                             type: 'success' },
  { delay: 7700, msg: 'Generating tailored cover letter for Groww...',             type: 'ai' },
  { delay: 8400, msg: 'Applying to Full Stack Developer at Groww (89% match)...',  type: 'info', applyId: 2 },
  { delay: 9000, msg: 'Successfully applied to Groww!',                            type: 'success' },
  { delay: 9500, msg: 'Skipped PhonePe — match score below 80% threshold.',        type: 'skip', skipId: 5 },
  { delay:10000, msg: 'Agent run complete. Applied to 3 jobs today.',              type: 'done' },
]

export function runAgentSimulation({ onLog, onApply, onSkip, onComplete }) {
  const timers = []
  AGENT_STEPS.forEach(step => {
    const t = setTimeout(() => {
      onLog(step.msg, step.type)
      if (step.applyId) onApply(step.applyId)
      if (step.skipId)  onSkip(step.skipId)
      if (step.type === 'done') onComplete()
    }, step.delay)
    timers.push(t)
  })
  return () => timers.forEach(clearTimeout)
}

export async function generateCoverLetter({ jobTitle, company, jobDescription, profile, tone, onChunk }) {
  const letter = `Dear Hiring Team at ${company},\n\nI am writing to express my strong interest in the ${jobTitle} position. ${profile.summary || 'With a strong background in software engineering'}, I am confident I can make an immediate contribution to your team.\n\nMy experience in ${profile.skills || 'software development'} aligns well with your requirements. In my ${profile.years || 'several'} years of experience, I have delivered high-quality, scalable solutions and thrive in collaborative environments.\n\nI would welcome the opportunity to discuss how I can add value to ${company}.\n\nWarm regards,\n${profile.name || '[Your Name]'}${profile.email ? '\n' + profile.email : ''}`

  for (let i = 0; i < letter.length; i++) {
    await new Promise(r => setTimeout(r, 8))
    onChunk(letter[i])
  }
  return letter
}

export const PLATFORM_LINKS = {
  LinkedIn:  'https://linkedin.com/jobs',
  Naukri:    'https://naukri.com',
  Indeed:    'https://indeed.com',
  Glassdoor: 'https://glassdoor.com/Jobs',
}