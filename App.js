import React from "react";
import {
    View,
    StatusBar
} from "react-native";
import {WebView} from 'react-native-webview';
import SplahScreen from 'react-native-splash-screen'

class App extends React.Component {

    componentDidMount(){
        SplahScreen.hide()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle={"default"}/>
                <WebView
                    allowsBackForwardNavigationGestures
                    source={{ uri: "https://my-alfred.io/" }}
                />
            </View>
        );
    }
}

export default App;
