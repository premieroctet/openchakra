import React, { memo, useState } from 'react'
import {
  Box,
  VStack,
  useRadioGroup,
  useRadio,
  Image,
  Text,
} from '@chakra-ui/react'
import useDispatch from '~hooks/useDispatch'
import { useSelector } from 'react-redux'
import { getDevice } from '~core/selectors/app'
import devices from '~config/devices'

function CustomRadio(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box {...checkbox} display="flex" cursor="pointer" {...props} />
    </Box>
  )
}

const ResponsiveActions = () => {
  const device = useSelector(getDevice)
  const dispatch = useDispatch()
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'device',
    defaultValue: device,
    onChange: dispatch.app.selectDevice,
  })
  const deviceGroup = getRootProps()

  return (
    <VStack {...deviceGroup}>
      {Object.keys(devices).map(devicekey => {
        const { isChecked } = getRadioProps({ value: devicekey })
        return (
          <CustomRadio
            key={devicekey}
            display="flex"
            flexDirection="column"
            alignItems="center"
            {...getRadioProps({ value: devicekey })}
          >
            <Box
              w={'38px'}
              h={'38px'}
              borderRadius="full"
              bg={isChecked ? '#fccb85' : 'gray.200'}
            >
              <Image
                p={'0.5rem'}
                src={devices[devicekey].img}
                width={'100%'}
                height={'100%'}
                objectFit="contain"
                alt={devices[devicekey].category}
                title={devices[devicekey].category}
              />
            </Box>
            {/* <Text color="white" fontSize='xs'>{devices[devicekey].category}</Text> */}
          </CustomRadio>
        )
      })}
    </VStack>
  )
}

export default ResponsiveActions
