import React, { memo, useState } from 'react'
import { Flex, Button, Select, useTheme } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { ComboboxOption } from '@reach/combobox'
import InputSuggestion from '~components/inspector/inputs/InputSuggestion'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import FlexPanel from './FlexPanel'

function responsiveOptions(data: object) {
  return JSON.stringify(data)
}

const DisplayPanel = () => {
  const { setValueFromEvent, setValue } = useForm()
  const display = usePropsSelector('display')

  const theme = useTheme()

  const availableBreakpoints = theme.breakpoints
  const [breakpointToAdd, setBreakpointToAdd] = useState('base')

  const displayString = typeof display === 'string'
  const valueToDisplay =
    typeof display === 'string'
      ? responsiveOptions({ base: display })
      : responsiveOptions(display)
  const [settledBreakpoints, setSettledBreakpoints] = useState(
    !displayString ? JSON.parse(valueToDisplay) : new Set(),
  )

  Array.from(settledBreakpoints).map(e => console.log('ahh', e))

  console.log('Object.keys(display)', Object.keys(display), display)

  console.log('display', display, displayString, valueToDisplay)
  console.log('settledBreakpoints', settledBreakpoints)
  /**
   * On parse la valeur display s'il y en a
   * Si c'est une chaine non vide, passer en valeur de base,
   * Si c'est un object, parse de l'objet, et pour chaque breakpoint, afficher un Select associé
   */

  const AddABreakpoint = () => {
    return (
      <Flex>
        <FormControl label="breakpoint" htmlFor="breakpoint">
          <Select
            size="sm"
            value={breakpointToAdd || ''}
            name="addBreakpoint"
            id="breakpoint"
            onChange={e => setBreakpointToAdd(e.target.value)}
          >
            {Object.keys(availableBreakpoints).map(bkpt => (
              <option key={bkpt} value={bkpt}>
                {bkpt}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button size="xs" onClick={addBreakpoint}>
          Add breakpoint
        </Button>
      </Flex>
    )
  }

  const breakpointsToDisplay = Object.entries(availableBreakpoints)
    .sort((a, b) => {
      const [bka, msa] = a
      const [bkb, msb] = b

      if (parseInt(msa) < parseInt(msb)) {
        return -1
      }
      return 1
    })
    .map(([bk, val]) => bk)

  const handleBreakpoints = (e: Event) => {
    console.log('e.target.name', e?.target?.name)

    const [breakpoint] = e?.target?.name.split('-')
    console.log('breakpoint', breakpoint)
    const { value } = e.target

    const data = display
    console.log('data', data)

    data[breakpoint] = value

    setValue('display', data)
  }

  const addBreakpoint = () => {
    setSettledBreakpoints(new Set([...settledBreakpoints, breakpointToAdd]))
  }

  /* Au départ, pas de valeur, pas de breakpoint */

  if (displayString && settledBreakpoints.length) {
    return (
      <>
        <FormControl label="Display">
          <Select
            size="sm"
            value={valueToDisplay || ''}
            onChange={setValueFromEvent}
            name="display"
          >
            <option>block</option>
            <option>flex</option>
            <option>inline</option>
            <option>grid</option>
            <option>inline-block</option>
          </Select>
        </FormControl>

        <AddABreakpoint />
      </>
    )
  }

  return (
    <>
      {Array.from(settledBreakpoints).map((breakpoint, i) => (
        <>
          {' '}
          {breakpoint}
          <FormControl key={i} label="Display">
            <Select
              size="sm"
              value={valueToDisplay || ''}
              onChange={handleBreakpoints}
              name={`${breakpoint}-display`}
            >
              <option value={JSON.stringify({ breakpoint: 'block' })}>
                block
              </option>
              <option value={JSON.stringify({ breakpoint: 'flex' })}>
                flex
              </option>
              <option value={JSON.stringify({ breakpoint: 'inline' })}>
                inline
              </option>
              <option value={JSON.stringify({ breakpoint: 'grid' })}>
                grid
              </option>
              <option value={JSON.stringify({ breakpoint: 'inline-block' })}>
                inline-block
              </option>
            </Select>
          </FormControl>
        </>
      ))}

      <AddABreakpoint />

      {/*<InputSuggestion
        value={fontSize}
        handleChange={setValueFromEvent}
        name="fontSize"
      > */}
      {/* {Object.keys(theme.breakpoints).map(option => (
          <ComboboxOption key={option} value={option} />
        ))} */}
      {/* </InputSuggestion> */}

      {display === 'flex' && <FlexPanel />}
    </>
  )
}

export default memo(DisplayPanel)
