import React, { useState } from 'react'
import { Briefcase, Filter } from 'lucide-react'
import { SectionHeader, EmptyState } from '../components/UI.jsx'
import JobCard from '../components/JobCard.jsx'
import { useStore } from '../store.js'

const FILTERS = [
  { label:'All',       value:'all' },
  { label:'Pending',   value:'pending' },
  { label:'Applied',   value:'applied' },
  { label:'In Review', value:'review' },
  { label:'Skipped',   value:'skipped' },
]

export default function Jobs() {
  const { jobs, getStats } = useStore()
  const [filter, setFilter] = useState('all')
  const [sort, setSort]     = useState('match')
  const stats = getStats()

  const filtered = jobs
    .filter(j => filter === 'all' || j.status === filter)
    .sort((a, b) => sort === 'match' ? b.match - a.match : 0)

  return (
    <div className="section-enter">
      <SectionHeader
        title="Job Queue"
        description={`${stats.found} jobs found · ${stats.applied} applied · ${stats.pending} pending`}
        actions={
          <div className="flex items-center gap-2">
            <Filter size={14} style={{ color:'var(--text-muted)' }} />
            <select
              className="input-field"
              style={{ width:'auto', padding:'6px 10px' }}
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="match">Sort by match</option>
              <option value="date">Sort by date</option>
            </select>
          </div>
        }
      />

      {/* Filter tabs */}
      <div style={{ display:'flex', gap:6, marginBottom:20, flexWrap:'wrap' }}>
        {FILTERS.map(f => {
          const count = f.value === 'all'
            ? jobs.length
            : jobs.filter(j => j.status === f.value).length
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              style={{
                fontSize:12,
                padding:'6px 12px',
                borderRadius:8,
                fontWeight:500,
                cursor:'pointer',
                transition:'all 0.15s',
                background: filter === f.value ? 'rgba(74,222,128,0.12)' : 'var(--bg-elevated)',
                color:      filter === f.value ? 'var(--accent)'          : 'var(--text-muted)',
                border:     filter === f.value ? '1px solid var(--accent)' : '1px solid var(--border)',
              }}
            >
              {f.label} <span style={{ opacity:0.6, marginLeft:4 }}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* Job list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No jobs here"
          description="Run the agent from the Dashboard to populate the queue."
        />
      ) : (
        filtered.map(job => <JobCard key={job.id} job={job} />)
      )}
    </div>
  )
}