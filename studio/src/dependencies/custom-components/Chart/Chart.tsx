// @ts-nocheck
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
import 'moment/locale/fr'
moment.locale('fr')

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
      const RetainedChart = typesOfCharts[chartType]

     const labels = value?.map(v => moment(v.date).format('L'))
     //const data1 = value?.map(v => v.chest)
     const datasets=lodash.range(5).map(index => {
       const attribute=props[`series_${index}_attribute`]
       const label=props[`series_${index}_label`]
       const color=props[`series_${index}_color`]
       if (attribute && label) {
         return ({
           label,
           data: value?.map(v => ({x:moment(v.date).format('L'), y:v[attribute]})),
           backgroundColor: color,
           borderColor: color,
         })
      }
      else {return null}
     })
     .filter(v => !!v)

     const data = {
        labels,
        datasets
      };

      const FinalChart:TypedChartComponent<ChartType> = () => React.createElement(RetainedChart, {data})

  return (
    <FinalChart {...props} options={options} data={data} />
  )

}

export default OwnChart
