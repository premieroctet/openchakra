import React, { memo } from 'react'
import { Button, Select, useTheme } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import FlexPanel from './FlexPanel'


const DisplayPanel = () => {
  const { setValue } = useForm()
  const display = usePropsSelector('display')

  const customResponsiveProps = typeof display === 'string' ? {} : display
  
  const theme = useTheme()
  const themeBreakpoints: { string: string } = theme.breakpoints
  const settledBreakpoints = Object.keys(customResponsiveProps)
  const availableBreakpoints = Object.keys(themeBreakpoints)
  .filter(bkpt => !settledBreakpoints.includes(bkpt))

  const availableOptions = [
    '',
    'block',
    'flex',
    'inline',
    'grid',
    'inline-block'
  ]
    
  const AddABreakpoint = () => {
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
        <Button type='submit' size="xs" onClick={(e) => addBreakpoint(e)}>
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
      newCustomRespProps = Object.keys(prepareRespProps).length !== 0 ? prepareRespProps : ''
    }

    setValue('display', newCustomRespProps)
  }

  const addBreakpoint = (e: {
    target: { form: { [x: string]: { value: string } } }
  }) => {
    setValue('display', {...customResponsiveProps, [e.target.form['addBreakpoint'].value]: ''})
  }

  return (
    <>
      {settledBreakpoints.map((breakpoint: string, i: number) => (
          <div key={i}>
            {breakpoint}
            <FormControl label="Display">
              <Select
                size="sm"
                value={customResponsiveProps?.[breakpoint] || ''}
                onChange={e => handleBreakpoints(e)}
                name={`${breakpoint}-display`}
              >
                {availableOptions.map((option, i) => <option key={`ao${i}`} value={option}>{option}</option>)}
              </Select>
            </FormControl>
          </div>
        )
      )}

      <AddABreakpoint />

      {display === 'flex' && <FlexPanel />}
    </>
  )
}

export default memo(DisplayPanel)
