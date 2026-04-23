import React from 'react'
import { CheckCircle, AlertCircle, Info, Zap, XCircle } from 'lucide-react'

export function Toggle({ checked, onChange, label, sublabel }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b" style={{ borderColor: 'var(--border)' }}>
      <div>
        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</p>
        {sublabel && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{sublabel}</p>}
      </div>
      <label style={{ position:'relative', display:'inline-block', width:40, height:24, cursor:'pointer' }}>
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ opacity:0, width:0, height:0 }} />
        <span style={{ position:'absolute', inset:0, borderRadius:12, background: checked ? 'var(--accent)' : 'var(--bg-elevated)', border:'1px solid var(--border)', transition:'0.2s' }} />
        <span style={{ position:'absolute', top:3, left: checked ? 19 : 3, width:16, height:16, borderRadius:'50%', background: checked ? '#0a0e1a' : 'var(--text-muted)', transition:'0.2s' }} />
      </label>
    </div>
  )
}

export function StatCard({ label, value, color, icon: Icon, sub }) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{label}</span>
        {Icon && <Icon size={14} style={{ color }} />}
      </div>
      <p className="text-3xl font-bold" style={{ color, fontFamily: 'Syne, sans-serif' }}>{value}</p>
      {sub && <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{sub}</p>}
    </div>
  )
}

const LOG_STYLES = {
  info:    { color: 'var(--blue)',       Icon: Info },
  success: { color: 'var(--accent)',     Icon: CheckCircle },
  skip:    { color: 'var(--text-muted)', Icon: XCircle },
  ai:      { color: 'var(--purple)',     Icon: Zap },
  error:   { color: 'var(--red)',        Icon: AlertCircle },
  done:    { color: 'var(--accent)',     Icon: CheckCircle },
}

export function LogItem({ log }) {
  const { color, Icon } = LOG_STYLES[log.type] || LOG_STYLES.info
  const time = log.ts ? new Date(log.ts).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }) : ''
  return (
    <div className="flex items-start gap-3 py-2.5 border-b" style={{ borderColor: 'var(--border)' }}>
      <Icon size={14} style={{ color, flexShrink:0, marginTop:2 }} />
      <p className="text-sm flex-1" style={{ color: 'var(--text-secondary)' }}>{log.msg}</p>
      <span className="text-xs flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{time}</span>
    </div>
  )
}

export function DotLoader({ text }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg" style={{ background: 'rgba(74,222,128,0.12)' }}>
      <div className="dot-loader"><span /><span /><span /></div>
      <span className="text-sm" style={{ color: 'var(--accent)' }}>{text}</span>
    </div>
  )
}

export function SectionHeader({ title, description, actions }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-lg font-semibold" style={{ fontFamily:'Syne, sans-serif', color:'var(--text-primary)' }}>{title}</h2>
        {description && <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

export function Field({ label, children, hint }) {
  return (
    <div className="mb-4">
      <label className="label">{label}</label>
      {children}
      {hint && <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{hint}</p>}
    </div>
  )
}

export function ProgressBar({ value, max }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}

export function MatchBadge({ score }) {
  const color = score >= 90 ? 'var(--accent)' : score >= 80 ? 'var(--blue)' : score >= 70 ? 'var(--amber)' : 'var(--red)'
  return <span className="text-xs font-mono font-medium" style={{ color }}>{score}% match</span>
}

export function StatusBadge({ status }) {
  const map = { pending:'badge-amber', applied:'badge-green', review:'badge-blue', skipped:'badge-gray' }
  const labels = { pending:'Pending', applied:'Applied', review:'In Review', skipped:'Skipped' }
  return <span className={`badge ${map[status] || 'badge-gray'}`}>{labels[status] || status}</span>
}

export function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: 'var(--bg-elevated)' }}>
        <Icon size={20} style={{ color: 'var(--text-muted)' }} />
      </div>
      <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{title}</p>
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{description}</p>
    </div>
  )
}