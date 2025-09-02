import React, { type JSX } from "react";
import Users from "./Users";
import AttendanceMonitor from "./AttendanceMonitor";

export default function Dashboard({
    onLogout,
}: {
    onLogout: () => void;
}): JSX.Element {
    const [tab, setTab] = React.useState<"users" | "att">("users");

    return (
        <div className="max-w-5xl mx-auto p-4 space-y-4">
            <header className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">HRD Panel</h1>
                <nav className="flex gap-2">
                    <button
                        className={`btn ${tab === "users" ? "opacity-100" : "opacity-80"}`}
                        onClick={() => setTab("users")}
                    >
                        Karyawan
                    </button>
                    <button
                        className={`btn ${tab === "att" ? "opacity-100" : "opacity-80"}`}
                        onClick={() => setTab("att")}
                    >
                        Absensi
                    </button>
                    <button
                        className="btn !bg-gray-600 hover:!bg-gray-700"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </nav>
            </header>

            <main>
                {tab === "users" && <Users />}
                {tab === "att" && <AttendanceMonitor />}
            </main>
        </div>
    );
}
