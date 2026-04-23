import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const MOCK_JOBS = [
  { id:1, title:'Frontend Engineer',    company:'Razorpay', location:'Bangalore / Remote', salary:'18–28 LPA', match:94, tags:['React','TypeScript','3-5yr'], status:'pending', platform:'LinkedIn', postedAt:'2h ago', logo:'R', color:'#1e3a5f' },
  { id:2, title:'Full Stack Developer', company:'Groww',    location:'Remote',             salary:'20–30 LPA', match:89, tags:['Node.js','React','SQL'],       status:'pending', platform:'Naukri',   postedAt:'4h ago', logo:'G', color:'#0b3d2e' },
  { id:3, title:'Software Engineer II', company:'Zepto',    location:'Mumbai',             salary:'22–35 LPA', match:82, tags:['Python','AWS','4yr+'],         status:'pending', platform:'Indeed',   postedAt:'1d ago', logo:'Z', color:'#2d1b4e' },
  { id:4, title:'React Developer',      company:'CRED',     location:'Bangalore',          salary:'16–24 LPA', match:91, tags:['React','Redux','2-4yr'],       status:'pending', platform:'LinkedIn', postedAt:'6h ago', logo:'C', color:'#1a1a2e' },
  { id:5, title:'Backend Engineer',     company:'PhonePe',  location:'Bangalore / Hybrid', salary:'25–40 LPA', match:76, tags:['Java','Microservices','3yr+'], status:'pending', platform:'Naukri',   postedAt:'2d ago', logo:'P', color:'#1f3a1f' },
  { id:6, title:'SDE-2',               company:'Meesho',   location:'Remote',             salary:'20–32 LPA', match:71, tags:['Go','Kafka','4yr+'],           status:'pending', platform:'LinkedIn', postedAt:'3d ago', logo:'M', color:'#3b1a2e' },
  { id:7, title:'Senior Frontend Dev',  company:'Swiggy',   location:'Bangalore',          salary:'24–38 LPA', match:87, tags:['React','Performance','5yr+'],  status:'pending', platform:'Indeed',   postedAt:'5h ago', logo:'S', color:'#2d1500' },
  { id:8, title:'UI Engineer',          company:'Zomato',   location:'Gurgaon / Remote',   salary:'15–22 LPA', match:80, tags:['Vue','CSS','2-4yr'],           status:'pending', platform:'Naukri',   postedAt:'1d ago', logo:'Z', color:'#3b0a0a' },
]

export const useStore = create(
  persist(
    (set, get) => ({
      profile: {
        name:'', email:'', phone:'', linkedin:'',
        portfolio:'', location:'', title:'', years:'', skills:'', summary:''
      },
      setProfile: (data) => set({ profile: { ...get().profile, ...data } }),

      prefs: {
        role:'Software Engineer', industry:'Technology', minSalary:'10',
        workType:'Remote', jobType:'Full-time', expLevel:'Mid',
        locations:'Bangalore, Delhi, Remote', excludeCompanies:'',
        autoApply:true, coverLetterAI:true, skipLowSalary:true,
        emailSummary:false, requireApproval:false, maxPerDay:10
      },
      setPrefs: (data) => set({ prefs: { ...get().prefs, ...data } }),

      jobs: MOCK_JOBS.map(j => ({ ...j })),
      setJobStatus: (id, status) => set(state => ({
        jobs: state.jobs.map(j => j.id === id ? { ...j, status } : j)
      })),
      resetJobs: () => set({ jobs: MOCK_JOBS.map(j => ({ ...j })) }),

      logs: [],
      addLog: (msg, type = 'info') => set(state => ({
        logs: [{ msg, type, ts: new Date().toISOString() }, ...state.logs].slice(0, 50)
      })),
      clearLogs: () => set({ logs: [] }),

      agentRunning: false,
      setAgentRunning: (v) => set({ agentRunning: v }),

      getStats: () => {
        const jobs = get().jobs
        return {
          applied: jobs.filter(j => j.status === 'applied').length,
          found:   jobs.length,
          review:  jobs.filter(j => j.status === 'review').length,
          skipped: jobs.filter(j => j.status === 'skipped').length,
          pending: jobs.filter(j => j.status === 'pending').length,
        }
      },
    }),
    {
      name: 'job-agent-store',
      partialize: (s) => ({ profile: s.profile, prefs: s.prefs })
    }
  )
)