sidebar = """import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, User, Settings, Briefcase, FileText, Github } from 'lucide-react'
import { useStore } from '../store.js'

const NAV = [
  { to:'/', icon:LayoutDashboard, label:'Dashboard' },
  { to:'/profile', icon:User, label:'My Profile' },
  { to:'/prefs', icon:Settings, label:'Preferences' },
  { to:'/jobs', icon:Briefcase, label:'Job Queue' },
  { to:'/cover', icon:FileText, label:'Cover Letter AI' },
]

export default function Sidebar() {
  const { agentRunning, getStats } = useStore()
  const stats = getStats()
  return (
    <aside style={{ width:220, background:'var(--bg-secondary)', borderRight:'1px solid var(--border)', padding:'1.25rem 0.75rem', display:'flex', flexDirection:'column', height:'100%' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'0 12px', marginBottom:32 }}>
        <div style={{ width:32, height:32, borderRadius:8, background:'var(--accent)', color:'#0a0e1a', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14 }}>J</div>
        <div>
          <p style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)', lineHeight:1.2 }}>JobAgent</p>
          <p style={{ fontSize:11, color:'var(--text-muted)' }}>Apply on autopilot</p>
        </div>
      </div>
      <div style={{ margin:'0 12px', marginBottom:24, padding:'8px 12px', borderRadius:8, background: agentRunning ? 'rgba(74,222,128,0.12)' : 'var(--bg-elevated)', border:'1px solid var(--border)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background: agentRunning ? 'var(--accent)' : 'var(--text-muted)' }} />
          <span style={{ fontSize:12, color: agentRunning ? 'var(--accent)' : 'var(--text-muted)' }}>
            {agentRunning ? 'Agent running' : 'Agent idle'}
          </span>
        </div>
        <p style={{ fontSize:11, color:'var(--text-muted)', marginTop:6 }}>{stats.applied} applied</p>
      </div>
      <nav style={{ display:'flex', flexDirection:'column', gap:2, flex:1 }}>
        {NAV.map(({ to, icon:Icon, label }) => (
          <NavLink key={to} to={to} end={to === '/'}
            className={({ isActive }) => 'nav-item ' + (isActive ? 'active' : '')}>
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div style={{ paddingTop:16, borderTop:'1px solid var(--border)' }}>
        <a href='https://github.com/riya-aggarwal31072003/job-apply-agent' target='_blank' rel='noreferrer'
          style={{ display:'flex', alignItems:'center', gap:12, padding:'8px 12px', borderRadius:8, color:'var(--text-muted)', fontSize:12, textDecoration:'none' }}>
          <Github size={14} />
          <span>View on GitHub</span>
        </a>
      </div>
    </aside>
  )
}
"""

jobcard = """import React from 'react'
import { ExternalLink, MapPin, Clock, Building2 } from 'lucide-react'
import { MatchBadge, StatusBadge } from './UI.jsx'
import { useStore } from '../store.js'
import { PLATFORM_LINKS } from '../utils/agent.js'

export default function JobCard({ job }) {
  const { setJobStatus } = useStore()
  return (
    <div className='glass rounded-xl p-4 section-enter' style={{ marginBottom:10 }}>
      <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
        <div style={{ width:40, height:40, borderRadius:8, background: job.color || '#1a2236', color:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, flexShrink:0 }}>
          {job.logo}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', justifyContent:'space-between', gap:8 }}>
            <div>
              <h3 style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)' }}>{job.title}</h3>
              <p style={{ fontSize:12, marginTop:2, color:'var(--text-secondary)', display:'flex', alignItems:'center', gap:4 }}>
                <Building2 size={11} />{job.company}
              </p>
            </div>
            <StatusBadge status={job.status} />
          </div>
          <div style={{ display:'flex', gap:12, marginTop:8, flexWrap:'wrap' }}>
            <span style={{ fontSize:11, color:'var(--text-muted)', display:'flex', alignItems:'center', gap:4 }}>
              <MapPin size={10} />{job.location}
            </span>
            <span style={{ fontSize:11, color:'var(--text-muted)', display:'flex', alignItems:'center', gap:4 }}>
              <Clock size={10} />{job.postedAt}
            </span>
            <MatchBadge score={job.match} />
            {job.salary && <span style={{ fontSize:11, fontFamily:'monospace', color:'var(--accent)' }}>{job.salary}</span>}
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:8 }}>
            {job.tags.map(tag => (
              <span key={tag} style={{ fontSize:11, padding:'2px 7px', borderRadius:4, background:'var(--bg-elevated)', color:'var(--text-muted)', fontFamily:'monospace' }}>{tag}</span>
            ))}
            <span style={{ fontSize:11, padding:'2px 7px', borderRadius:4, background:'rgba(96,165,250,0.1)', color:'var(--blue)' }}>{job.platform}</span>
          </div>
          {job.status === 'pending' && (
            <div style={{ display:'flex', gap:8, marginTop:12 }}>
              <button onClick={() => setJobStatus(job.id, 'applied')} className='btn-primary' style={{ fontSize:12, padding:'6px 12px' }}>Apply now</button>
              <button onClick={() => setJobStatus(job.id, 'skipped')} className='btn-ghost' style={{ fontSize:12, padding:'6px 12px' }}>Skip</button>
              <a href={PLATFORM_LINKS[job.platform] || '#'} target='_blank' rel='noreferrer' className='btn-ghost'
                style={{ fontSize:12, padding:'6px 12px', display:'inline-flex', alignItems:'center', gap:4, textDecoration:'none' }}>
                View <ExternalLink size={11} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
"""

with open('src/components/Sidebar.jsx', 'w', encoding='utf-8') as f:
    f.write(sidebar)
print('Sidebar.jsx OK')

with open('src/components/JobCard.jsx', 'w', encoding='utf-8') as f:
    f.write(jobcard)
print('JobCard.jsx OK')