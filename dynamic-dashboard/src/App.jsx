import AddCategory from './components/AddCategory'
import AddWidgetModal from './components/AddWidgetModal'
import WidgetSelectorModal from './components/WidgetSelectorModal'
import SearchBar from './components/SearchBar'
import Dashboard from './components/Dashboard'
import './index.css'
function App() {
  const toggleDark = () => {
    document.body.classList.toggle('dark')
  }

  return (
    <div className="container">
      <button onClick={toggleDark} style={{ float: 'right', marginBottom: '16px' }}>
        Toggle Dark Mode
      </button>
      <AddCategory />
      <SearchBar />
      <AddWidgetModal />
      <WidgetSelectorModal />
      <Dashboard />
    </div>
  )
}


export default App
