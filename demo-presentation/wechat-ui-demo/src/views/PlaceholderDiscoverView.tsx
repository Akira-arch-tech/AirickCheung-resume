interface PlaceholderDiscoverViewProps {
  title: string;
  icon: string;
  description: string;
  onBack: () => void;
}

export function PlaceholderDiscoverView({
  title,
  icon,
  description,
  onBack,
}: PlaceholderDiscoverViewProps) {
  return (
    <div className="wx-subpage">
      <header className="wx-header">
        <button type="button" className="wx-header-action left" onClick={onBack} aria-label="返回">
          ‹
        </button>
        <span className="wx-header-title">{title}</span>
      </header>
      <div className="wx-subpage-body">
        <div className="wx-placeholder-hero" aria-hidden>
          <span className="wx-placeholder-icon">{icon}</span>
        </div>
        <p className="wx-placeholder-title">{title}</p>
        <p className="wx-placeholder-desc">{description}</p>
        <p className="wx-placeholder-tag">演示入口 · 无真实业务数据</p>
      </div>
    </div>
  );
}
