import React from 'react'
import Profile from './Profile'
import Attendance from './Attendance'
import Summary from './Summary'
export default function Dashboard({ onLogout }: { onLogout: () => void }) {
    const [tab, setTab] = React.useState<'profile' | 'attendance' | 'summary'>('profile');
    return (<div className="max-w-4xl mx-auto p-4 space-y-4"><header className="flex items-center justify-between"><h1 className="text-xl font-semibold">Employee Portal</h1><nav className="flex gap-2"><button className="btn" onClick={() => setTab('profile')}>Profil</button><button className="btn" onClick={() => setTab('attendance')}>Absen</button><button className="btn" onClick={() => setTab('summary')}>Summary</button><button className="btn !bg-gray-600 hover:!bg-gray-700" onClick={onLogout}>Logout</button></nav></header><main>{tab === 'profile' && <Profile />}{tab === 'attendance' && <Attendance />}{tab === 'summary' && <Summary />}</main></div>);
}
