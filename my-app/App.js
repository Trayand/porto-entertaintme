import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { configureFonts, DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import ApolloClient from './graphql';
import { ApolloProvider } from '@apollo/react-hooks';

import StackNavigator from './navigators/StackRootNavigator';

module.exports = function App() {

  return (
    <ApolloProvider client={ApolloClient} >
      <PaperProvider theme={MyTheme}>
        <NavigationContainer theme={MyTheme}>
          <View style={styles.container} >
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
  },
});

const MyTheme = {
  ...DarkTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DarkTheme.colors,
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