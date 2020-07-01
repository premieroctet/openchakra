export default theme => ({
    fullContainer: {
        display:'flex',
        flexDirection:'row',
        width: '100%',
    },
    datenaissance: {
        marginTop: 20,
        width: '100%'
    },
    newContainer: {
        padding: 10,
    },
    country: {
        width: '100%'
    },

    birthday:{
        height:40,
        fontSize: '0.9rem'
    },
    rootStepper:{
        width: '100%',
        flexGrow: 1,

    },
    margin:{
        margin: theme.spacing(1),
        width: '100%'
    },
    textFieldAlgo:{
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,

    },
    mainContainer:{
        [theme.breakpoints.down("xs")]:{
            display: 'flex',
            justifyContent: 'center',

        }
    },
    signupContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]:{
            marginBottom: 200
        }

    },
    card: {
        fontFamily: 'Helvetica',
        width: 800,
        marginTop: '100px',
        [theme.breakpoints.down("xs")]:{
            width: '90%',
        }
    },
    banner: {
        marginBottom: 25,
        backgroundColor: '#2FBCD3',
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down("xs")]:{
            textAlign: 'center'
        }

    },
    title: {
        fontFamily: 'Helvetica',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 0,
        paddingTop: 22,
        letterSpacing: 1,
    },
    widthTextField:{
        width: '70%',
        [theme.breakpoints.down("xs")]:{
            width: '80%',
        }
    },
    bottomContainer:{
        alignItems: 'center',
        [theme.breakpoints.down("xs")]:{
           justifyContent: 'center',
        }
    },
    progress:{
        [theme.breakpoints.down("xs")]:{
            width: '25%',
        }
    },
    containerStepper:{
        [theme.breakpoints.down("xs")]:{

        }
    }
})
