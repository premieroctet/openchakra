import React from 'react'

const DateComp = ({"data-value": dataValue, "data-format": dataFormat, ...props}:{'data-value': string, 'data-format': string}) => {

    const date = new Date(dataValue)
    const dateOptionsToConsider = dataFormat || {}

    // TODO fr-FR locale dynamic
    const dateTimeFormat = new Intl.DateTimeFormat('fr-FR', dateOptionsToConsider);
    const dateToDisplay = dateTimeFormat.format(date)

    return (
    <span {...props}>{dateToDisplay}</span>
)}

export default DateComp
