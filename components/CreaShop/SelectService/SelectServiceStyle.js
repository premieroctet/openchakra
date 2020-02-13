import { emphasize } from '@material-ui/core/styles';

export default theme => ({
  mainContainer:{
    width: '100%',
    height: '100%'
  },
  contentContainer:{
    display: 'flex',
    height: 700,
    width: '100%'
  },
  contentLeftTop:{
    width : '100%',
  },
  contentTitle:{
    width: '80%'
  },
  policySizeTitle:{
    margin: 0,
    overflowWrap: 'break-word !important',
    fontSize: 24,
    fontWeight: 800,
    lineHeight: '1.25em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)',
    paddingTop: 2,
    paddingBottom: 2
  },
  policySizeSubtitle:{
    fontSize: 19,
    lineHeight: '1.43em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color :'#484848',
  },
  policySizeContent:{
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '1.375em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)',
  },
  contentTextSize:{
    width : 500,
    marginTop: 30,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
  },

  root: {
    flexGrow: 1,
    height: 250,
    minWidth: 290,
    marginTop: 30
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
})
