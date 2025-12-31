"use client";

import Image from "next/image";
import { useState } from "react";

function ComingSoonCard({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className="rounded-2xl border bg-white p-4 shadow-sm"
      style={{ borderColor: "rgb(var(--border))" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold" style={{ color: "rgb(var(--text))" }}>
            {title}
          </h2>
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        </div>

        <span
          className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{
            background: "rgba(var(--accent),0.10)",
            color: "rgb(var(--accent))",
          }}
        >
          Coming soon
        </span>
      </div>

      <div className="mt-4 rounded-xl border bg-slate-50 px-3 py-3 text-sm text-slate-600"
           style={{ borderColor: "rgb(var(--border))" }}>
        This section will be enabled once we finish role-based logins.
      </div>
    </div>
  );
}

function FarzandoLoginCard() {
  const [itsNo, setItsNo] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    setStatus("loading");
    setMessage("");

    const res = await fetch("/api/login/farzando", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itsNo, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setMessage(data?.error ?? "Login failed");
      return;
    }

    setStatus("success");
    setMessage("Login successful ✅");
  }

  return (
    <div
      className="rounded-2xl border bg-white p-5 shadow-sm"
      style={{ borderColor: "rgb(var(--border))" }}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold" style={{ color: "rgb(var(--text))" }}>
            Farzando
          </h2>
          <span
            className="rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{
              background: "rgba(var(--primary),0.10)",
              color: "rgb(var(--primary))",
            }}
          >
            Student login
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-600">
          Use your ITS No and password to sign in.
        </p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-3">
        <div className="grid gap-1.5">
          <label className="text-sm font-medium text-slate-700">ITS No</label>
          <input
            value={itsNo}
            onChange={(e) => setItsNo(e.target.value)}
            inputMode="numeric"
            placeholder="e.g. 12345678"
            className="h-12 w-full rounded-xl border bg-white px-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2"
            style={{
              borderColor: "rgb(var(--border))",
              boxShadow: "none",
              outline: "none",
            }}
          />
        </div>

        <div className="grid gap-1.5">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Your password"
            className="h-12 w-full rounded-xl border bg-white px-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2"
            style={{
              borderColor: "rgb(var(--border))",
              boxShadow: "none",
              outline: "none",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 h-12 w-full rounded-xl font-semibold text-white shadow-sm transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          style={{ backgroundColor: "rgb(var(--primary))" }}
        >
          {status === "loading" ? "Signing in..." : "Sign in"}
        </button>

        {message ? (
          <div
            className="rounded-xl px-3 py-2 text-sm"
            style={{
              border: `1px solid ${
                status === "error" ? "rgba(var(--accent),0.25)" : "rgba(var(--primary),0.25)"
              }`,
              background:
                status === "error" ? "rgba(var(--accent),0.08)" : "rgba(var(--primary),0.08)",
              color: status === "error" ? "rgb(var(--accent))" : "rgb(var(--primary))",
            }}
          >
            {status === "error" ? `❌ ${message}` : message}
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "rgb(var(--bg))",
      }}
    >
      {/* subtle top tint */}
      <div
        className="absolute inset-x-0 top-0 h-64"
        style={{
          background:
            "radial-gradient(900px 260px at 50% 0%, rgba(var(--primary),0.14), rgba(var(--primary),0.00) 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-md px-4 pb-10 pt-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <div
            className="mx-auto mb-3 h-16 w-16 overflow-hidden rounded-2xl bg-white shadow-sm"
            style={{ border: "1px solid rgb(var(--border))" }}
          >
            <Image
              src="/logo.jpg"
              alt="Al Madrasa Al Badriyya Calgary"
              width={160}
              height={160}
              className="h-full w-full object-contain p-1"
              priority
            />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: "rgb(var(--text))" }}>
            Al Madrasa Portal
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Choose your role below. (Only Farzando is enabled right now.)
          </p>
        </div>

        {/* Primary first (enabled), then coming soon */}
        <div className="grid gap-4">
          <FarzandoLoginCard />

          <ComingSoonCard title="Moallim" subtitle="Teacher access" />
          <ComingSoonCard title="Admin" subtitle="Administration access" />
          <ComingSoonCard title="Musaedeen" subtitle="Assistant access" />
          <ComingSoonCard title="Attendance Team" subtitle="Attendance staff access" />
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          If you can’t sign in, contact the madrasa administration.
        </p>
      </div>
    </div>
  );
}
