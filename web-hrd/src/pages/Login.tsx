import React, { useState, type JSX } from "react";
import { api } from "../lib/api";

export default function Login({
    onSuccess,
}: {
    onSuccess: () => void;
}): JSX.Element {
    const [email, setEmail] = useState("admin@corp.com");
    const [password, setPassword] = useState("Admin123!");
    const [err, setErr] = useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const r = await api.post("/auth/login", { email, password });
            localStorage.setItem("accessToken", r.data.accessToken);
            onSuccess();
        } catch (e: any) {
            setErr(e?.response?.data?.message || "Login gagal");
        }
    };

    return (
        <div className="h-dvh flex items-center justify-center">
            <form onSubmit={submit} className="card w-96 space-y-3">
                <h1 className="text-2xl font-semibold">Login HRD</h1>
                {!!err && <div className="text-red-600 text-sm">{err}</div>}

                <label className="text-sm">Email</label>
                <input
                    className="input"
                    placeholder="admin@corp.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className="text-sm">Password</label>
                <input
                    type="password"
                    className="input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn w-full">Masuk</button>
            </form>
        </div>
    );
}
