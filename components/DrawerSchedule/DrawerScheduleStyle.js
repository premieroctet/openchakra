const widthDrawer = 550;

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
        marginTop: 130
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    paperAnchorLeft:{
        left:'inherit !important ',
        right:'0 !important',
        backgroundColor: 'red'
    },
    panelFormDays:{
        width : '250px',
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
    },
    textFieldChips: {
        color: 'white'

    },
})
