import React from 'react';
import {
  Chart as ChartJS,
  ChartType,
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
import { TypedChartComponent } from 'react-chartjs-2/dist/types';


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


const OwnChart = (
  {
    isEditable = false, // read-only or writable
    name,
    value,
    attribute,
    id,
    chartType = 'line',
    datasets = [{
      name: '',
      data: {
        date: new Date(),
        value: 15
      }
    }],
    ...props
  }
    : {
      isEditable: boolean
      name: string
      value: string
      attribute: string
      id: string,
      chartType: ChartType,
      datasets: any,
    }) => {

      const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'right' as const,
            },
            // title: {
            // display: true,
            // text: 'Titre du graphe', // Chart Title
            // },
        },
      };

      const typesOfCharts = {
        'line': Line,
        'bar': Bar,
      }
      // @ts-ignore
      const RetainedChart = typesOfCharts[chartType]
    
     const labels = ['1er Janvier', 'February', 'March', 'April', 'May', 'June', 'July'];
     const data1 = [1400, 400, 206, null, 900, 10, 24]
     const data2 = [45, null, 22, -45, 114, 75, 12]

     const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: data1,
            spanGaps: true,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: data2,
            spanGaps: true,
            borderColor: 'green',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

      const FinalChart:TypedChartComponent<ChartType> = () => React.createElement(RetainedChart, {data})

  return (
    <Box {...props}>
      <FinalChart options={options} data={data} />
    </Box>
  );

}

export default OwnChart
