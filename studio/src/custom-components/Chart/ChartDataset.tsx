import React, {useId} from 'react'
import { Select, Input } from '@chakra-ui/react'
import usePropsSelector from '~hooks/usePropsSelector'
import { useForm } from '~hooks/useForm'
import FormControl from '~components/inspector/controls/FormControl'
import { Dataset } from './ChartPanel'

const ChartDataset = (
    {
      index = 0,
      dataset = []
    }
    : 
    {
      index: Number
      data: Dataset
    }
  ) => {

    console.log(dataset)

  const { setValueFromEvent } = useForm()
  const datasetLabel = ""
  const datasetId = useId()

  return (
    <>
      <FormControl htmlFor={datasetId} label={'datasetlabel'}>
        <Input
          id={datasetId}
          placeholder="datasetlabel"
          value={datasetLabel || ""}
          size="sm"
          name={`datasetlabel${index}`}
          onChange={setValueFromEvent}
        />
      </FormControl>

    </>
  )
}

export default ChartDataset
