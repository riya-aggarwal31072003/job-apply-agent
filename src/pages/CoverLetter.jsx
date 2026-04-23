import React, { useState, useRef } from 'react'
import { Wand2, Copy, Download, RotateCcw, Check, FileText } from 'lucide-react'
import { SectionHeader, Field, DotLoader } from '../components/UI.jsx'
import { useStore } from '../store.js'
import { generateCoverLetter } from '../utils/agent.js'

const TONES = ['Professional', 'Enthusiastic', 'Concise', 'Creative']

export default function CoverLetter() {
  const { profile } = useStore()
  const [form, setForm]     = useState({ jobTitle:'', company:'', jd:'', tone:'Professional' })
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied]   = useState(false)
  const outputRef = useRef(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleGenerate = async () => {
    if (!form.jobTitle || !form.company) {
      alert('Please enter a job title and company name.')
      return
    }
    setLoading(true)
    setOutput('')
    try {
      await generateCoverLetter({
        jobTitle:       form.jobTitle,
        company:        form.company,
        jobDescription: form.jd,
        profile,
        tone:           form.tone,
        onChunk: (char) => {
          setOutput(prev => {
            const next = prev + char
            if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight
            return next
          })
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleDownload = () => {
    const blob = new Blob([output], { type:'text/plain' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `cover-letter-${form.company.replace(/\s+/g,'-').toLowerCase()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="section-enter">
      <SectionHeader
        title="Cover Letter AI"
        description="Generate tailored, compelling cover letters in seconds."
      />

      <div style={{ display:'grid', gridTemplateColumns: output || loading ? '1fr 1fr' : '1fr', gap:16 }}>

        {/* Input panel */}
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={14} style={{ color:'var(--accent)' }} />
            <h3 className="text-sm font-semibold" style={{ color:'var(--text-primary)' }}>Job details</h3>
          </div>

          <Field label="Job title *">
            <input className="input-field" placeholder="Senior Frontend Engineer" value={form.jobTitle} onChange={e => set('jobTitle', e.target.value)} />
          </Field>
          <Field label="Company name *">
            <input className="input-field" placeholder="Razorpay" value={form.company} onChange={e => set('company', e.target.value)} />
          </Field>
          <Field label="Job description" hint="Paste key requirements for a more tailored letter">
            <textarea
              className="input-field"
              rows={5}
              style={{ resize:'vertical' }}
              placeholder="We are looking for an engineer with experience in React, TypeScript..."
              value={form.jd}
              onChange={e => set('jd', e.target.value)}
            />
          </Field>

          <div className="mb-5">
            <label className="label">Tone</label>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {TONES.map(t => (
                <button
                  key={t}
                  onClick={() => set('tone', t)}
                  style={{
                    fontSize:12,
                    padding:'6px 12px',
                    borderRadius:8,
                    cursor:'pointer',
                    transition:'all 0.15s',
                    background: form.tone === t ? 'rgba(74,222,128,0.12)' : 'var(--bg-elevated)',
                    color:      form.tone === t ? 'var(--accent)'          : 'var(--text-muted)',
                    border:     form.tone === t ? '1px solid var(--accent)' : '1px solid var(--border)',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn-primary"
            style={{ width:'100%', justifyContent:'center' }}
          >
            <Wand2 size={14} />
            {loading ? 'Generating…' : 'Generate Cover Letter'}
          </button>

          {!profile.name && (
            <p className="text-xs mt-3 text-center" style={{ color:'var(--text-muted)' }}>
              Tip: Fill your profile for more personalized letters.
            </p>
          )}
        </div>

        {/* Output panel */}
        {(output || loading) && (
          <div className="glass rounded-xl p-5" style={{ display:'flex', flexDirection:'column' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color:'var(--text-primary)' }}>Generated letter</h3>
              {output && !loading && (
                <div className="flex gap-2">
                  <button onClick={handleCopy} className="btn-ghost" style={{ fontSize:12, padding:'4px 10px' }}>
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                  <button onClick={handleDownload} className="btn-ghost" style={{ fontSize:12, padding:'4px 10px' }}>
                    <Download size={12} /> .txt
                  </button>
                  <button onClick={() => { setOutput(''); setLoading(false) }} className="btn-ghost" style={{ fontSize:12, padding:'4px 10px' }}>
                    <RotateCcw size={12} />
                  </button>
                </div>
              )}
            </div>

            {loading && !output && <DotLoader text="Writing your cover letter…" />}

            <div
              ref={outputRef}
              style={{
                fontSize:14,
                lineHeight:1.8,
                color:'var(--text-secondary)',
                whiteSpace:'pre-wrap',
                fontFamily:'DM Sans, sans-serif',
                flex:1,
                overflowY:'auto',
                maxHeight:480,
              }}
            >
              {output}
              {loading && (
                <span style={{ display:'inline-block', width:6, height:16, marginLeft:2, verticalAlign:'middle', background:'var(--accent)', borderRadius:1, animation:'pulse 1s infinite' }} />
              )}
            </div>

            {output && !loading && (
              <div style={{ marginTop:16, paddingTop:16, borderTop:'1px solid var(--border)' }}>
                <p className="text-xs" style={{ color:'var(--text-muted)' }}>
                  Always review before sending. This letter was generated using your profile and job details.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}