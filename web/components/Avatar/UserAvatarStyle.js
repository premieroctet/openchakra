export default theme => ({
  popover: {
    pointerEvents: 'none',
    position: 'relative',

  },
  paper: {
    backgroundColor: '#f87280',
    color: 'white',
    padding: theme.spacing(1),
  },

  badge: {
    backgroundColor: '#f87280',
    color: '#f87280',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
})
