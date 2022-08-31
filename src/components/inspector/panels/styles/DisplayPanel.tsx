import React, { memo } from 'react'
import { Select } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import FlexPanel from './FlexPanel'

const BreakpointsOption = () => (
  <Select>
    <option>base</option>
    <option>sm</option>
    <option>md</option>
    <option>lg</option>
    <option>xl</option>
    <option>2xl</option>
  </Select>
)

function responsiveOptions(data) {
  return JSON.stringify(data)
}

const DisplayPanel = () => {
  const { setValueFromEvent } = useForm()
  const display = usePropsSelector('display')

  // const kindOfDisplay = typeof display === 'string' && display.length > 0
  const kindOfDisplay = typeof display === 'string'

  const valueToDisplay = kindOfDisplay ? display : responsiveOptions(display)
  console.log('display', display, kindOfDisplay, valueToDisplay)
  /**
   * On parse la valeur display s'il y en a
   * Si c'est une chaine non vide, passer en valeur de base,
   * Si c'est un object, parse de l'objet, et pour chaque breakpoint, afficher un Select associé
   */

  return (
    <>
      <FormControl label="Display">
        <Select
          size="sm"
          value={valueToDisplay || ''}
          onChange={setValueFromEvent}
          name="display"
        >
          <option value={JSON.stringify({ md: 'block' })}>block</option>
          <option value={'md: block'}>block</option>
          <option>flex</option>
          <option>inline</option>
          <option>grid</option>
          <option>inline-block</option>
        </Select>
      </FormControl>

      <BreakpointsOption />

      {display === 'flex' && <FlexPanel />}
    </>
  )
}

export default memo(DisplayPanel)
