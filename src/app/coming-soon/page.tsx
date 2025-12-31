export default function ComingSoonPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "rgb(var(--bg))" }}>
      <div className="mx-auto w-full max-w-md px-4 pb-10 pt-10 text-center">
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: "rgb(var(--text))" }}>
          Coming soon
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          This dashboard is under construction. Please check back soon.
        </p>

        <div
          className="mt-6 rounded-2xl border bg-white p-4 text-left shadow-sm"
          style={{ borderColor: "rgb(var(--border))" }}
        >
          <p className="text-sm text-slate-700">
            We’re currently building:
          </p>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
            <li>Role-based dashboards</li>
            <li>Attendance features</li>
            <li>Student profiles</li>
            <li>Admin tools</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
