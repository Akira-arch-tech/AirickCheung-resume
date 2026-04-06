import { discoverItems } from "../data/mock";

export function DiscoverView() {
  return (
    <>
      <header className="wx-header">
        <span className="wx-header-title">发现</span>
      </header>
      <div className="wx-list" style={{ background: "var(--wx-bg)" }}>
        <div className="wx-section" style={{ marginTop: 0 }}>
          {discoverItems.map((item) => (
            <div key={item.id} className="wx-discover-row">
              <span className="wx-discover-icon" aria-hidden>
                {item.icon}
              </span>
              <span style={{ flex: 1, fontSize: 16 }}>{item.title}</span>
              <span style={{ color: "var(--wx-sub)", fontSize: 14 }}>{'\u203a'}</span>
            </div>
          ))}
        </div>
        <p className="wx-footer-note">以上为界面演示，功能未接入真实服务。</p>
      </div>
    </>
  );
}
