import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import classNames from 'classnames'

const styles = {
  _modalRoot: {
    pointerEvents: 'none',
  },
  paper: {
    pointerEvents: 'auto',
  },
}

export default function hoverWorkaround(Comp) {
  /* eslint-disable react/display-name */
  const HoverWorkaround = React.forwardRef(
    (
      {
        classes: { _modalRoot, ...classes },
        ModalClasses,
        style,
        className,
        ...props
      },
      ref
    ) => (
      <Comp
        ref={ref}
        classes={classes}
        className={classNames(className, _modalRoot)}
        style={{ pointerEvents: 'none', ...style }}
        {...props}
      />
    )
  )
  return withStyles(styles)(HoverWorkaround)
}
