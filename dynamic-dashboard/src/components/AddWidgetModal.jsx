import { useState } from 'react'
import { useWidgetStore } from '../store/widgetStore'
import { nanoid } from 'nanoid'

export default function AddWidgetModal({ defaultCategory, onClose }) {
  const { addWidget } = useWidgetStore()
  const [category, setCategory] = useState(defaultCategory || 'CSPM Executive Dashboard')
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [chartType, setChartType] = useState('')
  const [chartLabels, setChartLabels] = useState('')
  const [chartData, setChartData] = useState('')
  const [chartColors, setChartColors] = useState('')

  const handleAdd = () => {
    if (!name.trim()) return

    const chart =
      chartType && chartLabels && chartData
        ? {
            type: chartType,
            labels: chartLabels.split(',').map((s) => s.trim()),
            data: chartData.split(',').map((n) => parseInt(n.trim())),
            colors: chartColors.split(',').map((c) => c.trim()),
          }
        : undefined

    addWidget(category, { id: nanoid(), name, text, chart })
    onClose()
  }

  return (
    <>
      <h2>Add Widget</h2>

      <label>Select Widget Category</label>
      <select className="modal-field" value={category} onChange={(e) => setCategory(e.target.value)}>
    
        <option value="Registry Score">Registry Score</option>
        <option value="CAASM Assessment">CAASM Assessment</option>
        <option value="Environment Status">Environment Status</option>
      </select>

      <label>Widget Name</label>
      <input
        className="modal-field"
        type="text"
        placeholder="Widget Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Description</label>
      <textarea
        className="modal-field"
        placeholder="Widget Description"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <label>Chart Type</label>
      <select className="modal-field" value={chartType} onChange={(e) => setChartType(e.target.value)}>
        <option value="">No Chart</option>
        <option value="pie">Pie</option>
      </select>

      <label>Chart Labels</label>
      <input
        className="modal-field"
        type="text"
        placeholder="Comma separated labels"
        value={chartLabels}
        onChange={(e) => setChartLabels(e.target.value)}
      />

      <label>Chart Data</label>
      <input
        className="modal-field"
        type="text"
        placeholder="Comma separated values"
        value={chartData}
        onChange={(e) => setChartData(e.target.value)}
      />

      <label>Chart Colors</label>
      <input
        className="modal-field"
        type="text"
        placeholder="Comma separated colors"
        value={chartColors}
        onChange={(e) => setChartColors(e.target.value)}
      />

      <div className="modal-actions">
        <button onClick={handleAdd}>Add</button>
        <button className="danger" onClick={onClose}>Cancel</button>
      </div>
    </>
  )
}
