import React from 'react'
import { Flex, Icon, Checkbox } from '@chakra-ui/react'
import icons from '~iconsList'

const DateComp = ({
  checked,
  iconCheck,
  iconUncheck,
  children,
  ...props
}: {
  checked: boolean
  iconCheck: string
  iconUncheck: string
  children: React.ReactNode
}) => {

  const IconChecked = icons[iconCheck]

  console.log(icons[iconCheck])
  const IconUnchecked = icons[iconUncheck]


  return <Flex {...props}>
    <Checkbox isChecked={checked}>
      <IconChecked />
    </Checkbox>
    {children}
    </Flex>
}

export default DateComp
