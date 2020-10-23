import React from 'react'
import withSlide from '../../hoc/Slide/SlideShow';
import styles from '../../static/css/homePage/index';
import withStyles from '@material-ui/core/styles/withStyles';

class TestDiv extends React.Component {
  render() {
    return (
      <div>A test</div>
    )
  }
}
const SlideDiv = withSlide(TestDiv);

class SlideTest extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }

  render() {
    const{classes} = this.props;

    return(
      <SlideDiv style={classes} data={[]}/>
    );
  }

}

export default withStyles(styles, {withTheme: true})(SlideTest);
