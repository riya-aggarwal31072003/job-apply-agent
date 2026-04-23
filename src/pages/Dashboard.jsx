import React, { useCallback } from 'react'
import { Play, RotateCcw, TrendingUp, Briefcase, Send, XCircle, Clock } from 'lucide-react'
import { StatCard, LogItem, DotLoader, ProgressBar, SectionHeader, EmptyState } from '../components/UI.jsx'
import { useStore } from '../store.js'
import { runAgentSimulation } from '../utils/agent.js'

let cancelAgent = null

export default function Dashboard() {
  const {
    agentRunning, setAgentRunning,
    addLog, clearLogs, logs,
    jobs, setJobStatus, resetJobs,
    getStats, prefs
  } = useStore()

  const stats = getStats()

  const handleRun = useCallback(() => {
    if (agentRunning) return
    setAgentRunning(true)
    resetJobs()
    clearLogs()
    addLog('Agent started. Loading profile and preferences...', 'info')

    cancelAgent = runAgentSimulation({
      onLog:      (msg, type) => addLog(msg, type),
      onApply:    (id) => setJobStatus(id, 'applied'),
      onSkip:     (id) => setJobStatus(id, 'skipped'),
      onComplete: () => { setAgentRunning(false); cancelAgent = null },
    })
  }, [agentRunning])

  const handleStop = () => {
    if (cancelAgent) cancelAgent()
    setAgentRunning(false)
    addLog('Agent stopped by user.', 'error')
    cancelAgent = null
  }

  const handleReset = () => {
    if (agentRunning) handleStop()
    resetJobs()
    clearLogs()
  }

  return (
    <div className="section-enter">
      <SectionHeader
        title="Dashboard"
        description="Monitor your job agent and track applications in real time."
        actions={
          <div className="flex gap-2">
            <button onClick={handleReset} className="btn-ghost">
              <RotateCcw size={14} /> Reset
            </button>
            {agentRunning ? (
              <button onClick={handleStop} className="btn-ghost" style={{ color:'var(--red)', borderColor:'var(--red)' }}>
                <XCircle size={14} /> Stop Agent
              </button>
            ) : (
              <button onClick={handleRun} className="btn-primary">
                <Play size={14} /> Run Agent
              </button>
            )}
          </div>
        }
      />

      {/* Stats grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        <StatCard label="Applied"    value={stats.applied} color="var(--accent)"      icon={Send}       sub="this session" />
        <StatCard label="Jobs Found" value={stats.found}   color="var(--blue)"        icon={Briefcase}  sub="matching your criteria" />
        <StatCard label="In Review"  value={stats.review}  color="var(--amber)"       icon={TrendingUp} sub="awaiting response" />
        <StatCard label="Skipped"    value={stats.skipped} color="var(--text-muted)"  icon={XCircle}    sub="low match or excluded" />
      </div>

      {/* Weekly goal */}
      <div className="glass rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium" style={{ color:'var(--text-secondary)' }}>Weekly goal</span>
          <span className="text-xs font-mono" style={{ color:'var(--text-muted)' }}>
            {stats.applied} / {prefs.maxPerDay * 7} applications
          </span>
        </div>
        <ProgressBar value={stats.applied} max={prefs.maxPerDay * 7} />
        <p className="text-xs mt-2" style={{ color:'var(--text-muted)' }}>
          Max {prefs.maxPerDay} per day · {prefs.workType} · {prefs.role}
        </p>
      </div>

      {/* Agent running indicator */}
      {agentRunning && (
        <div className="mb-4">
          <DotLoader text="Agent is actively scanning and applying to jobs for you…" />
        </div>
      )}

      {/* Activity log */}
      <div className="glass rounded-xl p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold" style={{ color:'var(--text-primary)' }}>Activity log</h3>
          {logs.length > 0 && (
            <button onClick={clearLogs} className="text-xs" style={{ color:'var(--text-muted)' }}>Clear</button>
          )}
        </div>
        {logs.length === 0 ? (
          <EmptyState
            icon={Clock}
            title="No activity yet"
            description='Click "Run Agent" to start automated job discovery and applications.'
          />
        ) : (
          logs.map((log, i) => <LogItem key={i} log={log} />)
        )}
      </div>

      {/* Platform badges */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginTop:16 }}>
        {['LinkedIn', 'Naukri.com', 'Indeed'].map(p => (
          <div key={p} className="glass rounded-xl p-3 text-center">
            <p className="text-xs font-medium" style={{ color:'var(--text-primary)' }}>{p}</p>
            <p className="text-xs mt-0.5" style={{ color:'var(--accent)' }}>Connected</p>
          </div>
        ))}
      </div>
    </div>
  )
}