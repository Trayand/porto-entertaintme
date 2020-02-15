import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DarkTheme } from '@react-navigation/native';

const Stack = createStackNavigator()
import MovieScreen from '../../screen/MovieScreen';

const tab1 = () => {
    return <View>
        <Text style={{ color: DarkTheme.colors.text }} >Tab 1</Text>
        <Text style={{ color: DarkTheme.colors.text }} >Tab 1</Text>
        <Text style={{ color: DarkTheme.colors.text }} >Tab 1</Text>
    </View>
}

export default function StackRootNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="movie"
                component={MovieScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Gambar"
                component={tab1}
            />
        </Stack.Navigator>
    )
}