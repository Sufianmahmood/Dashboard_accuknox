export default function WhiteboardTabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs">
      <button
        className={activeTab === 'chat' ? 'active' : ''}
        onClick={() => setActiveTab('chat')}
      >
        Chat Whiteboard
      </button>
      <button
        className={activeTab === 'gpm' ? 'active' : ''}
        onClick={() => setActiveTab('gpm')}
      >
        GPM Whiteboard
      </button>
    </div>
  )
}
