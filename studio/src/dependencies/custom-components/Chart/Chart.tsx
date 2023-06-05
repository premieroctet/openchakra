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
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';
import { TypedChartComponent } from 'react-chartjs-2/dist/types';
import moment from 'moment'
import lodash from 'lodash'


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
      value:{date:any, [key:string]: number}[] 
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
      const RetainedChart = Scatter //typesOfCharts[chartType]
    
     const labels = value?.map(v => moment(v.date).format('LL'))
     //const data1 = value?.map(v => v.chest)
     const data1 = value?.map((v, idx) => ({x:moment(v.date).unix(), y:v.chest}))
     //const data2 = value?.map(v => v.hips)

     const data = {
        labels,
        datasets: [
          {
            label: 'Chest',
            data: data1,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          /**
          {
            label: 'Hips',
            data: data2,
            spanGaps: true,
            borderColor: 'green',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          */
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
