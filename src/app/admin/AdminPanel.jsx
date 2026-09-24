"use client";

import { useCallback, useEffect, useState } from "react";
import SubmissionDetailModal from "./SubmissionDetailModal";

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleString();
}

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const [submissions, setSubmissions] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const checkSession = useCallback(async () => {
    const res = await fetch("/api/admin/me", { credentials: "include" });
    const data = await res.json();
    setAuthenticated(Boolean(data.authenticated));
    return Boolean(data.authenticated);
  }, []);

  const loadSubmissions = useCallback(async () => {
    setLoadingData(true);
    setDataError("");
    try {
      const res = await fetch("/api/admin/submissions?limit=200", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to load data");
      }
      setSubmissions(data.items || []);
      setTotal(data.total ?? 0);
    } catch (err) {
      setDataError(err.message || "Failed to load submissions");
      setSubmissions([]);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (authenticated) {
      loadSubmissions();
    }
  }, [authenticated, loadSubmissions]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoadingLogin(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Login failed");
      }
      setPassword("");
      setAuthenticated(true);
      await loadSubmissions();
    } catch (err) {
      setLoginError(err.message || "Login failed");
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    setAuthenticated(false);
    setSubmissions([]);
    setSelectedSubmission(null);
  };

  if (authenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8faff] text-[#69729F]">
        Loading…
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8faff] px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-2xl border border-[#E1E7F6] bg-white p-8 shadow-[0_24px_60px_rgba(41,59,147,0.12)]"
        >
          <h1 className="text-xl font-semibold text-[#000032]">Cambodia form admin</h1>
          <p className="mt-2 text-sm text-[#69729F]">Sign in with your admin credentials.</p>

          <label className="mt-6 block text-sm font-medium text-[#000032]">
            Username
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[#E1E7F6] px-3 py-2.5 text-sm outline-none focus:border-[#293B93] focus:ring-1 focus:ring-[#293B93]"
              required
            />
          </label>

          <label className="mt-4 block text-sm font-medium text-[#000032]">
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[#E1E7F6] px-3 py-2.5 text-sm outline-none focus:border-[#293B93] focus:ring-1 focus:ring-[#293B93]"
              required
            />
          </label>

          {loginError ? <p className="mt-3 text-sm text-red-600">{loginError}</p> : null}

          <button
            type="submit"
            disabled={loadingLogin}
            className="mt-6 w-full rounded-full bg-[#293B93] py-3 text-sm font-semibold text-white hover:bg-[#243575] disabled:opacity-60"
          >
            {loadingLogin ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#f8faff] px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-[#000032]">Cambodia live account submissions</h1>
              <p className="mt-1 text-sm text-[#69729F]">
                {total} record{total === 1 ? "" : "s"} in MongoDB collection
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={loadSubmissions}
                disabled={loadingData}
                className="rounded-full border border-[#293B93] px-5 py-2 text-sm font-medium text-[#293B93] hover:bg-[#f7f8fc] disabled:opacity-60"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-[#293B93] px-5 py-2 text-sm font-semibold text-white hover:bg-[#243575]"
              >
                Log out
              </button>
            </div>
          </div>

          {dataError ? (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {dataError}
            </div>
          ) : null}

          <div className="overflow-hidden rounded-2xl border border-[#E1E7F6] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-[#EEF2FF] bg-[#F8F9FD] text-xs uppercase tracking-wide text-[#69729F]">
                  <tr>
                    <th className="px-4 py-3">Reference</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Locale</th>
                    <th className="px-4 py-3">Submitted</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingData && submissions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-[#69729F]">
                        Loading submissions…
                      </td>
                    </tr>
                  ) : null}
                  {!loadingData && submissions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-[#69729F]">
                        No submissions yet.
                      </td>
                    </tr>
                  ) : null}
                  {submissions.map((row) => (
                    <tr key={row.id} className="border-b border-[#EEF2FF] hover:bg-[#FAFBFF]">
                      <td className="px-4 py-3 font-medium text-[#293B93]">{row.applicationReference || "—"}</td>
                      <td className="px-4 py-3 text-[#000032]">{row.fullName || "—"}</td>
                      <td className="px-4 py-3">{row.email || "—"}</td>
                      <td className="px-4 py-3">{row.phone || "—"}</td>
                      <td className="px-4 py-3">{row.locale || "—"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{formatDate(row.createdAt)}</td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => setSelectedSubmission(row)}
                          className="rounded-full border border-[#293B93] px-4 py-1.5 text-sm font-medium text-[#293B93] hover:bg-[#f7f8fc]"
                        >
                          View detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedSubmission ? (
        <SubmissionDetailModal submission={selectedSubmission} onClose={() => setSelectedSubmission(null)} />
      ) : null}
    </>
  );
}
