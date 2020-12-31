export default theme =>({
  cardPreviewContainerAvatar:{
    width: 100,
    height:100,
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid rgba(112, 112, 112, 0.3)'
  },
  cardPreviewLarge: {
    width: '90%',
    height: '90%',
  },
  cardPreviewBoxContentContainer:{
    border: '2px solid rgba(112, 112, 112, 0.3)',
    width: 250,
    borderRadius: 22,
    height: '100%',
    position:'relative'
  },
  cardPreviewBoxContentPosition:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
    marginTop: '2vh'
  },
  cardPreviewContentIdentity:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '90%'
  },
  cardPreviewNameAlfred:{
    fontFamily: theme.typography.textAlfredName.fontFamily,
    fontWeight: theme.typography.textAlfredName.fontWeight,
    fontSize: theme.typography.textAlfredName.fontSize,
    margin: theme.typography.textAlfredName.margin
  },
  cardPreviewLabelService:{
    fontFamily: theme.typography.textLabel.fontFamily,
    fontWeight: theme.typography.textLabel.fontWeight,
    fontSize: theme.typography.textLabel.fontSize,
    margin: theme.typography.textLabel.margin
  },
  cardPreviewServiceContent:{
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },

  cardPreviewRatingBox:{
    display: 'flex',
    alignItems: 'center',
    margin:0,
    padding: 0
  },
})
