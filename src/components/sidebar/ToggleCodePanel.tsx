import React from 'react'
import { FormLabel, FormControl, LightMode, Switch } from '@chakra-ui/react'
import useDispatch from '~hooks/useDispatch'
import { useSelector } from 'react-redux'
import { getShowCode } from '~core/selectors/app'

const TogglePanelCode = () => {
  const showCode = useSelector(getShowCode)
  const dispatch = useDispatch()

  return (
    <FormControl display="flex" flexDirection="column" alignItems="flex-start">
      <FormLabel
        color="gray.200"
        fontSize="sm"
        mr={2}
        mb={1}
        htmlFor="code"
        pb={0}
        whiteSpace="nowrap"
      >
        Code panel
      </FormLabel>
      <LightMode>
        <Switch
          isChecked={showCode}
          id="code"
          colorScheme="teal"
          onChange={() => dispatch.app.toggleCodePanel()}
          size="md"
        />
      </LightMode>
    </FormControl>
  )
}

export default TogglePanelCode
