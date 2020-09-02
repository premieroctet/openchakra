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
    }
})
