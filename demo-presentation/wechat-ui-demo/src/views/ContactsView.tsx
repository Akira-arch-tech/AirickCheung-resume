import { contactGroups } from "../data/mock";

export function ContactsView() {
  return (
    <>
      <header className="wx-header">
        <span className="wx-header-title">通讯录</span>
        <button type="button" className="wx-header-action right" aria-label="添加朋友">
          👤+
        </button>
      </header>
      <div className="wx-list">
        <div className="wx-row">
          <div className="wx-avatar" style={{ background: "#fa9d3b", color: "#fff", fontSize: 22 }}>
            🔍
          </div>
          <div className="wx-row-body">
            <div className="wx-row-name">新的朋友</div>
          </div>
        </div>
        <div className="wx-row">
          <div className="wx-avatar" style={{ background: "#2782d7", color: "#fff", fontSize: 22 }}>
            👥
          </div>
          <div className="wx-row-body">
            <div className="wx-row-name">群聊</div>
          </div>
        </div>
        <div className="wx-row">
          <div className="wx-avatar" style={{ background: "#07c160", color: "#fff", fontSize: 22 }}>
            🏷️
          </div>
          <div className="wx-row-body">
            <div className="wx-row-name">标签</div>
          </div>
        </div>
        {contactGroups.map((g) => (
          <section key={g.letter}>
            <div className="wx-section-title">{g.letter}</div>
            {g.items.map((c) => (
              <div key={c.id} className="wx-row">
                <div className="wx-avatar" aria-hidden>
                  {c.avatar}
                </div>
                <div className="wx-row-body">
                  <div className="wx-row-name">{c.name}</div>
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}
