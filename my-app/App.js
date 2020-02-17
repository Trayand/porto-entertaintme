import React from 'react';
import { StyleSheet, Text, View, StatusBar, Provide } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { configureFonts, DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import ApolloClient from './graphql';
import { ApolloProvider } from '@apollo/react-hooks';


import Constants from 'expo-constants';
import RootNavigator from './navigators/RootNavigator'
import StackNavigator from './navigators/StackRootNavigator';

module.exports = function App() {

  return (
    <ApolloProvider client={ApolloClient} >
      <PaperProvider theme={MyTheme}>
        <NavigationContainer theme={MyTheme}>
          <View style={{ height: Constants.statusBarHeight, backgroundColor: 'black' }}></View>
          <View style={styles.container} >
            {/* <StatusBar barStyle="light-content" backgroundColor="#6a51ae" /> */}
            <StackNavigator />
          </View>
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // paddingBottom: Constants.statusBarHeight
  },
});

const MyTheme = {
  ...DarkTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DarkTheme.colors,
    // primary: '#414141', // dark one but light more
    // background: '#525252', // lighten
    card: '#313131',// darker
    text: '#fff', // white
    border: '#fcffed', // lime
    accent: "#f1c40f" // light orange
  },
};

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};