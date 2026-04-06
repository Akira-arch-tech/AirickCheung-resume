import { useState } from "react";
import type { MomentPost } from "../types";

interface MomentsViewProps {
  posts: MomentPost[];
  onBack: () => void;
  showToast: (message: string) => void;
}

export function MomentsView({ posts, onBack, showToast }: MomentsViewProps) {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [commentPost, setCommentPost] = useState<MomentPost | null>(null);
  const [draft, setDraft] = useState("");

  function toggleLike(id: string) {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function sendComment() {
    const t = draft.trim();
    if (!t) return;
    showToast(`演示：已发送评论「${t.slice(0, 12)}${t.length > 12 ? "…" : ""}」`);
    setDraft("");
    setCommentPost(null);
  }

  return (
    <div className="wx-moments">
      <header className="wx-header wx-moments-header">
        <button type="button" className="wx-header-action left" onClick={onBack} aria-label="返回">
          ‹
        </button>
        <span className="wx-header-title">朋友圈</span>
        <button
          type="button"
          className="wx-header-action right"
          onClick={() => showToast("演示：发表图片/视频到朋友圈")}
          aria-label="拍照分享"
        >
          📷
        </button>
      </header>
      <div className="wx-moments-cover" aria-hidden>
        <div className="wx-moments-cover-inner">
          <span className="wx-moments-nickname">演示用户</span>
          <span className="wx-moments-cover-avatar">🦊</span>
        </div>
      </div>
      <div className="wx-moments-feed">
        {posts.map((p) => (
          <article key={p.id} className="wx-moment-card">
            <div className="wx-moment-avatar" aria-hidden>
              {p.avatar}
            </div>
            <div className="wx-moment-body">
              <div className="wx-moment-author">{p.author}</div>
              <p className="wx-moment-text">{p.text}</p>
              {p.images.length > 0 ? (
                <div
                  className={`wx-moment-images count-${Math.min(p.images.length, 3)}`}
                >
                  {p.images.map((img, i) => (
                    <div key={i} className="wx-moment-img-cell">
                      {img}
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="wx-moment-meta">
                <span className="wx-moment-time">{p.time}</span>
                <div className="wx-moment-actions">
                  <button
                    type="button"
                    className="wx-moment-like"
                    onClick={() => toggleLike(p.id)}
                    aria-pressed={liked[p.id] ?? false}
                  >
                    {liked[p.id] ? "♥ 已赞" : "♡ 赞"}
                  </button>
                  <button type="button" className="wx-moment-comment-btn" onClick={() => setCommentPost(p)}>
                    💬 评论
                  </button>
                </div>
              </div>
              {p.comments && p.comments.length > 0 ? (
                <div className="wx-moment-comments-preview">
                  {p.comments.map((c, i) => (
                    <div key={i} className="wx-moment-comment-line">
                      <strong>{c.author}</strong>：{c.text}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}
        <p className="wx-moments-end">— 演示内容结束 —</p>
      </div>

      {commentPost ? (
        <div className="wx-comment-sheet-overlay" role="dialog" aria-modal="true">
          <button type="button" className="wx-sheet-backdrop" aria-label="关闭" onClick={() => setCommentPost(null)} />
          <div className="wx-comment-sheet">
            <div className="wx-comment-sheet-title">评论 · {commentPost.author} 的动态</div>
            <div className="wx-comment-sheet-list">
              {(commentPost.comments ?? []).map((c, i) => (
                <div key={i} className="wx-comment-sheet-row">
                  <span className="wx-comment-author">{c.author}</span>
                  <span>{c.text}</span>
                </div>
              ))}
              <p className="wx-comment-sheet-hint">以上为 Mock 评论（PRD 4.10）</p>
            </div>
            <div className="wx-comment-sheet-input-row">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="写一条演示评论…"
                className="wx-comment-input"
                onKeyDown={(e) => e.key === "Enter" && sendComment()}
                aria-label="评论输入"
              />
              <button type="button" className="wx-comment-send" onClick={sendComment}>
                发送
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
