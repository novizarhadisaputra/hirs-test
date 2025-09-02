import { useQuery } from '@tanstack/react-query'; import { api } from '../lib/api'; import { useState } from 'react';
const first = () => new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10); const today = () => new Date().toISOString().slice(0, 10);
export default function Summary() {
    const [from, setFrom] = useState(first()); const [to, setTo] = useState(today());
    const { data, isLoading, refetch } = useQuery({ queryKey: ['summary', from, to], queryFn: async () => (await api.get(`/attendance/summary?from=${from}&to=${to}`)).data });
    return (<div className="card"><h2 className="text-lg font-semibold mb-2">Summary Absen</h2><div className="flex gap-2 mb-4"><input type="date" className="input" value={from} onChange={e => setFrom(e.target.value)} /><input type="date" className="input" value={to} onChange={e => setTo(e.target.value)} /><button className="btn" onClick={() => refetch()}>Filter</button></div>{isLoading ? 'Loading...' : (<table className="table"><thead><tr><th>Tanggal</th><th>Waktu</th><th>Status</th></tr></thead><tbody>{data?.items?.map((r: any) => (<tr key={r.id}><td>{r.date}</td><td>{r.time}</td><td>{r.status}</td></tr>))}</tbody></table>)}</div>);
}
