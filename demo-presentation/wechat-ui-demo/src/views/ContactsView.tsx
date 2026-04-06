import { useState } from "react";
import { ActionSheet } from "../components/ActionSheet";
import { contactGroups, contactToThreadId } from "../data/mock";

interface ContactsViewProps {
  onOpenThread: (threadId: string) => void;
  showToast: (message: string) => void;
}

export function ContactsView({ onOpenThread, showToast }: ContactsViewProps) {
  const [sheet, setSheet] = useState<null | { name: string; avatar: string; id: string }>(null);

  return (
    <>
      <header className="wx-header">
        <span className="wx-header-title">通讯录</span>
        <button
          type="button"
          className="wx-header-action right"
          aria-label="添加朋友"
          onClick={() => showToast("演示：添加朋友 / 手机联系人")}
        >
          👤+
        </button>
      </header>
      <div className="wx-list">
        <button type="button" className="wx-row" onClick={() => showToast("演示：好友请求列表")}>
          <div className="wx-avatar" style={{ background: "#fa9d3b", color: "#fff", fontSize: 22 }}>
            🔍
          </div>
          <div className="wx-row-body">
            <div className="wx-row-name">新的朋友</div>
          </div>
        </button>
        <button type="button" className="wx-row" onClick={() => showToast("演示：群聊列表")}>
          <div className="wx-avatar" style={{ background: "#2782d7", color: "#fff", fontSize: 22 }}>
            👥
          </div>
          <div className="wx-row-body">
            <div className="wx-row-name">群聊</div>
          </div>
        </button>
        <button type="button" className="wx-row" onClick={() => showToast("演示：标签管理")}>
          <div className="wx-avatar" style={{ background: "#07c160", color: "#fff", fontSize: 22 }}>
            🏷️
          </div>
          <div className="wx-row-body">
            <div className="wx-row-name">标签</div>
          </div>
        </button>
        {contactGroups.map((g) => (
          <section key={g.letter}>
            <div className="wx-section-title">{g.letter}</div>
            {g.items.map((c) => (
              <button
                key={c.id}
                type="button"
                className="wx-row"
                onClick={() => setSheet({ id: c.id, name: c.name, avatar: c.avatar })}
              >
                <div className="wx-avatar" aria-hidden>
                  {c.avatar}
                </div>
                <div className="wx-row-body">
                  <div className="wx-row-name">{c.name}</div>
                </div>
              </button>
            ))}
          </section>
        ))}
      </div>

      <ActionSheet
        open={!!sheet}
        onClose={() => setSheet(null)}
        title={sheet ? `${sheet.avatar} ${sheet.name}` : undefined}
        items={
          sheet
            ? [
                {
                  label: "发消息",
                  onSelect: () => {
                    const tid = contactToThreadId[sheet.id];
                    if (tid) onOpenThread(tid);
                    else showToast("演示：暂无与该联系人的会话，可扩展「新建会话」");
                  },
                },
                {
                  label: "音视频通话（演示）",
                  onSelect: () => showToast("演示：可弹出语音 / 视频选择"),
                },
                {
                  label: "查看资料（演示）",
                  onSelect: () => showToast("演示：联系人详情页"),
                },
              ]
            : []
        }
      />
    </>
  );
}
