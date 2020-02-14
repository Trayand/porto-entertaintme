import React from 'react';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const tab1 = () => {
    return <Text>Tab 1</Text>
}

export default function RootNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="tab 1" component={tab1} />
        </Tab.Navigator>
    )
}