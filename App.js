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

    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');

    const webviewRef = useRef(null);

    backButtonHandler = () => {
        if (webviewRef.current) webviewRef.current.goBack()
    };

    frontButtonHandler = () => {
        if (webviewRef.current) webviewRef.current.goForward()
    };

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.flexContainer}>
                <WebView
                    startInLoadingState={true}
                    allowsBackForwardNavigationGestures
                    mediaPlaybackRequiresUserAction={true}
                    source={{ uri: "https://my-alfred.io/" }}
                    ref={webviewRef}
                    onNavigationStateChange={navState => {
                        setCanGoBack(navState.canGoBack)
                        setCanGoForward(navState.canGoForward)
                        setCurrentUrl(navState.url)
                    }}
                />
                <View style={styles.tabBarContainer}>
                    <TouchableOpacity onPress={backButtonHandler}>
                        <Image
                            style={styles.icon}
                            source={require('./static/Navigation/arrow-back-outline.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={frontButtonHandler}>
                        <Image
                            style={styles.icon}
                            source={require('./static/Navigation/arrow-forward-outline.png')}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    )
};

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    tabBarContainer: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(210,210,210,1)',
    },
    button: {
        color: 'white',
        fontSize: 24
    },
    icon: {
        width: 30,
        height: 30
    }

});

export default App
