import { useState } from "react";
import type { UiPrefs } from "../utils/demoStorage";

type Page = "home" | "general" | "about";

interface SettingsStackViewProps {
  onBack: () => void;
  showToast: (msg: string) => void;
  uiPrefs: UiPrefs;
  onUiPrefsChange: (p: Partial<UiPrefs>) => void;
  onLogout: () => void;
}

export function SettingsStackView({
  onBack,
  showToast,
  uiPrefs,
  onUiPrefsChange,
  onLogout,
}: SettingsStackViewProps) {
  const [page, setPage] = useState<Page>("home");

  if (page === "general") {
    return (
      <div className="wx-subpage">
        <header className="wx-header">
          <button type="button" className="wx-header-action left" onClick={() => setPage("home")} aria-label="返回">
            ‹
          </button>
          <span className="wx-header-title">通用</span>
        </header>
        <div className="wx-list" style={{ background: "var(--wx-bg)" }}>
          <div className="wx-section" style={{ marginTop: 0 }}>
            <label className="wx-setting-row">
              <span>深色模式（演示）</span>
              <input
                type="checkbox"
                className="wx-switch"
                checked={uiPrefs.darkMode}
                onChange={(e) => onUiPrefsChange({ darkMode: e.target.checked })}
              />
            </label>
            <label className="wx-setting-row">
              <span>开启横屏模式（演示）</span>
              <input
                type="checkbox"
                className="wx-switch"
                checked={uiPrefs.landscape}
                onChange={(e) => onUiPrefsChange({ landscape: e.target.checked })}
              />
            </label>
            <button type="button" className="wx-setting-row wx-setting-btn" onClick={() => showToast("演示：语言与地区")}>
              <span>多语言</span>
              <span className="wx-chevron">{'\u203a'}</span>
            </button>
          </div>
          <p className="wx-footer-note">PRD P2 · 深色 / 横屏已写入 sessionStorage。</p>
        </div>
      </div>
    );
  }

  if (page === "about") {
    return (
      <div className="wx-subpage">
        <header className="wx-header">
          <button type="button" className="wx-header-action left" onClick={() => setPage("home")} aria-label="返回">
            ‹
          </button>
          <span className="wx-header-title">关于微信</span>
        </header>
        <div className="wx-list" style={{ background: "var(--wx-bg)", textAlign: "center", padding: "32px 16px" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }} aria-hidden>
            💬
          </div>
          <p style={{ fontSize: 17, fontWeight: 600, margin: "0 0 8px" }}>微信 UI Demo</p>
          <p style={{ fontSize: 14, color: "var(--wx-sub)", margin: 0 }}>版本 0.3（演示构建）</p>
          <p style={{ fontSize: 12, color: "#aaa", marginTop: 24, lineHeight: 1.5 }}>
            本应用为界面复刻练习作品，非腾讯官方产品。
            <br />
            <a href="https://github.com/Akira-arch-tech/AirickCheung-resume" style={{ color: "var(--wx-green)" }}>
              查看仓库
            </a>
          </p>
          <button type="button" className="wx-logout-btn" onClick={onLogout}>
            退出登录（演示）
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wx-subpage">
      <header className="wx-header">
        <button type="button" className="wx-header-action left" onClick={onBack} aria-label="返回">
          ‹
        </button>
        <span className="wx-header-title">设置</span>
      </header>
      <div className="wx-list" style={{ background: "var(--wx-bg)" }}>
        <div className="wx-section" style={{ marginTop: 0 }}>
          <button type="button" className="wx-discover-row wx-discover-btn" onClick={() => showToast("演示：账号与安全")}>
            <span style={{ flex: 1, textAlign: "left", fontSize: 16 }}>账号与安全</span>
            <span className="wx-chevron">{'\u203a'}</span>
          </button>
          <button type="button" className="wx-discover-row wx-discover-btn" onClick={() => setPage("general")}>
            <span style={{ flex: 1, textAlign: "left", fontSize: 16 }}>通用</span>
            <span className="wx-chevron">{'\u203a'}</span>
          </button>
          <button type="button" className="wx-discover-row wx-discover-btn" onClick={() => showToast("演示：隐私设置")}>
            <span style={{ flex: 1, textAlign: "left", fontSize: 16 }}>隐私</span>
            <span className="wx-chevron">{'\u203a'}</span>
          </button>
        </div>
        <div className="wx-section" style={{ marginTop: 8 }}>
          <button type="button" className="wx-discover-row wx-discover-btn" onClick={() => setPage("about")}>
            <span style={{ flex: 1, textAlign: "left", fontSize: 16 }}>关于微信</span>
            <span className="wx-chevron">{'\u203a'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
