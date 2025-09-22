import { useState } from 'react'
import AddWidgetModal from './AddWidgetModal'

export default function AddWidgetCard({ category }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="card add-widget-card" onClick={() => setIsOpen(true)}>
        <div className="plus-icon">+</div>
        <p>Add Widget</p>
      </div>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <AddWidgetModal
              defaultCategory={category}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}
