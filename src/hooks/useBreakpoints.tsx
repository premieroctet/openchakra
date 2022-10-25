import React from 'react'
import {useAllPropsSelector} from '~hooks/usePropsSelector'
import { Button, Select, useTheme } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'


export interface responsiveProperties {
  [property: string]: {
    [bkptNickName: string]: string
  }
}

function useBreakpoints(properties: string[] = []) {

  const { setValue } = useForm()
  const propsvalues = useAllPropsSelector(properties)
  // console.log('propvalues', trucenplus)
  const theme = useTheme()
  const themeBreakpoints: { string: string } = theme.breakpoints

  // @ts-ignore
  const responsiveValues: responsiveProperties = Object.fromEntries(Object.entries(propsvalues)
    .map(([key, data]) => [key, typeof data === 'string' && data.length > 0 ? {base: data} : data]))

  const settledBreakpoints = Object.entries(responsiveValues).reduce((acc: string[] = [], [key, data]) => {
    const currbkpt = Object.keys(data)
    
    currbkpt.forEach((bkpt: string) => {
      if (!acc.includes(bkpt)) {
        acc.push(bkpt)
      }
    })
    return acc
  }, [])
  
  const availableBreakpoints = Object.keys(themeBreakpoints)
    .filter(bkpt => !settledBreakpoints.includes(bkpt))


  const handleBreakpoints = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [breakpoint, propertyToUpdate] = e?.target?.name.split('-')
    const { value } = e.target
      
    let newCustomRespProps = responsiveValues[propertyToUpdate]
      
    if (value) {
      newCustomRespProps = { ...newCustomRespProps, [breakpoint]: value }
    } else {
      let prepareRespProps = newCustomRespProps
      if (prepareRespProps?.[breakpoint]) {
        delete prepareRespProps[breakpoint]
      }
      newCustomRespProps = Object.keys(prepareRespProps).length !== 0 ? prepareRespProps : {}
    }

    setValue(propertyToUpdate, newCustomRespProps)
  }

  const AddABreakpoint = ({currentProps}: {currentProps: any}) => {
    const addBreakpoint = (e: {
      target: { form: { [x: string]: { value: string } } }
    }) => {
      /* Doesn't matter which property triggers */
      setValue(properties[0], {...currentProps[properties[0]], [e.target.form['addBreakpoint'].value]: ''})
    }
  
    return (
      // @ts-ignore
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
        {/* @ts-ignore */}
        <Button type='submit' size="xs" onClick={(ev) => addBreakpoint(ev)}>
          Add breakpoint
        </Button>
      </form>
    )
  }

  return {responsiveValues, settledBreakpoints, handleBreakpoints, AddABreakpoint}
}

export default useBreakpoints