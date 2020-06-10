/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { WebView } from 'react-native-webview';

const App: () => React$Node = () => {
  return (
      <>
        <SafeAreaView style={styles.flexContainer}>
            <WebView
                source={{ uri: 'https://my-alfred.io/' }}
                style={{ marginTop: 20 }}
            />
        </SafeAreaView>
      </>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1
  }
});

export default App;
