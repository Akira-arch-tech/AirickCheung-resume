interface ActionItem {
  label: string;
  onSelect: () => void;
  danger?: boolean;
}

interface ActionSheetProps {
  open: boolean;
  title?: string;
  items: ActionItem[];
  onClose: () => void;
}

export function ActionSheet({ open, title, items, onClose }: ActionSheetProps) {
  if (!open) return null;
  return (
    <div className="wx-sheet-overlay" role="dialog" aria-modal="true">
      <button type="button" className="wx-sheet-backdrop" aria-label="关闭" onClick={onClose} />
      <div className="wx-sheet-panel">
        {title ? <div className="wx-sheet-title">{title}</div> : null}
        <ul className="wx-sheet-list">
          {items.map((item, idx) => (
            <li key={`${item.label}-${idx}`}>
              <button
                type="button"
                className={`wx-sheet-item${item.danger ? " danger" : ""}`}
                onClick={() => {
                  item.onSelect();
                  onClose();
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <button type="button" className="wx-sheet-cancel" onClick={onClose}>
          取消
        </button>
      </div>
    </div>
  );
}
