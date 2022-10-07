import React, { memo, useState } from 'react'
import { Flex, Button, Select, useTheme } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { ComboboxOption } from '@reach/combobox'
import InputSuggestion from '~components/inspector/inputs/InputSuggestion'
import { useForm } from '~hooks/useForm'
import uniq from 'lodash/uniq'
import usePropsSelector from '~hooks/usePropsSelector'
import FlexPanel from './FlexPanel'

function responsiveOptions(data: object) {
  return JSON.stringify(data)
}

const DisplayPanel = () => {
  const { setValueFromEvent, setValue } = useForm()
  const display = usePropsSelector('display')


  const displayString = typeof display === 'string'
  const initialBreakpoint: string = 'base'
  const customResponsiveProps = displayString ? { [initialBreakpoint]: null } : display
  
  const theme = useTheme()
  const themeBreakpoints: { string: string } = theme.breakpoints
  const [settledBreakpoints, setSettledBreakpoints] = useState(Object.keys(customResponsiveProps))
  
  const availableBreakpoints = Object.keys(themeBreakpoints)
    .filter(bkpt => !Object.keys(customResponsiveProps).includes(bkpt))
    .filter(bkpt => !settledBreakpoints.includes(bkpt))
  
  const valueToDisplay = responsiveOptions(customResponsiveProps)

  // console.log(customResponsiveProps, settledBreakpoints, availableBreakpoints, valueToDisplay)
    
  const AddABreakpoint = () => {
    return (
      <form onSubmit={addBreakpoint}>
        <FormControl label="breakpoint" htmlFor="breakpoint">
          <Select size="sm" name="addBreakpoint" id="breakpoint">
            {availableBreakpoints.map(bkpt => (
              <option key={bkpt} value={bkpt}>
                {bkpt}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button size="xs" onClick={addBreakpoint}>
          Add breakpoint
        </Button>
      </form>
    )
  }

  const handleBreakpoints = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [breakpoint] = e?.target?.name.split('-')
    const { value } = e.target
    
    let newCustomRespProps = {}
    
    if (value) {
      newCustomRespProps = { ...customResponsiveProps, [breakpoint]: value }
    } else {
      let prepareRespProps = customResponsiveProps
      delete prepareRespProps[breakpoint]
      newCustomRespProps = prepareRespProps
    }

    setValue('display', newCustomRespProps)
  }

  const addBreakpoint = (e: {
    target: { form: { [x: string]: { value: string } } }
  }) => {
    // setValue('display', {...customResponsiveProps, [e.target.form['addBreakpoint'].value]: null})
    setSettledBreakpoints(
      uniq([...settledBreakpoints, e.target.form['addBreakpoint'].value]),
    )
  }

  /* De base pas de breakpoint */
  // if (displayString && !settledBreakpoints.length) {
  //   return (
  //     <>
  //       <FormControl label="Display">
  //         <Select
  //           size="sm"
  //           value={valueToDisplay || ''}
  //           onChange={setValueFromEvent}
  //           name="display"
  //         >
  //           <option></option>
  //           <option>block</option>
  //           <option>flex</option>
  //           <option>inline</option>
  //           <option>grid</option>
  //           <option>inline-block</option>
  //         </Select>
  //       </FormControl>
  //       </>
  //   )
  // }


  return (
    <>
      {settledBreakpoints.map((breakpoint: string, i: number) => {

        console.log(customResponsiveProps?.[breakpoint])

        return (
          <div key={i}>
            {breakpoint}
            <FormControl label="Display">
              <Select
                size="sm"
                value={customResponsiveProps?.[breakpoint] || ''}
                onChange={e => handleBreakpoints(e)}
                name={`${breakpoint}-display`}
              >
                <option value={''}></option>
                <option value={'block'}>block</option>
                <option value={'flex'}>flex</option>
                <option value={'inline'}>inline</option>
                <option value={'grid'}>grid</option>
                <option value={'inline-block'}>inline-block</option>
              </Select>
            </FormControl>
          </div>
        )
      })}

      <AddABreakpoint />

      {display === 'flex' && <FlexPanel />}
    </>
  )
}

export default memo(DisplayPanel)
