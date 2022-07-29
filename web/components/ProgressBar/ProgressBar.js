const React = require('react')
const {LinearProgress} = require('@material-ui/core')
const {withTranslation} = require('react-i18next')

class ProgressBar extends React.Component {

  render = () => {
    const {value, max, label}=this.props
    const min=0
    const percent=(((value+1) - min) * 100) / (max-min)

    return (
      <>
        <h1>{label} {value+1}/{max}</h1>
        <LinearProgress variant="determinate" value={percent} />
      </>
    )
  }
}

module.exports=withTranslation(null, {withRef: true})(ProgressBar)
