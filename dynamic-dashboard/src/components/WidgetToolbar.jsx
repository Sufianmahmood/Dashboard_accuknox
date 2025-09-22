export default function WidgetToolbar({ onAddWidget }) {
  return (
    <div className="toolbar">
      <button onClick={onAddWidget}>
        <span className="plus-icon">+</span> Add Widget
      </button>
      <button>
        Start Editing <span className="dropdown-icon">▼</span>
      </button>
    </div>
  )
}
