export default theme => ({
    fullContainer: {
        display:'flex',
        flexDirection:'row',
        width: '100%',
    },
    loginContainer: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width: '40%',
    },
    card: {
        padding: '1.5rem 3rem',
        width: 400,
        marginTop: '15%',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
        }
    },
    cardContant: {
        flexDirection: 'column',
    },
    linkText: {
        textDecoration: 'none',
        color: 'black',
        fontSize: 12,
    },

    [theme.breakpoints.between('sm','xl')]: {
        secondContainer: {
            width: '60%',
            heigh: '100vh',
            textAlign: 'center',
        }
    },
    [theme.breakpoints.down('sm')]: {
        secondContainer: {
            display:'none'
        },
        hrStyle:{
            display:'none'
        },
        fullContainer: {
            flexDirection:'column',
        },
        loginContainer:{
            width : 'inherit'
        }
    },
    [theme.breakpoints.only('xs')]:{
        loginContainer:{
            marginTop:75
        }
    },
    hrStyle:{
        borderWidth: 0.5,
        color:'lightgray'
    }
})
