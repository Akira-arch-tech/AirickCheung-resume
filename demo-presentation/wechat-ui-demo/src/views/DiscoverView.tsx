import { discoverItems } from "../data/mock";

interface DiscoverViewProps {
  onOpenMoments: () => void;
  onOpenStub: (stub: { title: string; icon: string; description: string }) => void;
}

export function DiscoverView({ onOpenMoments, onOpenStub }: DiscoverViewProps) {
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
                else
                  onOpenStub({
                    title: item.title,
                    icon: item.icon,
                    description: item.subtitle || `${item.title} 功能演示页（PRD 4.11）`,
                  });
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
        <p className="wx-footer-note">除朋友圈外，其余入口进入统一二级演示模板。</p>
      </div>
    </>
  );
}
