interface ProfileViewProps {
  showToast: (message: string) => void;
}

export function ProfileView({ showToast }: ProfileViewProps) {
  return (
    <>
      <header className="wx-header">
        <span className="wx-header-title">我</span>
        <button
          type="button"
          className="wx-header-action right"
          aria-label="设置"
          onClick={() => showToast("演示：设置入口")}
        >
          ⚙️
        </button>
      </header>
      <div className="wx-list" style={{ background: "var(--wx-bg)" }}>
        <div className="wx-profile-header">
          <div className="wx-profile-avatar" aria-hidden>
            🦊
          </div>
          <div>
            <div className="wx-profile-name">演示用户</div>
            <div className="wx-profile-id">微信号：demo_portfolio</div>
          </div>
        </div>
        <div className="wx-section" style={{ marginTop: 8 }}>
          <button type="button" className="wx-discover-row wx-discover-btn" onClick={() => showToast("演示：服务与支付聚合页")}>
            <span className="wx-discover-icon">💳</span>
            <span style={{ flex: 1, fontSize: 16, textAlign: "left" }}>服务</span>
            <span style={{ color: "var(--wx-sub)" }}>{'\u203a'}</span>
          </button>
          <button type="button" className="wx-discover-row wx-discover-btn" onClick={() => showToast("演示：收藏的文章与笔记")}>
            <span className="wx-discover-icon">⭐</span>
            <span style={{ flex: 1, fontSize: 16, textAlign: "left" }}>收藏</span>
            <span style={{ color: "var(--wx-sub)" }}>{'\u203a'}</span>
          </button>
        </div>
        <div className="wx-section" style={{ marginTop: 8 }}>
          <button type="button" className="wx-discover-row wx-discover-btn" onClick={() => showToast("演示：账号与通用设置")}>
            <span className="wx-discover-icon">⚙️</span>
            <span style={{ flex: 1, fontSize: 16, textAlign: "left" }}>设置</span>
            <span style={{ color: "var(--wx-sub)" }}>{'\u203a'}</span>
          </button>
        </div>
        <p className="wx-footer-note">本页面为个人作品展示用 UI 复刻，与腾讯微信无关。</p>
      </div>
    </>
  );
}
