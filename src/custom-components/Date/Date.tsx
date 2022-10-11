import { Box } from '@chakra-ui/react'
import React from 'react'

const DateComp = ({date, dataFormat, ...props}:{date: string, dataFormat: string}) => (
    <Box {...props}>{date}</Box>
)

export default DateComp
