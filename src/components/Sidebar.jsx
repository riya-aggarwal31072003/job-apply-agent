import React from 'react'
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
