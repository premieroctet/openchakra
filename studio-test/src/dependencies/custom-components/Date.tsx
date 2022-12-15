import React from 'react'
import { Text } from '@chakra-ui/react';

const DateComp = ({"data-value": dataValue, "data-format": dataFormat, ...props}:{'data-value': string, 'data-format': string}) => {

    const date = dataValue && new Date(dataValue)
    const dateOptionsToConsider = dataFormat || {}

    // TODO fr-FR locale dynamic
    const dateTimeFormat = new Intl.DateTimeFormat('fr-FR', dateOptionsToConsider);
    const dateToDisplay = date && dateTimeFormat.format(date)

    return (
    <Text as={'span'} {...props}>{dateToDisplay}</Text>
)}

export default DateComp
