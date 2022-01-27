const React = require('react')
const {LinearProgress} = require('@material-ui/core')
const {withTranslation} = require('react-i18next')

class ProgressBar extends React.Component {

  render = () => {
    const {value, max}=this.props
    const min=0
    const percent=((value - min) * 100) / (max-min)

    return (
      <>
        <h1>Etape {value+1}/{max}</h1>
        <LinearProgress variant="determinate" value={percent} />
      </>
    )
  }
}

module.exports=withTranslation('custom', {withRef: true})(ProgressBar)
