import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useState, type JSX } from "react";

type Row = {
    id: string;
    user_id: string;
    date: string;  // YYYY-MM-DD
    time: string;  // HH:mm:ss
    status: "IN" | "OUT";
};

export default function AttendanceMonitor(): JSX.Element {
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [userId, setUserId] = useState<string>("");

    const q = new URLSearchParams();
    if (from) q.set("from", from);
    if (to) q.set("to", to);
    if (userId) q.set("userId", userId);

    const { data, isLoading, refetch } = useQuery<{ items: Row[] }>({
        queryKey: ["admin-att", from, to, userId],
        queryFn: async () =>
            (await api.get(`/admin/attendance?${q.toString()}`)).data,
    });

    return (
        <div className="card space-y-4">
            <h2 className="text-lg font-semibold">Absensi Semua Karyawan</h2>

            <div className="grid md:grid-cols-5 gap-2 items-end">
                <div>
                    <label className="text-sm">Dari Tanggal</label>
                    <input
                        type="date"
                        className="input"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-sm">Sampai Tanggal</label>
                    <input
                        type="date"
                        className="input"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="text-sm">Filter User ID (opsional)</label>
                    <input
                        className="input"
                        placeholder="UUID user"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <div>
                    <button className="btn w-full" onClick={() => refetch()}>
                        Terapkan
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="overflow-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Tanggal</th>
                                <th>Waktu</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.items?.map((r) => (
                                <tr key={r.id}>
                                    <td className="font-mono">{r.user_id}</td>
                                    <td>{r.date}</td>
                                    <td>{r.time}</td>
                                    <td>{r.status}</td>
                                </tr>
                            ))}
                            {!data?.items?.length && (
                                <tr>
                                    <td colSpan={4}>Tidak ada data untuk filter ini.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
