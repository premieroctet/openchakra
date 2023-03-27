import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


const Chart = (
  {
    isEditable = false, // read-only or writable
    name,
    value,
    attribute,
    id,
    ...props
  }
    : {
      isEditable: boolean
      name: string
      value: string
      attribute: string
      id: string,
    }) => {

      const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'right' as const,
            },
            title: {
            display: true,
            text: 'Chart.js Line Chart',
            },
        },
      };

    
     const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
     const data1 = [1400, 400, 206, 705, 900, 10, 24]
     const data2 = [45, 877, 22, -45, 114, 75, 12]

     const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: data1,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: data2,
            borderColor: 'green',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };


  return (
    <Box {...props}>
    <Line options={options} data={data} />
    <Bar options={options} data={data} />
    </Box>
  );

}

export default Chart
