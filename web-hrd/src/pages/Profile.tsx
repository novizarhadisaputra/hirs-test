import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; import { api } from '../lib/api';
export default function Profile() {
    const qc = useQueryClient(); const me = useQuery({ queryKey: ['me'], queryFn: async () => (await api.get('/me')).data });
    const mut = useMutation({ mutationFn: async (p: any) => (await api.patch('/me', p)).data, onSuccess: () => qc.invalidateQueries({ queryKey: ['me'] }) });
    if (me.isLoading) return <div>Loading...</div>; const user = me.data;
    return (<div className="card space-y-2"><h2 className="text-lg font-semibold">Profil</h2><div className="grid gap-2">
        <label>Nama</label><input className="input" value={user.name} readOnly />
        <label>Email</label><input className="input" value={user.email} readOnly />
        <label>Posisi</label><input className="input" value={user.position || ''} readOnly />
        <label>No HP</label><input className="input" defaultValue={user.phone || ''} onBlur={e => mut.mutate({ phone: e.target.value })} />
        <label>Foto URL</label><input className="input" defaultValue={user.photo_url || ''} onBlur={e => mut.mutate({ photo_url: e.target.value })} />
        <label>Password Baru</label><input type="password" className="input" onBlur={e => e.target.value && mut.mutate({ password: e.target.value })} />
    </div></div>);
}
