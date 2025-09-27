# 1️⃣ Create a new React project (or clone your repo)
npx create-react-app dashboard-app
cd dashboard-app

# OR clone your existing repo
# git clone https://github.com/your-username/dashboard-app.git
# cd dashboard-app

# 2️⃣ Install required packages
npm install react-chartjs-2 chart.js zustand

# 3️⃣ Add your components
# Create folders if needed
mkdir src/components src/store

# Place your files:
# - Dashboard.jsx → src/components/
# - WhiteboardTabs.jsx, WidgetToolbar.jsx, WhiteboardView.jsx, AddWidgetModal.jsx, AddWidgetCard.jsx → src/components/
# - widgetStore.js → src/store/

# 4️⃣ Update App.jsx to render your dashboard
# src/App.jsx
import Dashboard from './components/Dashboard'
function App() {
  return <Dashboard />
}
export default App

# 5️⃣ Add styling
# Create or update src/index.css or App.css
# Include styles for .search-bar, .dashboard-card, .grid, .card, .alert-panel, etc.

# Import CSS in src/index.js or src/main.jsx
import './index.css'

# 6️⃣ Start the app
npm start
