import React from 'react'
import usePropsSelector from '~hooks/usePropsSelector'
import { Button, Select, useTheme } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'


export interface definedBreakpoints {
  [bkptName: string]: string
}

function useBreakpoints(property: string) {
    
  const { setValue } = useForm()
  const propvalues = usePropsSelector(property)
  const theme = useTheme()
  const themeBreakpoints: { string: string } = theme.breakpoints

  const responsiveValues: definedBreakpoints = typeof propvalues === 'string' && propvalues.length > 0 ? {base: propvalues} : propvalues

  const settledBreakpoints = Object.keys(responsiveValues)
  const availableBreakpoints = Object.keys(themeBreakpoints)
    .filter(bkpt => !settledBreakpoints.includes(bkpt))


  const handleBreakpoints = (e: React.ChangeEvent<HTMLSelectElement>, currentValues: definedBreakpoints) => {
    const [breakpoint, propertyToUpdate] = e?.target?.name.split('-')
    const { value } = e.target
      
    let newCustomRespProps = null
      
    if (value) {
      newCustomRespProps = { ...currentValues, [breakpoint]: value }
    } else {
      let prepareRespProps = currentValues
      if (prepareRespProps?.[breakpoint]) {
        delete prepareRespProps[breakpoint]
      }
      newCustomRespProps = Object.keys(prepareRespProps).length !== 0 ? prepareRespProps : ''
    }

    setValue(propertyToUpdate, newCustomRespProps)
  }

  const AddABreakpoint = ({currentProps, availableOptions}: {currentProps: any, availableOptions: any}) => {
    const addBreakpoint = (e: {
      target: { form: { [x: string]: { value: string } } }
    }) => {
      setValue(property, {...currentProps, [e.target.form['addBreakpoint'].value]: availableOptions[0]})
    }
  
    return (
      <form onSubmit={(ev) => addBreakpoint(ev)}>
        <FormControl label="breakpoint" htmlFor="breakpoint">
          <Select size="sm" name="addBreakpoint" id="breakpoint">
            {availableBreakpoints.map(bkpt => (
              <option key={bkpt} value={bkpt}>
                {bkpt}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button type='submit' size="xs" onClick={(ev) => addBreakpoint(ev)}>
          Add breakpoint
        </Button>
      </form>
    )
  }

  return {responsiveValues, settledBreakpoints, handleBreakpoints, AddABreakpoint}
}

export default useBreakpoints