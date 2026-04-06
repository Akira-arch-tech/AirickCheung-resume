import { useMemo, useState } from "react";
import { contactGroups } from "../data/mock";
import type { ChatThread } from "../types";

type SearchTab = "all" | "contacts" | "chats" | "oa";

interface GlobalSearchViewProps {
  threads: ChatThread[];
  onClose: () => void;
  onOpenChat: (threadId: string) => void;
}

const OA_STUBS = [
  { id: "oa1", name: "微信团队", hint: "欢迎你使用微信" },
  { id: "oa2", name: "公众号安全助手", hint: "账号安全提醒" },
];

/** PRD P2 / 4.14 · 全局搜索壳 */
export function GlobalSearchView({ threads, onClose, onOpenChat }: GlobalSearchViewProps) {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<SearchTab>("all");

  const allContacts = useMemo(
    () => contactGroups.flatMap((g) => g.items.map((c) => ({ ...c, letter: g.letter }))),
    []
  );

  const needle = q.trim().toLowerCase();

  const filteredChats = useMemo(() => {
    if (!needle) return threads.slice(0, 6);
    return threads.filter((t) => t.name.toLowerCase().includes(needle) || t.lastMessage.toLowerCase().includes(needle));
  }, [threads, needle]);

  const filteredContacts = useMemo(() => {
    if (!needle) return allContacts.slice(0, 8);
    return allContacts.filter((c) => c.name.toLowerCase().includes(needle));
  }, [allContacts, needle]);

  const filteredOa = useMemo(() => {
    if (!needle) return OA_STUBS;
    return OA_STUBS.filter((o) => o.name.toLowerCase().includes(needle) || o.hint.toLowerCase().includes(needle));
  }, [needle]);

  const showChats = tab === "all" || tab === "chats";
  const showContacts = tab === "all" || tab === "contacts";
  const showOa = tab === "all" || tab === "oa";

  return (
    <div className="wx-global-search">
      <header className="wx-header">
        <button type="button" className="wx-header-action left" onClick={onClose} aria-label="返回">
          取消
        </button>
        <span className="wx-header-title">搜索</span>
      </header>
      <div className="wx-global-search-toolbar">
        <label className="wx-search-wrap wx-global-search-input-wrap">
          <span className="wx-search-icon" aria-hidden>
            🔍
          </span>
          <input
            className="wx-search-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索会话、联系人、公众号…"
            autoFocus
            aria-label="全局搜索"
          />
        </label>
        <div className="wx-global-search-tabs" role="tablist">
          {(
            [
              ["all", "全部"],
              ["chats", "聊天记录"],
              ["contacts", "联系人"],
              ["oa", "公众号"],
            ] as const
          ).map(([id, lab]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={`wx-global-search-tab${tab === id ? " active" : ""}`}
              onClick={() => setTab(id)}
            >
              {lab}
            </button>
          ))}
        </div>
      </div>
      <div className="wx-list wx-global-search-results">
        {showChats && filteredChats.length > 0 ? (
          <section className="wx-global-search-section">
            <div className="wx-section-title">会话</div>
            {filteredChats.map((t) => (
              <button
                key={t.id}
                type="button"
                className="wx-row"
                onClick={() => {
                  onOpenChat(t.id);
                  onClose();
                }}
              >
                <div className="wx-avatar" aria-hidden>
                  {t.avatar}
                </div>
                <div className="wx-row-body">
                  <div className="wx-row-name">{t.name}</div>
                  <div className="wx-row-preview">{t.lastMessage}</div>
                </div>
              </button>
            ))}
          </section>
        ) : null}
        {showContacts && filteredContacts.length > 0 ? (
          <section className="wx-global-search-section">
            <div className="wx-section-title">联系人</div>
            {filteredContacts.map((c) => (
              <div key={c.id} className="wx-row">
                <div className="wx-avatar" aria-hidden>
                  {c.avatar}
                </div>
                <div className="wx-row-body">
                  <div className="wx-row-name">{c.name}</div>
                  <div className="wx-row-preview">字母 {c.letter}</div>
                </div>
              </div>
            ))}
          </section>
        ) : null}
        {showOa && filteredOa.length > 0 ? (
          <section className="wx-global-search-section">
            <div className="wx-section-title">公众号（演示）</div>
            {filteredOa.map((o) => (
              <div key={o.id} className="wx-row">
                <div className="wx-avatar" style={{ background: "#07c160", color: "#fff", fontSize: 22 }}>
                  📰
                </div>
                <div className="wx-row-body">
                  <div className="wx-row-name">{o.name}</div>
                  <div className="wx-row-preview">{o.hint}</div>
                </div>
              </div>
            ))}
          </section>
        ) : null}
        {needle && !filteredChats.length && !filteredContacts.length && !filteredOa.length ? (
          <p className="wx-empty-hint" style={{ padding: 24 }}>
            无匹配结果（演示数据有限）
          </p>
        ) : null}
      </div>
    </div>
  );
}
