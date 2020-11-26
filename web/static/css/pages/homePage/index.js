export default theme => ({
    generalWidthContainer: {
        width: '60%',
        [theme.breakpoints.down('xs')]: {
            width: '80%'
        }
    },
    generalWidthContainerNewsLtter: {
        width: '60%',
        [theme.breakpoints.down('lg')]: {
            width: '80%'
        }
    },
    bannerSize: {
        width: '60%',
        [theme.breakpoints.down('xs')]: {
            width: '80%'
        }
    },
    infoBarMainStyle: {
        backgroundColor: theme.palette.backgroundGrey.main,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoBarColorText: {
        color: theme.palette.lightBlack.main,
        fontSize: theme.typography.infoBar.fontSize,
        lineHeight: theme.typography.infoBar.lineHeight,
        fontFamily: theme.typography.infoBar.fontFamily,
        margin: 0,
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center'
        }
    },
    showmoreContainer: {
        marginLeft: 5,
    },
    navbarInput: {
        borderBottom: 'inherit',
        '&::placeholder': {
            opacity: '0.55',
            color: theme.palette.placeHolder.main,
        }
    },
    bannerPresentationTitle: {
        fontFamily: theme.typography.title.fontFamily,
        fontWeight: theme.typography.title.fontWeight,
        color: theme.palette.white.main,
        fontSize: theme.typography.title.fontSize,
        margin: theme.typography.title.margin,
        [theme.breakpoints.down('xs')]: {
            fontSize: '25px'
        }
    },
    bannerPresentationMainStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bannerPresentationContainerDescription: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        marginBottom: '6%',
        [theme.breakpoints.down('md')]: {
            width: '60%'
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    bannerPresentationContainerText: {
        width: '75%'
    },
    bannerPresentationButton: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.white.main,
        fontWeight: theme.typography.whiteButtonContained.fontWeight,
        fontFamily: theme.typography.whiteButtonContained.fontFamily,
        borderRadius: theme.border.whiteButton.borderRadius,
        textTransform: theme.typography.textTransform,
        padding: theme.padding.whiteButtonContained.padding,
        fontSize: theme.typography.whiteButtonContained.fontSize
    },
    bannerPresentationContainerIllustration: {
        display: 'flex',
        alignItems: 'center',
        width: '60%'
    },
    navbarAndBannerContainer: {
        justifyContent: 'center',
        height: '85vh',
        backgroundImage: 'url(../../assets/img/homePage/illuHeader.png)',
        backgroundColor: 'rgba(207,223,252,1)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    navbarAndBannerBackground: {
        width: '100%',
    },
    navbarComponentPosition: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        marginTop: '2%'
    },
    bannerPresentationText: {
        fontFamily: theme.typography.text.fontFamily,
        color: theme.palette.white.main,
        fontWeight: theme.typography.text.fontWeight,
        [theme.breakpoints.down('xs')]: {
            fontSize: '15px'
        }
    },
    bannerPresentationContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10vh'
    },
    mainContainerStyle: {
        justifyContent: 'center',
        marginTop: '10vh',
        marginBottom: '10vh'
    },
    mainNewsLetterStyle: {
        justifyContent: 'center',
    },

    becomeAlfredMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: theme.padding.homePage.section.padding
    },
    becomeAlfredContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    becomeAlfredButton: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.blackButton.fontWeight,
        fontFamily: theme.typography.blackButton.fontFamily,
        backgroundColor: theme.palette.white.main,
        borderRadius: theme.border.blackButton.borderRadius,
        padding: theme.padding.blackButton.padding,
    },
    resaServiceButton: {
        color: '#F8CF61',
        fontWeight: theme.typography.blackButton.fontWeight,
        fontFamily: theme.typography.blackButton.fontFamily,
        backgroundColor: theme.palette.white.main,
        borderRadius: theme.border.blackButton.borderRadius,
        padding: theme.padding.blackButton.padding,
    },
    becomeAlfredTitle: {
        color: theme.palette.white.main,
        fontFamily: theme.typography.subTitle.fontFamily,
        fontWeight: theme.typography.subTitle.fontWeight,
        margin: theme.typography.subTitle.margin,
    },
    becomeAlfredText: {
        fontFamily: theme.typography.text.fontFamily,
        color: theme.palette.white.main,
        fontWeight: theme.typography.text.fontWeight,
        fontSize: theme.typography.text.fontSize
    },
    becomeAlfredComponent: {
        justifyContent: 'center',
        marginTop: '2%',
        backgroundColor: theme.palette.primary.main,
    },
    howItWorksComponent: {
        justifyContent: 'center',
        marginTop: '2%',
        backgroundColor: theme.palette.yellow.main
    },

    ResaServiceMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '3%'
    },


    generalWidthFooter: {
        width: '90%'
    },
    trustAndSecurityContainer: {
        [theme.breakpoints.down('xs')]: {
            marginTop: '5vh',
            marginBottom: '5vh',
            display: 'flex',
            justifyContent: 'center'
        }
    },
    trustAndSecurityComponent: {
        padding: '2vh',
        [theme.breakpoints.down('sm')]: {
            marginTop: '5vh',
            marginBottom: '5vh',
            width: '100%',
        },
        [theme.breakpoints.down('xs')]: {
            margin: 0,
            width: '90%',
        }
    },
    mainContainerStyleFooter: {
        justifyContent: 'center',
        backgroundColor: 'rgba(228, 228, 228, 8)'
    },
    categoryCardRoot: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    cardPreviewMainStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    infoBarLinkContainer: {
        paddingTop: theme.padding.infoBar.paddingTop,
        paddingBottom: theme.padding.infoBar.paddingBottom,
        alignItems: 'center',
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        }
    },
    infoBarPicsContainer: {
        width: 15,
        height: 15,
        marginRight: 5
    },

    shomoreLink: {
        color: theme.palette.link.main,
        fontSize: theme.typography.infoBar.fontSize,
        lineHeight: theme.typography.infoBar.lineHeight,
        fontFamily: theme.typography.infoBar.fontFamily,
        fontWeight: theme.typography.infoBar.fontWeight
    },
})
