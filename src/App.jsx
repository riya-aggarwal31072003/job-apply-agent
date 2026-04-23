import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import Preferences from './pages/Preferences.jsx'
import Jobs from './pages/Jobs.jsx'
import CoverLetter from './pages/CoverLetter.jsx'

export default function App() {
  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'var(--bg-primary)' }}>

      <Sidebar />

      <main style={{ flex:1, overflowY:'auto', background:'var(--bg-primary)', position:'relative' }}>

        {/* Grid pattern background */}
        <div
          className="grid-pattern"
          style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:0.4, zIndex:0 }}
        />

        {/* Page content */}
        <div style={{ position:'relative', zIndex:10, maxWidth:896, margin:'0 auto', padding:'2rem' }}>
          <Routes>
            <Route path="/"        element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/prefs"   element={<Preferences />} />
            <Route path="/jobs"    element={<Jobs />} />
            <Route path="/cover"   element={<CoverLetter />} />
          </Routes>
        </div>
      </main>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-elevated)',
            color:      'var(--text-primary)',
            border:     '1px solid var(--border)',
            fontSize:   13,
            fontFamily: 'DM Sans, sans-serif',
          },
          success: { iconTheme: { primary:'#4ade80', secondary:'#0a0e1a' } },
          error:   { iconTheme: { primary:'#f87171', secondary:'#0a0e1a' } },
        }}
      />
    </div>
  )
}