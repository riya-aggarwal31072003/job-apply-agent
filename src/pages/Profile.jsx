import React, { useState } from 'react'
import { Save, User, Link, Upload } from 'lucide-react'
import { SectionHeader, Field } from '../components/UI.jsx'
import { useStore } from '../store.js'

export default function Profile() {
  const { profile, setProfile } = useStore()
  const [form, setForm] = useState({ ...profile })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    setProfile(form)
    alert('Profile saved!')
  }

  return (
    <div className="section-enter">
      <SectionHeader
        title="My Profile"
        description="Your information is used by the agent to fill applications automatically."
        actions={
          <button onClick={handleSave} className="btn-primary">
            <Save size={14} /> Save Profile
          </button>
        }
      />

      <div style={{ display:'grid', gap:16 }}>

        {/* Personal info */}
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <User size={14} style={{ color:'var(--accent)' }} />
            <h3 className="text-sm font-semibold" style={{ color:'var(--text-primary)' }}>Personal info</h3>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <Field label="Full name">
              <input className="input-field" placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} />
            </Field>
            <Field label="Email">
              <input className="input-field" type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
            </Field>
            <Field label="Phone">
              <input className="input-field" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => set('phone', e.target.value)} />
            </Field>
            <Field label="Location">
              <input className="input-field" placeholder="City, Country" value={form.location} onChange={e => set('location', e.target.value)} />
            </Field>
          </div>
        </div>

        {/* Online presence */}
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Link size={14} style={{ color:'var(--accent)' }} />
            <h3 className="text-sm font-semibold" style={{ color:'var(--text-primary)' }}>Online presence</h3>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <Field label="LinkedIn URL">
              <input className="input-field" placeholder="linkedin.com/in/yourname" value={form.linkedin} onChange={e => set('linkedin', e.target.value)} />
            </Field>
            <Field label="Portfolio / GitHub">
              <input className="input-field" placeholder="github.com/yourname" value={form.portfolio} onChange={e => set('portfolio', e.target.value)} />
            </Field>
          </div>
        </div>

        {/* Professional */}
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Upload size={14} style={{ color:'var(--accent)' }} />
            <h3 className="text-sm font-semibold" style={{ color:'var(--text-primary)' }}>Professional details</h3>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <Field label="Current / target title">
              <input className="input-field" placeholder="Software Engineer" value={form.title} onChange={e => set('title', e.target.value)} />
            </Field>
            <Field label="Years of experience">
              <input className="input-field" type="number" min="0" max="50" placeholder="5" value={form.years} onChange={e => set('years', e.target.value)} />
            </Field>
          </div>
          <Field label="Top skills (comma separated)" hint="The agent matches these against job requirements">
            <input className="input-field" placeholder="React, Node.js, Python, AWS, SQL..." value={form.skills} onChange={e => set('skills', e.target.value)} />
          </Field>
          <Field label="Professional summary" hint="Used in applications and cover letters">
            <textarea
              className="input-field"
              rows={4}
              style={{ resize:'vertical' }}
              placeholder="Experienced software engineer with 5+ years building scalable web applications..."
              value={form.summary}
              onChange={e => set('summary', e.target.value)}
            />
          </Field>
        </div>

        {/* Resume note */}
        <div className="glass rounded-xl p-4" style={{ borderColor:'rgba(74,222,128,0.2)' }}>
          <div className="flex items-start gap-3">
            <Upload size={14} style={{ color:'var(--accent)', marginTop:2 }} />
            <div>
              <p className="text-sm font-medium" style={{ color:'var(--text-primary)' }}>Resume upload</p>
              <p className="text-xs mt-0.5" style={{ color:'var(--text-muted)' }}>
                Resume upload (PDF) is handled by the backend. See docs/SETUP.md for configuration details.
                The agent will auto-attach your resume to each application.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={handleSave} className="btn-primary">
            <Save size={14} /> Save Profile
          </button>
        </div>
      </div>
    </div>
  )
}