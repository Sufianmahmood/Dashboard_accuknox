import { useState } from 'react'
import { useWidgetStore } from '../store/widgetStore'

export default function AddCategory() {
  const { categories, addCategory } = useWidgetStore()
  const [newCategory, setNewCategory] = useState('')

  const handleAdd = () => {
    if (!newCategory.trim()) return
    if (categories.some((c) => c.name === newCategory)) return
    addCategory(newCategory)
    setNewCategory('')
  }

  return (
    <div className="section">
      <h2>Add New Category</h2>
      <input
        type="text"
        placeholder="Category name"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={handleAdd}>Add Category</button>
    </div>
  )
}
