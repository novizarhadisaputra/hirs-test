import React, { useState, type JSX } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function App(): JSX.Element {
    const [authed, setAuthed] = useState<boolean>(
        !!localStorage.getItem("accessToken")
    );

    return authed ? (
        <Dashboard
            onLogout={() => {
                localStorage.clear();
                setAuthed(false);
            }}
        />
    ) : (
        <Login onSuccess={() => setAuthed(true)} />
    );
}
