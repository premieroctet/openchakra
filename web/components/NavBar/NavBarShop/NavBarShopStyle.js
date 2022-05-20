const style=theme => ({
  topbar: {
    visibility: 'visible',
    position: 'sticky',
    top: 70,
    zIndex: 999,
    [theme.breakpoints.down('sm')]: {
      visibility: 'hidden',
    },
  },
})
export default style
