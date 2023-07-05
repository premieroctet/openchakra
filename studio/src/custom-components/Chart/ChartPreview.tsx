import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useForm } from '~hooks/useForm'
import { useInteractive } from '~hooks/useInteractive'
import { Box } from '@chakra-ui/react'
import Chart from '~dependencies/custom-components/Chart'

const LexicalPreview: React.FC<IPreviewProps> = ({ component }) => {

  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)
  const { setValue } = useForm()

  if (isOver) {
    props.bg = 'teal.50'
  }

  const onChange = event => {
    const {name, value}=event.target
    setValue('value', value)
  }

  return (
    <Box pos="relative" ref={drop(ref)} {...props}>
      <Chart ref={drop(ref)} {...props} onChange={onChange} isEditable/>
    </Box>
  )
}

export default LexicalPreview
