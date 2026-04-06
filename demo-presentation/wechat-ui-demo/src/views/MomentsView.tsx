import { useState } from "react";
import type { MomentPost } from "../types";

interface MomentsViewProps {
  posts: MomentPost[];
  onBack: () => void;
}

export function MomentsView({ posts, onBack }: MomentsViewProps) {
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  function toggleLike(id: string) {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="wx-moments">
      <header className="wx-header wx-moments-header">
        <button type="button" className="wx-header-action left" onClick={onBack} aria-label="返回">
          ‹
        </button>
        <span className="wx-header-title">朋友圈</span>
        <button type="button" className="wx-header-action right" aria-label="拍照分享">
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
                <button
                  type="button"
                  className="wx-moment-like"
                  onClick={() => toggleLike(p.id)}
                  aria-pressed={liked[p.id] ?? false}
                >
                  {liked[p.id] ? "♥ 已赞" : "♡ 赞"}
                </button>
              </div>
            </div>
          </article>
        ))}
        <p className="wx-moments-end">— 演示内容结束 —</p>
      </div>
    </div>
  );
}
