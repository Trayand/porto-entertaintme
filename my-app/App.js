import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#414141',
    background: '#525252',
    card: '#313131',
    text: '#fff',
    border: '#fcffed',
  },
};
import Constants from 'expo-constants';
import RootNavigator from './navigators/RootNavigator'

module.exports = function App() {

  return (
    <NavigationContainer theme={MyTheme}>
      <View style={styles.container} >
        <StatusBar barStyle="dark-content" />
        <RootNavigator />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight
  },
});
