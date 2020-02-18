import React from 'react';
import { Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';


const tab1 = () => {
    return <Text>TESST</Text>
}
const Stack = createStackNavigator()

import RootNavigator from './RootNavigator'
import DetailScreen from '../screen/DetailScreen';
import CreateScreen from '../screen/CreateScreen';
import EditScreen from '../screen/EditScreen';

export default function StackRootNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="list"
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
            <Stack.Screen
                name="Create"
                component={CreateScreen}
                options={{
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#190061' },
                    headerTintColor: 'white',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
            <Stack.Screen
                name="Edit"
                component={EditScreen}
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