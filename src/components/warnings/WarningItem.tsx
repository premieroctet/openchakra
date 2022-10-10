import {
  Box,
  Text,
  List,
  ListItem,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import React, { useState, memo, useEffect, useMemo } from 'react'
import styled from 'styled-components'

import { getShowWarnings } from '~core/selectors/app'
import useDispatch from '~hooks/useDispatch'

const WarningItem = ({warning}) => {

  const dispatch=useDispatch()

  const selectComponent = e => {
    e.preventDefault()
    if (warning.component.id) {
      dispatch.project.select(warning.component.id)
    }
  }

  return (
    //@ts-ignore
    <ListItem onClick={selectComponent} margin='5px'>
    <Box fontSize='sm'>
    <Text>{warning.component.type} {warning.component.id}</Text>
    <Text>{warning.message}</Text>
    </Box>
    </ListItem>
  )
}

export default WarningItem
