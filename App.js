import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
} from "react-native";
import {WebView} from 'react-native-webview';
import {Icon} from 'native-base'

class App extends React.Component {
    state = {
        WEBVIEW_REF: "weViewRed",
        loading: false
    };
    goBack = () => {
        this.refs[this.state.WEBVIEW_REF].goBack();
    };
    goForward = () => {
        this.refs[this.state.WEBVIEW_REF].goForward();
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{ uri: "https://my-alfred.io/" }}
                    ref={this.state.WEBVIEW_REF}
                    startInLoadingState={true}
                    renderLoading={() => (
                        <ActivityIndicator
                            color='black'
                            size='large'
                            style={styles.flexContainer}
                        />
                    )}
                />
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={() => this.goBack()}
                        disabled={this.state.canGoBack}
                    >
                        <Icon type={"Ionicons"} name={'arrow-back-outline'}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.icon}>⭐️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.goForward()}>
                        <Icon type={"Ionicons"} name={'arrow-forward'}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    header: {
        paddingTop: 40,
        paddingBottom: 10,
        backgroundColor: "#0c084c"
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    icon: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    footer: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#2FBCD3"
    }
});

export default App;
