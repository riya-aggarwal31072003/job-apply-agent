import React from 'react'
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
