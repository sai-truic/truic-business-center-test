import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line, Bar, Pie, Doughnut, Radar, PolarArea, Scatter, Bubble } from 'react-chartjs-2';
import useInputState from '../useInputState';

ChartJS.register(...registerables);

const defaultOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Chart',
    },
  },
};

const ChartWrapper = ({ id, ChartComponent, options = {} }) => {
  const { getState } = useInputState();
  const data = getState('chart', id);

  if (!data) return null;

  return <ChartComponent data={data} options={{ ...defaultOptions, ...options }} />;
};

export const LineChart = ({ id, options }) => (
  <ChartWrapper id={id} ChartComponent={Line} options={options} />
);

export const BarChart = ({ id, options }) => (
  <ChartWrapper id={id} ChartComponent={Bar} options={options} />
);

export const PieChart = ({ id, options }) => (
  <ChartWrapper id={id} ChartComponent={Pie} options={options} />
);

export const DoughnutChart = ({ id, options }) => (
  <ChartWrapper id={id} ChartComponent={Doughnut} options={options} />
);

export const RadarChart = ({ id, options }) => (
  <ChartWrapper id={id} ChartComponent={Radar} options={options} />
);

export const PolarAreaChart = ({ id, options }) => (
  <ChartWrapper id={id} ChartComponent={PolarArea} options={options} />
);

export const ScatterChart = ({ id, options }) => (
  <ChartWrapper id={id} ChartComponent={Scatter} options={options} />
);

export const BubbleChart = ({ id, options }) => (
  <ChartWrapper id={id} ChartComponent={Bubble} options={options} />
);

// Example of a more complex, custom chart component
export const CustomComboChart = ({ lineDataId, barDataId, options = {} }) => {
  const { getState } = useInputState();
  const lineData = getState('chart', lineDataId);
  const barData = getState('chart', barDataId);

  if (!lineData || !barData) return null;

  const data = {
    labels: lineData.labels,
    datasets: [
      {
        type: 'line',
        label: 'Line Dataset',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        data: lineData.datasets[0].data,
      },
      {
        type: 'bar',
        label: 'Bar Dataset',
        backgroundColor: 'rgb(75, 192, 192)',
        data: barData.datasets[0].data,
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };

  return <Bar data={data} options={{ ...defaultOptions, ...options }} />;
};
