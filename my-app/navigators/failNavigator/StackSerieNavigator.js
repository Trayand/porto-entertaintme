import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DarkTheme } from '@react-navigation/native';

const Stack = createStackNavigator()
import SerieScreen from '../../screen/SerieScreen';


export default function StackRootNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="movie"
                component={SerieScreen}
                options={{
                    headerShown: false
                }} />
        </Stack.Navigator>
    )
}