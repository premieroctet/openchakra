export default theme => ({
    formSchedule:{
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginBottom: '5%'
        },
    },
    panelFormDays:{
        width: '100%',
        display: 'flex',
    },
    containerSelectSlotTimer:{
        width: '50%',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center'
        },

    },
    textFieldChips:{
        color: 'white',
        fontWeight: 'bold',
        margin: 5
    },
    policySizeTitle:{
        margin: 0,
        overflowWrap: 'break-word !important',
        fontSize: 24,
        fontWeight: 800,
        lineHeight: '1.25em',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
        color: 'rgb(72, 72, 72)',
        paddingTop: 2,
        paddingBottom: 2
    },
})
