export default theme => ({
  newsLetterMainStyle:{
    padding: theme.padding.homePage.section.padding
  },
  newsLetterMainContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  newsLetterLeftContainer:{
    display: 'flex',
    flexDirection: 'column',
    width: '30%'
  },
  newsLetterTitle:{
    fontFamily: theme.typography.subTitle.fontFamily,
    fontWeight: theme.typography.subTitle.fontWeight,
    margin: theme.typography.subTitle.margin,
  },
  newsLetterSubTitle:{
    fontFamily: theme.typography.text.fontFamily,
    color: theme.typography.text.color,
    fontWeight: theme.typography.text.fontWeight,
    fontSize: theme.typography.text.fontSize
  },

  newsLetterRightContainer:{
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    alignItems: 'center'
  },
  newsLetterContainer:{
    width: '100%'
  },
  newsLetterTextField:{
    width: '100%',
    marginBottom: '8%',
    [`& fieldset`]: {
      borderRadius: theme.border.textField.borderRadius,
    },
  },
  newsLetterEmailIcon:{
    color: 'rgba(128,128,128,1)'
  },
  newsLetterButton:{
    color: theme.palette.white.main,
    fontWeight: theme.typography.blackButton.fontWeight,
    fontFamily: theme.typography.blackButton.fontFamily,
    backgroundColor: theme.palette.black.main,
    borderRadius: theme.border.blackButton.borderRadius,
    padding: theme.padding.blackButton.padding,
  },

  newsLetterButtonGoogle:{
    fontWeight: theme.typography.blackButton.fontWeight,
    fontFamily: theme.typography.blackButton.fontFamily,
    borderRadius: theme.border.blackButton.borderRadius,
    padding: theme.padding.blackButton.padding,
    width: '100%'
  },
  newsLetterText:{
    color: theme.palette.black.main,
    fontSize: theme.typography.text.fontSize,
    fontWeight: theme.typography.text.fontWeight,
    fontFamily: theme.typography.text.fontFamily,
  },
})
