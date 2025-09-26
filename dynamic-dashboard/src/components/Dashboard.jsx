import { useState } from 'react'
import { useWidgetStore } from '../store/widgetStore'
import { Pie, Bar } from 'react-chartjs-2'
import AddWidgetModal from './AddWidgetModal'
import WhiteboardTabs from './WhiteboardTabs'
import WidgetToolbar from './WidgetToolbar'
import WhiteboardView from './WhiteboardView'
import AddWidgetCard from './AddWidgetCard'
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

export default function Dashboard() {
  const { categories, removeWidget } = useWidgetStore()
  const [activeTab, setActiveTab] = useState('chat')
  const [showModal, setShowModal] = useState(false)

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
          font: { size: 12 },
        },
      },
    },
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
    },
  }

  return (
    <div className="container">
      {/* Whiteboard Tabs + Toolbar */}
      <WhiteboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <WidgetToolbar onAddWidget={() => setShowModal(true)} />
      {showModal && (
        <AddWidgetModal tab={activeTab} onClose={() => setShowModal(false)} />
      )}
      <WhiteboardView activeTab={activeTab} />

      {/* Graph Sections */}
      <div className="grid">
        {/* Cloud Accounts */}
        <div className="dashboard-card">
          <h2>Cloud Accounts</h2>
          <Pie
            data={{
              labels: ['Connected', 'Not Connected'],
              datasets: [
                {
                  data: [1, 1],
                  backgroundColor: ['#10b981', '#ef4444'],
                },
              ],
            }}
            options={pieOptions}
          />
          <p>Connected: 1 | Not Connected: 1</p>
        </div>

        {/* Cloud Account Risk Assessment */}
        <div className="dashboard-card">
          <h2>Cloud Account Risk Assessment</h2>
          <Pie
            data={{
              labels: ['Critical', 'Warning', 'Info'],
              datasets: [
                {
                  data: [363, 860, 8436],
                  backgroundColor: ['#dc2626', '#f59e0b', '#3b82f6'],
                },
              ],
            }}
            options={pieOptions}
          />
          <p>Total: 9659</p>
        </div>

        {/* CWPP Dashboard */}
        <div className="dashboard-card">
          <h2>CWPP Dashboard</h2>
          <div className="grid">
            <div className="card alert-panel">
              <h3>Top 5 Namespace Specific Alerts</h3>
              <p>No Graph data available!</p>
            </div>
            <div className="card alert-panel">
              <h3>Workload Alerts</h3>
              <p>No Graph data available!</p>
            </div>
          </div>
        </div>

        {/* ✅ Registry Scan Section with Stacked Bar Charts */}
        <div className="dashboard-card">
          <h2>Registry Scan</h2>
          <div className="grid">
            <div className="card">
              <h3>Image Risk Assessment</h3>
              <Bar
                data={{
                  labels: ['Vulnerabilities'],
                  datasets: [
                    {
                      label: 'Critical',
                      data: [9],
                      backgroundColor: '#dc2626',
                    },
                    {
                      label: 'High',
                      data: [560],
                      backgroundColor: '#f97316',
                    },
                    {
                      label: 'Medium',
                      data: [600],
                      backgroundColor: '#facc15',
                    },
                    {
                      label: 'Low',
                      data: [301],
                      backgroundColor: '#3b82f6',
                    },
                  ],
                }}
                options={barOptions}
              />
              <p>Total: 1470</p>
            </div>

            <div className="card">
              <h3>Image Security Issues</h3>
              <Bar
                data={{
                  labels: ['Images'],
                  datasets: [
                    {
                      label: 'Critical',
                      data: [1],
                      backgroundColor: '#dc2626',
                    },
                    {
                      label: 'High',
                      data: [2],
                      backgroundColor: '#f97316',
                    },
                    {
                      label: 'Medium',
                      data: [0],
                      backgroundColor: '#facc15',
                    },
                    {
                      label: 'Low',
                      data: [0],
                      backgroundColor: '#3b82f6',
                    },
                  ],
                }}
                options={barOptions}
              />
              <p>Total: 2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Categories & Widgets */}
      {categories.map((cat) => (
        <div key={cat.name} className="dashboard-card">
          <h2>{cat.name}</h2>
          <p>Total Widgets: {cat.widgets.length}</p>
          <div className="grid">
            <AddWidgetCard category={cat.name} />
            {cat.widgets.length === 0 ? (
              <div className="card alert-panel">
                <p>No widgets available for this category.</p>
              </div>
            ) : (
              cat.widgets.map((widget) => (
                <div key={widget.id} className="card">
                  <h3>{widget.name}</h3>
                  <p>{widget.text}</p>
                  {widget.chart?.type === 'pie' &&
                  widget.chart.labels &&
                  widget.chart.data &&
                  widget.chart.colors ? (
                    <>
                      <Pie
                        data={{
                          labels: widget.chart.labels,
                          datasets: [
                            {
                              data: widget.chart.data,
                              backgroundColor: widget.chart.colors,
                            },
                          ],
                        }}
                        options={pieOptions}
                      />
                      <p>
                        {widget.chart.labels.map((label, i) => (
                          <span key={i}>
                            {label}: {widget.chart.data[i]}{' '}
                          </span>
                        ))}
                      </p>
                    </>
                  ) : (
                    <p style={{ fontStyle: 'italic', color: '#888' }}>
                      No chart available
                    </p>
                  )}
                  <button
                    className="danger"
                    onClick={() => removeWidget(cat.name, widget.id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
