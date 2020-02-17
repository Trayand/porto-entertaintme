import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DarkTheme } from '@react-navigation/native';
import Constants from 'expo-constants'

const Tab = createMaterialTopTabNavigator();

const tab1 = () => {
    return <View>
        <Text style={{ color: DarkTheme.colors.text }} >Tab 1</Text>
        <Text style={{ color: DarkTheme.colors.text }} >Tab 1</Text>
        <Text style={{ color: DarkTheme.colors.text }} >Tab 1</Text>
    </View>
}

import MovieScreen from '../screen/MovieScreen';
import SerieScreen from '../screen/SerieScreen';

export default function RootNavigator() {
    return (
        <>
            <View style={{ height: Constants.statusBarHeight, backgroundColor: 'black' }}></View>
            <Tab.Navigator tabBarOptions={{
                swipeEnabled: true,
                activeTintColor: 'white',
                inactiveTintColor: 'gray',
            }}>
                <Tab.Screen name="Movies" component={MovieScreen} />
                <Tab.Screen name="TV Series" component={SerieScreen} />
            </Tab.Navigator>
        </>
    )
}