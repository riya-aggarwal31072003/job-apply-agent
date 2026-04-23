import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, User, Settings, Briefcase, FileText, Github, ExternalLink } from 'lucide-react'
import { useStore } from '../store.js'

const NAV = [
  { to:'/',        icon:LayoutDashboard, label:'Dashboard' },
  { to:'/profile', icon:User,            label:'My Profile' },
  { to:'/prefs',   icon:Settings,        label:'Preferences' },
  { to:'/jobs',    icon:Briefcase,       label:'Job Queue' },
  { to:'/cover',   icon:FileText,        label:'Cover Letter AI' },
]

export default function Sidebar() {
  const { agentRunning, getStats } = useStore()
  const stats = getStats()

  return (
    <aside style={{ width:220, background:'var(--bg-secondary)', borderRight:'1px solid var(--border)', padding:'1.25rem 0.75rem', display:'flex', flexDirection:'column', height:'100%' }}>

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <div style={{ width:32, height:32, borderRadius:8, background:'var(--accent)', color:'#0a0e1a', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14, fontFamily:'Syne, sans-serif' }}>
          J
        </div>
        <div>
          <p style={{ fontSize:14, fontWeight:600, fontFamily:'Syne, sans-serif', color:'var(--text-primary)', lineHeight:1.2 }}>JobAgent</p>
          <p style={{ fontSize:11, color:'var(--text-muted)' }}>Apply on autopilot</p>
        </div>
      </div>

      {/* Agent status */}
      <div className="mx-3 mb-6 px-3 py-2 rounded-lg" style={{ background: agentRunning ? 'rgba(74,222,128,0.12)' : 'var(--bg-elevated)', border:'1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <div style={{ width:8, height:8, borderRadius:'50%', background: agentRunning ? 'var(--accent)' : 'var(--text-muted)', boxShadow: agentRunning ? '0 0 8px var(--accent)' : 'none' }} />
          <span style={{ fontSize:12, fontWeight:500, color: agentRunning ? 'var(--accent)' : 'var(--text-muted)' }}>
            {agentRunning ? 'Agent running…' : 'Agent idle'}
          </span>
        </div>
        <p style={{ fontSize:11, color:'var(--text-muted)', marginTop:6 }}>
          {stats.applied} applied · {stats.found} found
        </p>
      </div>

      {/* Nav links */}
      <nav style={{ display:'flex', flexDirection:'column', gap:2, flex:1 }}>
        {NAV.map(({ to, icon:Icon, label }) => (
          <NavLink
            key={to}
            to={to