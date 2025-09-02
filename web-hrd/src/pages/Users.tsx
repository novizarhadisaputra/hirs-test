import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useState, type JSX } from "react";

type Role = "EMPLOYEE" | "ADMIN";
type UserRow = {
    id: string;
    email: string;
    name: string;
    role: Role;
    position?: string | null;
    phone?: string | null;
    photo_url?: string | null;
};

export default function Users(): JSX.Element {
    const qc = useQueryClient();

    const users = useQuery<UserRow[]>({
        queryKey: ["users"],
        queryFn: async () => (await api.get("/admin/users")).data,
    });

    const create = useMutation({
        mutationFn: (payload: Partial<UserRow> & { password?: string }) =>
            api.post("/admin/users", payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
    });

    const update = useMutation({
        mutationFn: (payload: Partial<UserRow> & { id: string }) =>
            api.patch(`/admin/users/${payload.id}`, payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
    });

    const [email, setEmail] = useState("new@corp.com");
    const [password, setPassword] = useState("Employee123!");
    const [name, setName] = useState("New Employee");
    const [role, setRole] = useState<Role>("EMPLOYEE");

    return (
        <div className="card space-y-4">
            <h2 className="text-lg font-semibold">Manajemen Karyawan</h2>

            <div className="grid md:grid-cols-5 gap-2 items-end">
                <div>
                    <label className="text-sm">Email</label>
                    <input
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="new@corp.com"
                    />
                </div>
                <div>
                    <label className="text-sm">Nama</label>
                    <input
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="New Employee"
                    />
                </div>
                <div>
                    <label className="text-sm">Password</label>
                    <input
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Employee123!"
                    />
                </div>
                <div>
                    <label className="text-sm">Role</label>
                    <select
                        className="input"
                        value={role}
                        onChange={(e) => setRole(e.target.value as Role)}
                    >
                        <option value="EMPLOYEE">EMPLOYEE</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>
                <div>
                    <button
                        className="btn w-full"
                        onClick={() =>
                            create.mutate({ email, password, name, role })
                        }
                    >
                        Tambah
                    </button>
                </div>
            </div>

            <div className="overflow-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Nama</th>
                            <th>Role</th>
                            <th>Posisi</th>
                            <th>HP</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data?.map((u) => (
                            <tr key={u.id}>
                                <td>{u.email}</td>
                                <td>{u.name}</td>
                                <td>{u.role}</td>
                                <td>{u.position || "-"}</td>
                                <td>{u.phone || "-"}</td>
                                <td className="space-x-2">
                                    <button
                                        className="btn"
                                        onClick={() =>
                                            update.mutate({
                                                id: u.id,
                                                role: u.role === "EMPLOYEE" ? "ADMIN" : "EMPLOYEE",
                                            })
                                        }
                                    >
                                        Toggle Role
                                    </button>
                                    {/* contoh update nama cepat */}
                                    <button
                                        className="btn"
                                        onClick={() =>
                                            update.mutate({
                                                id: u.id,
                                                name: `${u.name || "User"} ✓`,
                                            })
                                        }
                                    >
                                        Rename (+✓)
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.isLoading && (
                            <tr>
                                <td colSpan={6}>Loading...</td>
                            </tr>
                        )}
                        {!users.isLoading && !users.data?.length && (
                            <tr>
                                <td colSpan={6}>Belum ada data.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
