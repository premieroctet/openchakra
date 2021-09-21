import {withTranslation} from 'react-i18next'
import React from 'react'
import 'suneditor/dist/css/suneditor.min.css'
import Grid from '@material-ui/core/Grid'
import SunEditor, {buttonList} from 'suneditor-react'

/**
TODO : chargement dynamique buttonList
const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
})
*/

class HtmlEditor extends React.Component {
  constructor(props) {
    super(props)
    this.options={
      colorList: [
        ['#ccc', '#dedede', 'OrangeRed', 'Orange', 'RoyalBlue', 'SaddleBrown'],
        ['SlateGray', 'BurlyWood', 'DeepPink', 'FireBrick', 'Gold', 'SeaGreen'],
      ],
      buttonList: buttonList.complex,
    }
  }

  onChange = html => {
    if (this.props.onChange) {
      this.props.onChange(html)
    }
  }

  render() {

    return (
      <Grid>
        <span>{this.props.title}</span>
        <SunEditor
          setOptions={this.options}
          onChange={this.onChange}
          defaultValue={this.props.value}
        />
      </Grid>
    )
  }

}

export default withTranslation('custom', {withRef: true})(HtmlEditor)
