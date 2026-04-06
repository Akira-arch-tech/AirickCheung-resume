import { useState } from "react";

interface LoginViewProps {
  onLogin: () => void;
}

/** PRD P2 · 假登录：无真实鉴权，仅进入主框架 */
export function LoginView({ onLogin }: LoginViewProps) {
  const [phone, setPhone] = useState("");

  return (
    <div className="wx-login">
      <div className="wx-login-brand" aria-hidden>
        💬
      </div>
      <h1 className="wx-login-title">微信 UI Demo</h1>
      <p className="wx-login-sub">演示环境 · 不连接任何真实账号</p>
      <label className="wx-login-field">
        <span className="wx-login-label">手机号（仅展示）</span>
        <input
          type="tel"
          inputMode="numeric"
          placeholder="请输入手机号"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-label="手机号（演示输入框）"
        />
      </label>
      <button type="button" className="wx-login-btn" onClick={onLogin}>
        登录
      </button>
      <p className="wx-login-note">点击登录即写入 sessionStorage，刷新后仍保持（清除站点数据可重置）。</p>
    </div>
  );
}
