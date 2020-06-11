import React, { useState, useRef } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
    View,
    TouchableOpacity,
    Text
} from 'react-native'
import WebView from 'react-native-webview'
import {BackHandler } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends React.Component{
    constructor() {
        super();
        this.state={
            canGoBack: false
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (this.state.canGoBack) {
            this.refWeb.goBack();
        }
        else{
            this.props.navigation.goBack(null)
        }
        return true;
    };

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack
        });
    }

    render(){
        return (
            <>
                <Stack.Navigator>
                    <StatusBar barStyle='dark-content' />
                    <SafeAreaView style={styles.flexContainer}>
                        <WebView
                            ref={(myWeb) => this.refWeb = myWeb}
                            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                            source={{ uri: 'https://my-alfred.io/' }}
                            startInLoadingState={true}
                            renderLoading={() => (
                                <ActivityIndicator
                                    color='black'
                                    size='large'
                                    style={styles.flexContainer}
                                />
                            )}
                        />
                    </SafeAreaView>
                </Stack.Navigator>
            </>
        );
    }
};

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    tabBarContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#b43757'
    },
    button: {
        color: 'white',
        fontSize: 24
    }
});

