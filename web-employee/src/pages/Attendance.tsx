import { useMutation } from '@tanstack/react-query'; import { api } from '../lib/api';
export default function Attendance() {
    const mut = useMutation({ mutationFn: (s: 'IN' | 'OUT') => api.post('/attendance/check', { status: s }) });
    return (<div className="card flex gap-4"><button className="btn" onClick={() => mut.mutate('IN')}>Absen Masuk</button><button className="btn" onClick={() => mut.mutate('OUT')}>Absen Pulang</button></div>);
}
