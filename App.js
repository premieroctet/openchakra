import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
} from "react-native";
import {WebView} from 'react-native-webview';

class App extends React.Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    allowsBackForwardNavigationGestures
                    source={{ uri: "https://my-alfred.io/" }}
                    startInLoadingState={true}
                    renderLoading={() => (
                        <ActivityIndicator
                            color='black'
                            size='large'
                            style={styles.flexContainer}
                        />
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
});

export default App;
