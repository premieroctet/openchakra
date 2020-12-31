import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';

const AppStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={[styles.statusBar, backgroundColor]}>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const BAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    color: 'yellow'
  },
});

export default AppStatusBar;
