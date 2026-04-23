import React from 'react'

export default function Footer() {
  return (
    <div style={{ textAlign:'center', padding:'16px', borderTop:'1px solid var(--border)', background:'var(--bg-secondary)', fontSize:13, color:'var(--text-muted)', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
      <span>Built with</span>
      <span style={{ color:'#f87171', fontSize:16 }}>&#9829;</span>
      <span>by</span>
      <a href='https://www.linkedin.com/in/riya-aggarwal-28429b260/' target='_blank' rel='noreferrer' style={{ color:'var(--accent)', textDecoration:'none', fontWeight:600, borderBottom:'1px solid rgba(74,222,128,0.4)', paddingBottom:1 }}>Riya Aggarwal</a>
    </div>
  )
}
