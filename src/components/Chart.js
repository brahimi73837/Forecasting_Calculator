import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ previousYears, previousValues, futureYears, predictedValues }) => {
  const lastActualYear = previousYears[previousYears.length - 1];
  const firstFutureYear = futureYears[0];
  
  // Create a connection line between the last actual value and the first predicted value
  const connectionData = [
    previousValues[lastActualYear] !== undefined ? previousValues[lastActualYear] : null, 
    predictedValues[firstFutureYear] !== undefined ? predictedValues[firstFutureYear] : null
  ];

  const data = {
    labels: [...previousYears, ...futureYears],
    datasets: [
      {
        label: 'Actual Values',
        data: previousYears.map(year => previousValues[year] !== undefined ? previousValues[year] : null),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        spanGaps: true,
        pointRadius: previousYears.map(year => previousValues[year] !== undefined ? 5 : 0), // Ensure dots are drawn for non-null values
      },
      {
        label: 'Predicted Values',
        data: [
          ...previousYears.map(() => null),  // Set null for previous years
          ...futureYears.map(year => predictedValues[year] !== undefined ? predictedValues[year] : null)  // Add predicted values only for future years
        ],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
        spanGaps: true,
        pointRadius: futureYears.map(year => predictedValues[year] !== undefined ? 5 : 0), // Ensure dots are drawn for non-null values
      },
      {
        label: 'Connection',
        data: [
          ...previousYears.map((year, index) => (index === previousYears.length - 1 ? previousValues[year] !== undefined ? previousValues[year] : null : null)),
          ...futureYears.map((year, index) => (index === 0 ? predictedValues[year] !== undefined ? predictedValues[year] : null : null))
        ],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
        pointRadius: 0,  // Hide points to make it just a line
        borderDash: [5, 5],  // Optional: make the connection line dashed
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Launch Values Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Values',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Years',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default Chart;