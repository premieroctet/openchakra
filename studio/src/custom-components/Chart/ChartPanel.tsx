import React, { memo, useState } from 'react'
import { Select, Input } from '@chakra-ui/react'
import usePropsSelector from '~hooks/usePropsSelector'
import { useForm } from '~hooks/useForm'
import FormControl from '~components/inspector/controls/FormControl'
import ChartDataset from './ChartDataset'
import { isJsonString } from '~dependencies/utils/misc'

export type Dataset = {
  label: String,
  data: [
    {
      date: String,
      valeur: String
    }
  ]
}


const ChartPanel = () => {

  const { setValueFromEvent } = useForm()
  const chartType = usePropsSelector('chartType')
  const saveddatasets = usePropsSelector('datasets')
  
  const puredataset = {
    name: '',
    data: [{
      date: 24,
      valeur: 45
    }]
  }

  const preparedDatasets = (isJsonString(saveddatasets) && JSON.parse(saveddatasets)) || [puredataset]
  const [datasets, setDatasets] = useState(preparedDatasets)

  const chartTypes = {
    line: 'Line',
    bar: 'Bar',
  }

  return (
    <>
      <FormControl htmlFor={'chartType'} label={'Chart type'}>
        <Select
          id="chartType"
          name="chartType" 
          size={"sm"}
          value={chartType || "line"}
          onChange={setValueFromEvent} 
        >
          {Object.entries(chartTypes).map(([key, value]) => 
            <option 
              key={value} 
              value={key}
            >
              {value}
            </option>
          )}
        </Select>
      </FormControl>

      {
        datasets
          .map(
            (dataset: Dataset, i: Number) => 
              <ChartDataset 
                key={`chartdataset${i}`} 
                dataset={dataset} 
                index={i} 
              />
          )
      }

    </>
  )
}

export default memo(ChartPanel)
