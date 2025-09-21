import { useWidgetStore } from '../store/widgetStore'
import { useState } from 'react'

export default function WidgetSelectorModal() {
  const { categories, addWidget, removeWidget } = useWidgetStore()
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name)
  const [availableWidgets] = useState([
    { id: 'w1', name: 'Registry Score', text: 'Random text for Registry Score' },
    { id: 'w2', name: 'CAASM Assessment', text: 'Random text for CAASM Assessment' },
    { id: 'w3', name: 'Environment Status', text: 'Random text for Environment Status' }
  ])

  const isWidgetInCategory = (widgetId) => {
    const cat = categories.find((c) => c.name === selectedCategory)
    return cat.widgets.some((w) => w.id === widgetId)
  }

  const toggleWidget = (widget) => {
    if (isWidgetInCategory(widget.id)) {
      removeWidget(selectedCategory, widget.id)
    } else {
      addWidget(selectedCategory, widget)
    }
  }

  return (
    <div className="modal">
      <h2>Select Widgets for Category</h2>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      <ul className="checkbox-list">
        {availableWidgets.map((widget) => (
          <li key={widget.id}>
            <input
              type="checkbox"
              checked={isWidgetInCategory(widget.id)}
              onChange={() => toggleWidget(widget)}
            />
            <span>{widget.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
