const widthDrawer = '35%';

export default theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: widthDrawer,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${widthDrawer}px)`,
            marginLeft: 250,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: widthDrawer,
        right: 0,
        left:'inherit',
        marginTop: 100,
        [theme.breakpoints.down('xs')]: {
            margin: 0,
            width: '100%',
            height: '100%',
            padding: '2%'
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    textFieldChips: {
        color: 'white',
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
            margin: 5
        },
    },
})
