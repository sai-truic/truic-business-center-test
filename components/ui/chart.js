import React from 'react';
import { BarChart as SimpleBarChart } from './advanced-charts';
import useInputState from '../useInputState';

/*
This is how you can use the chart components with global state:

import React from 'react';
import { LineChart, BarChart, PieChart, CustomComboChart } from '../components/ui/chart';
import useInputState from '../useInputState';

const ChartExample = () => {
  const { getState, updateState } = useInputState();

  React.useEffect(() => {
    // Initialize or update chart data
    updateState('chart', 'lineChart', {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Sales',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    });

    updateState('chart', 'barChart', {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: 'Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });

    updateState('chart', 'pieChart', {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    });
  }, [updateState]);

  const lineChartData = getState('chart', 'lineChart');
  const barChartData = getState('chart', 'barChart');
  const pieChartData = getState('chart', 'pieChart');

  return (
    <div className="space-y-8">
      <div>
        <h2>Line Chart</h2>
        <LineChart id="lineChart" />
      </div>
      <div>
        <h2>Bar Chart</h2>
        <BarChart id="barChart" />
      </div>
      <div>
        <h2>Pie Chart</h2>
        <PieChart id="pieChart" />
      </div>
      <div>
        <h2>Custom Combo Chart</h2>
        <CustomComboChart
          lineData={{ labels: lineChartData?.labels, values: lineChartData?.datasets[0].data }}
          barData={barChartData?.datasets[0].data}
        />
      </div>
    </div>
  );
};

export default ChartExample;
*/

// Keep the existing simple BarChart for backwards compatibility
export const BarChart = ({ id, data }) => {
  const { getState, updateState } = useInputState();
  const chartData = id ? getState('chart', id) : data;

  React.useEffect(() => {
    if (id && data) {
      updateState('chart', id, data);
    }
  }, [id, data, updateState]);

  if (!chartData) return null;

  const maxValue = Math.max(...chartData.datasets[0].data);

  return (
    <div className="flex items-end space-x-2 h-64">
      {chartData.labels.map((label, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className="w-8 bg-blue-500 rounded-t"
            style={{ height: `${(chartData.datasets[0].data[index] / maxValue) * 100}%` }}
          ></div>
          <span className="text-sm mt-2">{label}</span>
        </div>
      ))}
    </div>
  );
};

// Export advanced charts
export * from './advanced-charts';
                                    
