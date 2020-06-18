import React from "react";
import {
    View,
    StatusBar,
    SafeAreaView
} from "react-native";
import {WebView} from 'react-native-webview';
import SplahScreen from 'react-native-splash-screen'

class App extends React.Component {

    componentDidMount(){
        SplahScreen.hide()
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" />
                <View style={{ flex: 1 }}>
                    <WebView
                        allowsBackForwardNavigationGestures
                        mediaPlaybackRequiresUserAction={true}
                        source={{ uri: "https://my-alfred.io/" }}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default App;
