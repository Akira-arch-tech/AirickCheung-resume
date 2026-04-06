import { useState } from "react";

interface ProfileEditViewProps {
  onBack: () => void;
  showToast: (msg: string) => void;
}

export function ProfileEditView({ onBack, showToast }: ProfileEditViewProps) {
  const [nickname, setNickname] = useState("演示用户");

  return (
    <div className="wx-subpage">
      <header className="wx-header">
        <button type="button" className="wx-header-action left" onClick={onBack} aria-label="返回">
          ‹
        </button>
        <span className="wx-header-title">个人信息</span>
        <button
          type="button"
          className="wx-header-action right"
          style={{ fontSize: 16, fontWeight: 600 }}
          onClick={() => showToast(`已保存昵称：${nickname}（演示）`)}
        >
          保存
        </button>
      </header>
      <div className="wx-list" style={{ background: "var(--wx-bg)" }}>
        <div className="wx-form-block">
          <label className="wx-form-label">头像</label>
          <div className="wx-form-row">
            <div className="wx-profile-avatar" style={{ margin: 0 }}>
              🦊
            </div>
            <span className="wx-form-hint">演示：点击更换（未接入）</span>
          </div>
        </div>
        <div className="wx-form-block">
          <label className="wx-form-label" htmlFor="nick">
            名字
          </label>
          <input
            id="nick"
            className="wx-form-input"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="昵称"
          />
        </div>
        <div className="wx-form-block">
          <span className="wx-form-label">微信号</span>
          <div className="wx-form-static">demo_portfolio</div>
        </div>
        <p className="wx-footer-note">本页为 PRD 4.12 资料编辑壳层，与官方微信无关。</p>
      </div>
    </div>
  );
}
