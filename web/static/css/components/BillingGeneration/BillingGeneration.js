const BORDER_COLOR = 'white'
const BORDER_STYLE = 'solid'
const COLDESCRIPTION_WIDTH = 40
const COLN_WIDTH = (100 - COLDESCRIPTION_WIDTH) / 3
const BACKGROUND_COLOR = '#CCDCFB';

export default theme => ({
  body: {
    padding: 50,
    fontFamily: 'SourceSansPro',
    fontSize: 12
  },
  footer: {
    textAlign: 'center',
    paddingTop: '1vh',
    borderTop: '1 solid grey',
    bottom: -130
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    margin: '3vh 0'
  },
  object: {
    fontWeight: 600
  },
  objectHead: {
    marginRight: '1vh',
    fontWeight: 600

  },
  infos: {
    marginTop: '7vh',
    paddingTop: '1vh',
    borderTop: '1 solid black'
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: '8vh'
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  tableColHeaderDescription: {
    width: COLDESCRIPTION_WIDTH + '%',
    backgroundColor: BACKGROUND_COLOR,
    textAlign: 'center',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: 'white',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableColHeader: {
    width: COLN_WIDTH + "%",
    backgroundColor: BACKGROUND_COLOR,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: 'white',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableColDescription: {
    width: COLDESCRIPTION_WIDTH + '%',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCellHeader: {
    margin: '5 2 5 0',
    fontSize: 12,
    fontWeight: 600
  },
  tableCellHeaderNum: {
    margin: '5 2 5 0',
    fontSize: 12,
    fontWeight: 600,
    textAlign: 'right'
  },
  tableCell: {
    margin: '5 2 5 0',
    fontSize: 10
  },
  tableCellNum: {
    margin: '5 2 5 0',
    fontSize: 10,
    textAlign: 'right'
  },
  tableCellTTC: {
    margin: '5 2 5 0',
    fontSize: 10,
    textAlign: 'right',
    fontWeight: 600
  },
  TableCellResult: {
    margin: '5 2 5 0',
    fontSize: 10,
    textAlign: 'right',
    backgroundColor: BACKGROUND_COLOR
  }
});