import React from 'react';
import {Text, View} from '@react-pdf/renderer';

class ViewText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View this.props.viewstyle>
        <Text this.props textstyle>
          {this.props.content}
        </Text>
      </View>
    )
  }
}

export default (ViewText)