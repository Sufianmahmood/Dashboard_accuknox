import { useWidgetStore } from '../store/widgetStore'

export default function WhiteboardView({ activeTab }) {
  const { widgets, removeWidget } = useWidgetStore()
  const filtered = widgets.filter((w) => w.tab === activeTab)

  return (
    <div className="grid">
      {filtered.map((widget) => (
        <div key={widget.id} className="card">
          <h3>{widget.name}</h3>
          <p>{widget.text}</p>
          <button className="danger" onClick={() => removeWidget(widget.tab, widget.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}
