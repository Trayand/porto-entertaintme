import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DarkTheme } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const tab1 = () => {
    return <View>
        <Text style={{ color: DarkTheme.colors.text }} >Tab 1</Text>
        <Text style={{ color: DarkTheme.colors.text }} >Tab 1</Text>
        <Text style={{ color: DarkTheme.colors.text }} >Tab 1</Text>
    </View>
}

export default function RootNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="tab 1" component={tab1} />
        </Tab.Navigator>
    )
}