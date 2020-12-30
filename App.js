import {WebView} from 'react-native-webview';
import React, { useState, useRef, useEffect } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

const App = () => {
    useEffect(()=>{

        SplashScreen.hide();

    });

    const webviewRef = useRef(null);

    return (
        <>
            <StatusBar style={styles.statusBar} />
            <SafeAreaView style={styles.flexContainer}>
                <WebView
                    startInLoadingState={true}
                    allowsBackForwardNavigationGestures
                    mediaPlaybackRequiresUserAction={true}
                    source={{ uri: "https://my-alfred.io/" }}
                    ref={webviewRef}
                />
            </SafeAreaView>
        </>
    )
};

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    statusBar:{
        backgroundColor: 'transparent',
        color: '#EDEDED'
    }
});

export default App
