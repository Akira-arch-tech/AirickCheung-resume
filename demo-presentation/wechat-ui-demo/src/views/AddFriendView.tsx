import { useState } from "react";

interface AddFriendViewProps {
  onBack: () => void;
  showToast: (msg: string) => void;
}

/** PRD P2 / 4.9 · 添加朋友 + 扫一扫占位 */
export function AddFriendView({ onBack, showToast }: AddFriendViewProps) {
  const [mode, setMode] = useState<"main" | "scan">("main");
  const [query, setQuery] = useState("");

  if (mode === "scan") {
    return (
      <div className="wx-scan">
        <header className="wx-header">
          <button type="button" className="wx-header-action left" onClick={() => setMode("main")} aria-label="返回">
            ‹
          </button>
          <span className="wx-header-title">扫一扫</span>
        </header>
        <div className="wx-scan-body">
          <div className="wx-scan-frame" aria-hidden>
            <span className="wx-scan-corner tl" />
            <span className="wx-scan-corner tr" />
            <span className="wx-scan-corner bl" />
            <span className="wx-scan-corner br" />
          </div>
          <p className="wx-scan-tip">将取景框对准二维码（演示占位，不调用相机）</p>
          <button
            type="button"
            className="wx-scan-simulate"
            onClick={() => {
              showToast("演示：识别成功，可跳转名片 / 网页");
              setMode("main");
            }}
          >
            模拟识别成功
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wx-add-friend">
      <header className="wx-header">
        <button type="button" className="wx-header-action left" onClick={onBack} aria-label="返回">
          取消
        </button>
        <span className="wx-header-title">添加朋友</span>
      </header>
      <div className="wx-add-friend-body">
        <label className="wx-search-wrap" style={{ margin: "12px 16px" }}>
          <span className="wx-search-icon" aria-hidden>
            🔍
          </span>
          <input
            className="wx-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="微信号 / 手机号 / QQ 号"
            aria-label="搜索账号"
          />
        </label>
        <button
          type="button"
          className="wx-add-friend-primary"
          onClick={() => showToast(query.trim() ? `演示：搜索「${query.trim().slice(0, 12)}」` : "请输入账号关键词")}
        >
          搜索
        </button>
        <button type="button" className="wx-add-friend-scan-row" onClick={() => setMode("scan")}>
          <span className="wx-add-friend-scan-ic" aria-hidden>
            ⬚
          </span>
          <span>扫一扫</span>
          <span className="wx-chevron">{'\u203a'}</span>
        </button>
        <p className="wx-footer-note" style={{ margin: "24px 16px" }}>
          PRD 4.9 · 添加朋友与扫一扫均为界面壳，无后端与相机权限。
        </p>
      </div>
    </div>
  );
}
