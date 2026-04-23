import React, { useState } from 'react'
import { Save, Settings, Bot } from 'lucide-react'
import { SectionHeader, Field, Toggle } from '../components/UI.jsx'
import { useStore } from '../store.js'

export default function Preferences() {
  const { prefs, setPrefs } = useStore()
  const [form, setForm] = useState({ ...prefs })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    setPrefs(form)
    alert('Preferences saved!')
  }

  return (
    <div className="section-enter">
      <SectionHeader
        title="Preferences"
        description="Tell the agent exactly what you are looking for."
        actions={
          <button onClick={handleSave} className="btn-primary">
            <Save size={14} /> Save Preferences
          </button>
        }
      />

      <div style={{ display:'grid', gap:16 }}>

        {/* Search criteria */}
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Settings size={14} style={{ color:'var(--accent)' }} />
            <h3 className="text-sm font-semibold" style={{ color:'var(--text-primary)' }}>Job search criteria</h3>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <Field label="Target role">
              <input className="input-field" placeholder="Software Engineer" value={form.role} onChange={e => set('role', e.target.value)} />
            </Field>
            <Field label="Industry">
              <select className="input-field" value={form.industry} onChange={e => set('industry', e.target.value)}>
                {['Technology','Finance','Healthcare','E-commerce','Startup','Consulting','Any'].map(o => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Minimum salary (LPA or $K)">
              <input className="input-field" type="number" placeholder="10" value={form.minSalary} onChange={e => set('minSalary', e.target.value)} />
            </Field>
            <Field label="Work type">
              <select className="input-field" value={form.workType} onChange={e => set('workType', e.target.value)}>
                {['Remote','Hybrid','On-site','Any'].map(o => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Job type">
              <select className="input-field" value={form.jobType} onChange={e => set('jobType', e.target.value)}>
                {['Full-time','Part-time','Contract','Internship'].map(o => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Experience level">
              <select className="input-field" value={form.expLevel} onChange={e => set('expLevel', e.target.value)}>
                {['Entry','Mid','Senior','Lead','Any'].map(o => <option key={o}>{o}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Preferred locations (comma separated)" hint="Leave blank to apply globally">
            <input className="input-field" placeholder="Bangalore, Delhi, Remote, Mumbai..." value={form.locations} onChange={e => set('locations', e.target.value)} />
          </Field>
          <Field label="Exclude companies" hint="Agent will skip jobs from these companies">
            <input className="input-field" placeholder="Company A, Company B..." value={form.excludeCompanies} onChange={e => set('excludeCompanies', e.target.value)} />
          </Field>
        </div>

        {/* Agent settings */}
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bot size={14} style={{ color:'var(--accent)' }} />
            <h3 className="text-sm font-semibold" style={{ color:'var(--text-primary)' }}>Agent behaviour</h3>
          </div>
          <Toggle
            checked={form.autoApply}
            onChange={v => set('autoApply', v)}
            label="Auto-apply to matching jobs"
            sublabel="Agent applies on your behalf without confirmation"
          />
          <Toggle
            checked={form.coverLetterAI}
            onChange={v => set('coverLetterAI', v)}
            label="Generate AI cover letter per job"
            sublabel="Tailored letter using job description and your profile"
          />
          <Toggle
            checked={form.skipLowSalary}
            onChange={v => set('skipLowSalary', v)}
            label="Skip jobs below minimum salary"
            sublabel={`Will skip jobs paying below ${form.minSalary} LPA`}
          />
          <Toggle
            checked={form.emailSummary}
            onChange={v => set('emailSummary', v)}
            label="Email me a daily summary"
            sublabel="Requires backend email setup — see docs/SETUP.md"
          />
          <Toggle
            checked={form.requireApproval}
            onChange={v => set('requireApproval', v)}
            label="Require my approval before applying"
            sublabel="Agent queues jobs for you to review first"
          />
          <div className="mt-4">
            <Field label={`Max applications per day: ${form.maxPerDay}`}>
              <div className="flex items-center gap-3">
                <input
                  type="range" min="1" max="50" step="1"
                  value={form.maxPerDay}
                  onChange={e => set('maxPerDay', Number(e.target.value))}
                  style={{ flex:1, accentColor:'var(--accent)' }}
                />
                <span style={{ fontSize:14, fontFamily:'monospace', fontWeight:500, color:'var(--accent)', minWidth:28, textAlign:'right' }}>
                  {form.maxPerDay}
                </span>
              </div>
            </Field>
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={handleSave} className="btn-primary">
            <Save size={14} /> Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}