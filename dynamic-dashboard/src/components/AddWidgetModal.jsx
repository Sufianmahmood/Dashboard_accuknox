import { useState } from 'react'
import { useWidgetStore } from '../store/widgetStore'
import { nanoid } from 'nanoid'

export default function AddWidgetModal() {
  const { categories, addWidget } = useWidgetStore()
  const [category, setCategory] = useState(categories[0].name)
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  const handleAdd = () => {
    if (!name.trim()) return
    addWidget(category, { id: nanoid(), name, text })
    setName('')
    setText('')
  }

  return (
    <div className="modal">
      <h2>Add Widget</h2>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Widget Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Widget Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Confirm</button>
    </div>
  )
}
