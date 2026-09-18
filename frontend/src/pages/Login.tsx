import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [companyCode, setCompanyCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!companyCode.trim() || !password.trim()) {
      setError("Enter your company code and password.");
      return;
    }
    // No backend auth yet -- any non-empty input proceeds.
    navigate("/");
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-bg px-6">
      <div className="w-full max-w-xs">
        <div className="mb-10 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-dim bg-surface">
            <Zap size={22} className="text-accent" />
          </div>
          <h1 className="text-lg font-medium">Fleet charging</h1>
          <p className="text-center text-[13px] text-text-muted">
            Sign in with the account issued by your company
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label htmlFor="companyCode" className="mb-1 block text-[12px] text-text-muted">
              Company code
            </label>
            <input
              id="companyCode"
              type="text"
              placeholder="e.g. BKW-4471"
              value={companyCode}
              onChange={(e) => setCompanyCode(e.target.value)}
              className="w-full rounded border border-border bg-surface px-3 py-2.5 text-[14px] text-text placeholder:text-text-faint focus:border-accent-dim focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-[12px] text-text-muted">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-border bg-surface px-3 py-2.5 text-[14px] text-text placeholder:text-text-faint focus:border-accent-dim focus:outline-none"
            />
          </div>

          {error && <p className="text-[12px] text-accent">{error}</p>}

          <button
            type="submit"
            className="mt-2 w-full rounded bg-accent py-2.5 text-[14px] font-medium text-text hover:bg-accent-dim"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-[12px] text-text-faint">
          Accounts are issued by your company's fleet administrator.
        </p>
      </div>
    </div>
  );
}
