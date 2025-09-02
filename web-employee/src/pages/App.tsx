import React, { useState } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
export default function App() { const [ok, setOk] = useState(!!localStorage.getItem('accessToken')); return ok ? <Dashboard onLogout={() => { localStorage.clear(); setOk(false) }} /> : <Login onSuccess={() => setOk(true)} /> }
