import React from 'react'
import { FormLabel, Checkbox, VisuallyHidden } from '@chakra-ui/react'

const IconCheck = ({
  isChecked,
  backgroundColorChecked,
  illu,
  illuColor,
  illuChecked,
  htmlHeight = 40,
  htmlWidth = 40,
  children,
  ...props
}: {
  isChecked: boolean
  backgroundColorChecked: string
  illu: string
  illuColor: string
  illuChecked: string
  htmlHeight: number
  htmlWidth: number
  children: React.ReactNode
}) => {

  const iconpath = isChecked ? illuChecked : illu
  // @ts-ignore
  const backgroundToDisplay = isChecked ? backgroundColorChecked : props?.backgroundColor

  return <FormLabel 
      {...props} 
      backgroundColor={backgroundToDisplay}
      >
      <VisuallyHidden>
        <Checkbox isChecked={isChecked} />
      </VisuallyHidden>
      <img 
        src={iconpath} 
        width={htmlWidth} 
        height={htmlHeight} 
        alt=""
      />
    {children}
    </FormLabel>
}

export default IconCheck
