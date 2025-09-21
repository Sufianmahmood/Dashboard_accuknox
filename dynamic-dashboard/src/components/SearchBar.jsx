import { useState } from 'react'
import { useWidgetStore } from '../store/widgetStore'

export default function SearchBar() {
  const { categories } = useWidgetStore()
  const [query, setQuery] = useState('')

  const filtered = categories.map((cat) => ({
    ...cat,
    widgets: cat.widgets.filter((w) =>
      w.name.toLowerCase().includes(query.toLowerCase())
    )
  }))

  return (
    <div className="section">
      <h2>Search Widgets</h2>
      <input
        type="text"
        placeholder="Search widgets..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <div className="search-results">
          {filtered.map((cat) =>
            cat.widgets.length > 0 ? (
              <div key={cat.name}>
                <h3>{cat.name}</h3>
                <ul>
                  {cat.widgets.map((w) => (
                    <li key={w.id}>{w.name}</li>
                  ))}
                </ul>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  )
}
