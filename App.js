import React, { Fragment } from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    BackHandler,
    StatusBar
} from "react-native";
import { WebView } from "react-native-webview";
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions
} from "react-native/Libraries/NewAppScreen";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.startingUrl =
            "https://my-alfred.io/";
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    }

    handleBackButton = () => {
        console.log(this.state);
        const { canGoBack } = this.state;
        if (canGoBack) {
            this.webView.goBack();
            return true;
        } else {
            return false;
        }
    };

    render() {
        return (
            <Fragment>
                <WebView
                    source={{ uri: this.startingUrl }}
                    style={{ marginTop: 20 }}
                    ref={webView => (this.webView = webView)}
                    injectedJavaScript={`
                      (function() {
                        function wrap(fn) {
                          return function wrapper() {
                            var res = fn.apply(this, arguments);
                            window.ReactNativeWebView.postMessage('navigationStateChange');
                            return res;
                          }
                        }
            
                        history.pushState = wrap(history.pushState);
                        history.replaceState = wrap(history.replaceState);
                        window.addEventListener('popstate', function() {
                          window.ReactNativeWebView.postMessage('navigationStateChange');
                        });
                      })();
            
                      true;
                    `}
                    onMessage={({ nativeEvent: state }) => {
                        if (state.data === "navigationStateChange") {
                            // Navigation state updated, can check state.canGoBack, etc.
                            this.setState({
                                canGoBack: state.canGoBack
                            });
                        }
                    }}
                />
            </Fragment>
        );
    }
}

export default App;
