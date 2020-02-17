import React from 'react';
import { View } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

import RootNavigator from './RootNavigator'
import DetailScreen from '../screen/DetailScreen';

export default function StackRootNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="movie"
                component={RootNavigator}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="detail"
                component={DetailScreen}
                options={{
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#190061' },
                    headerTintColor: 'white',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
        </Stack.Navigator>
    )
}