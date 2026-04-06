import { discoverItems } from "../data/mock";

interface DiscoverViewProps {
  onOpenMoments: () => void;
  showToast: (message: string) => void;
}

export function DiscoverView({ onOpenMoments, showToast }: DiscoverViewProps) {
  return (
    <>
      <header className="wx-header">
        <span className="wx-header-title">发现</span>
      </header>
      <div className="wx-list" style={{ background: "var(--wx-bg)" }}>
        <div className="wx-section" style={{ marginTop: 0 }}>
          {discoverItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="wx-discover-row wx-discover-btn"
              onClick={() => {
                if (item.id === "d1") onOpenMoments();
                else showToast(`「${item.title}」为界面占位，可继续扩展子页`);
              }}
            >
              <span className="wx-discover-icon" aria-hidden>
                {item.icon}
              </span>
              <span style={{ flex: 1, fontSize: 16, textAlign: "left" }}>{item.title}</span>
              <span style={{ color: "var(--wx-sub)", fontSize: 14 }}>{'\u203a'}</span>
            </button>
          ))}
        </div>
        <p className="wx-footer-note">点击「朋友圈」可进入可交互演示流；其余入口可接子页面。</p>
      </div>
    </>
  );
}
