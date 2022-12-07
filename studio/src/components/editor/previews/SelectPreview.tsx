import React, { useMemo } from 'react'
import { useInteractive } from '~hooks/useInteractive'
import iconsList from '~iconsList'
import { Select } from '@chakra-ui/react'

interface IProps {
  component: IComponent
}

const SelectPreview = ({ component }: IProps) => {
  const {
    props: { icon, ...props },
  } = useInteractive(component)
  const Icon = useMemo(() => {
    if (!icon) {
      return null
    }
    return iconsList[icon as keyof typeof iconsList]
  }, [icon])

  return (
    <Select {...props} icon={Icon ? <Icon path="" /> : undefined}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  )
}

export default SelectPreview
