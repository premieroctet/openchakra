const BORDER_COLOR = '#DDD'
const BORDER_STYLE = 'dotted'
const BORDER_WIDTH = '1px'
const BACKGROUND_COLOR = '#182D45'
const YELLOW_COLOR = '#C99D24'
const LIGHT_FONT = '#4B4B4B'
const FONT_FAMILY='Roboto'
const MARGIN='10px'

export default theme => ({
  body: {
    padding: 50,
    fontFamily: 'SourceSansPro',
    fontSize: 11,
    fontWeight: 'bold',
  },
  contents: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    font: FONT_FAMILY,
  },
  logo: {
    width: '20%',
    marginBottom: MARGIN,
  },
  lightText: {
    color: LIGHT_FONT,
  },
  addresses: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: MARGIN,
    marginBottom: MARGIN,
  },
  address: {
    width: '100%',
  },
  group: {
    margin: MARGIN,
    display: 'flex',
    flexDirection: 'row',
    borderColor: BORDER_COLOR,
    borderStyle: BORDER_STYLE,
    borderWidth: BORDER_WIDTH,
  },
  groupHeader: {
    width: '30%',
    backgroundColor: BACKGROUND_COLOR,
    paddingTop: MARGIN,
    textAlign: 'center',
    color: 'white',
    alignItems: 'center',
  },
  groupBody: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    padding: MARGIN,
    color: LIGHT_FONT,
  },
  optionTitle: {
    maxWidth: '15%',
    display: 'inline-block',
    backgroundColor: YELLOW_COLOR,
    margin: MARGIN,
  },
  illustration: {
    marginTop: MARGIN,
    marginBottom: MARGIN,
    width: '80px',
  },
  optionBody: {
    marginLeft: MARGIN,
  },
  summary: {
    display: 'flex',
    flexDirection: 'row',
    margin: MARGIN,
    padding: MARGIN,
    borderColor: BORDER_COLOR,
    borderRightColor: 'white',
    borderLeftColor: 'white',
    borderWidth: BORDER_WIDTH,
    borderStyle: BORDER_STYLE,
  },
  summaryBlock: {
    width: '100%',
  },
  footer: {
    textAlign: 'center',
    paddingTop: '1vh',
    borderTop: '1 solid grey',
    bottom: -130,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    marginTop: MARGIN,
    marginBottom: MARGIN,
    textAlign: 'center',
  },
  infos: {
    marginTop: '7vh',
    paddingTop: '1vh',
    borderTop: '1 solid black',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: '8vh',
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})
