import React from 'react'
import { FormLabel, Checkbox, VisuallyHidden } from '@chakra-ui/react'
import {useState} from 'react'
import lodash from 'lodash'

const IconCheck = ({
  id,
  isChecked,
  backgroundColorChecked,
  illu,
  illuColor,
  illuChecked,
  htmlHeight = 40,
  htmlWidth = 40,
  children,
  value,
  insideGroup,
  ...props
}: {
  id:any
  isChecked: boolean
  backgroundColorChecked: string
  illu: string
  illuColor: string
  illuChecked: string
  htmlHeight: number
  htmlWidth: number
  children: React.ReactNode
  insideGroup: boolean
  value: any
}) => {
  const [shouldReload, setShouldReload]=useState(insideGroup)

  let checked=false

  const cbId=`${id}${value}`.replace(/[-_]/g, '')

  // If Checkbox is inside a CheckboxGroup, isChecked is not up to date
  // To get actual checked status inside CheckboxGroup, get the 'checked' attribute
  // of the DOM element found by its id
  if (insideGroup) {
    const cbChecked=document.getElementById(cbId)
    checked=!lodash.isNil(cbChecked?.getAttribute('checked'))
  }
  else {
    checked=isChecked
  }

  const iconpath = checked ? illuChecked : illu
  // @ts-ignore
  const backgroundToDisplay = checked ? backgroundColorChecked : props?.backgroundColor

  if (shouldReload) {
    setTimeout(()=>setShouldReload(false), 0)
  }
  return <FormLabel
      {...props}
      backgroundColor={backgroundToDisplay}
      >
      <VisuallyHidden>
      <Checkbox id={cbId} value={value}/>
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
