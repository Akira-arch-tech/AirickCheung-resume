import type { TabId } from "../types";

const tabs: { id: TabId; label: string; icon: string; iconActive: string }[] = [
  { id: "chats", label: "微信", icon: "💬", iconActive: "💬" },
  { id: "contacts", label: "通讯录", icon: "📇", iconActive: "📇" },
  { id: "discover", label: "发现", icon: "🧭", iconActive: "🧭" },
  { id: "me", label: "我", icon: "👤", iconActive: "👤" },
];

interface TabBarProps {
  active: TabId;
  onChange: (id: TabId) => void;
}

export function TabBar({ active, onChange }: TabBarProps) {
  return (
    <nav className="wx-tabbar" aria-label="主导航">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`wx-tab${active === t.id ? " active" : ""}`}
          onClick={() => onChange(t.id)}
        >
          <span className="wx-tab-icon" aria-hidden>
            {t.icon}
          </span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
