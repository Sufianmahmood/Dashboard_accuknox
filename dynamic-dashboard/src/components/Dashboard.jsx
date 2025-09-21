import { useWidgetStore } from '../store/widgetStore'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export default function Dashboard() {
  const { categories, removeWidget } = useWidgetStore()

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Activity',
        data: [30, 45, 28],
        backgroundColor: '#2563eb',
        borderRadius: 4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  }

  return (
    <div className="section">
      {categories.map((cat) => (
        <div key={cat.name} className="section">
          <h2>{cat.name}</h2>
          <div className="grid">
            {cat.widgets.map((widget) => (
              <div key={widget.id} className="card">
                <h3>{widget.name}</h3>
                <p>{widget.text}</p>
                <Bar data={chartData} options={chartOptions} />
                <button className="danger" onClick={() => removeWidget(cat.name, widget.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
