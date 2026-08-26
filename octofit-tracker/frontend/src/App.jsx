import { useEffect, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiFetch } from './api.js'
import './App.css'

function App() {
  const [summary, setSummary] = useState({ users: 0, activities: 0, teams: 0 })

  useEffect(() => {
    Promise.all([apiFetch('/api/users/'), apiFetch('/api/activities/'), apiFetch('/api/teams/')])
      .then(([users, activities, teams]) => setSummary({ users: users.length, activities: activities.length, teams: teams.length }))
      .catch(() => {})
  }, [])

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><img src="/octofitapp-small.png" alt="" /><span>OCTOFIT<small>TRACKER</small></span></div>
      <p className="sidebar-label">Workspace</p>
      <nav className="main-nav">
        <NavLink to="/" end><span>◈</span>Overview</NavLink>
        <NavLink to="/activities"><span>◒</span>Activities</NavLink>
        <NavLink to="/leaderboard"><span>♜</span>Leaderboard</NavLink>
        <NavLink to="/teams"><span>◎</span>Teams</NavLink>
        <NavLink to="/users"><span>♙</span>Members</NavLink>
        <NavLink to="/workouts"><span>◷</span>Workouts</NavLink>
      </nav>
      <div className="sidebar-footer"><span className="status-dot" />All systems operational</div>
    </aside>
    <main className="main-content">
      <header className="topbar"><div><span className="breadcrumb">OCTOFIT / </span><PageTitle /></div><div className="profile"><span className="avatar">JS</span><span>Jordan Smith</span><span className="chevron">⌄</span></div></header>
      <Routes>
        <Route path="/" element={<Overview summary={summary} />} />
        <Route path="/activities" element={<Page title="Activity log" kicker="Movement" component={<Activities />} />} />
        <Route path="/leaderboard" element={<Page title="Leaderboard" kicker="Competition" component={<Leaderboard />} />} />
        <Route path="/teams" element={<Page title="Your teams" kicker="Community" component={<Teams />} />} />
        <Route path="/users" element={<Page title="Members" kicker="Community" component={<Users />} />} />
        <Route path="/workouts" element={<Page title="Workout library" kicker="Training" component={<Workouts />} />} />
      </Routes>
    </main>
  </div>
}

function PageTitle() {
  const location = useLocation()
  return <span>{location.pathname === '/' ? 'OVERVIEW' : location.pathname.slice(1).toUpperCase()}</span>
}

function Page({ title, kicker, component }) {
  return <section className="page"><div className="page-heading"><div><p className="kicker">{kicker}</p><h1>{title}</h1></div><button className="outline-button" type="button">&#8635; Refresh data</button></div>{component}</section>
}

function Overview({ summary }) {
  return <section className="page overview"><div className="welcome"><div><p className="kicker muted-kicker">Wednesday, August 26, 2026</p><h1>Good morning, Jordan<span>.</span></h1><p className="intro">A clear view of your team&apos;s momentum, one session at a time.</p></div><div className="streak"><strong>08</strong><span>DAY<br />STREAK</span></div></div><div className="metric-grid"><Metric label="Active members" value={summary.users} change="Across all teams" icon="♙" /><Metric label="Activities logged" value={summary.activities} change="This season" icon="◒" /><Metric label="Teams competing" value={summary.teams} change="Keep pushing" icon="◎" /></div><div className="overview-grid"><div className="spotlight"><div className="section-head"><div><p className="kicker">Keep moving</p><h2>Recommended for you</h2></div><NavLink to="/workouts">View library &#8594;</NavLink></div><div className="spotlight-body"><div className="spotlight-icon">↗</div><div><span className="eyebrow">Intermediate · 45 min</span><h3>Full Body Blast</h3><p>Strength, balance, and a little grit to carry you through the week.</p></div><NavLink className="play-button" to="/workouts" aria-label="Open workout">&#8594;</NavLink></div></div><div className="quote-panel"><span className="quote-mark">“</span><p>Small actions, repeated consistently, create remarkable change.</p><span className="quote-author">OCTOFIT PRINCIPLE 01</span></div></div></section>
}

function Metric({ label, value, change, icon }) { return <div className="metric"><span className="metric-icon">{icon}</span><div><p>{label}</p><strong>{value}</strong><small>{change}</small></div></div> }

export default App
