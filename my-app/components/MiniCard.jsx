import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function MiniCard(props) {
    const navigation = useNavigation()
    // console.log(props.data, ' ini data dari ' + props.name);
    return (
        <Card
            style={{
                backgroundColor: 'transparent',
                margin: 15,
                padding: 10,
                paddingTop: -10,
                width: 150,
                borderWidth: 0,
            }}
            accessible={true}
            onPress={() => navigation.push('detail', { data: { ...props.data, asal: props.name } })}
        >
            <Card.Cover
                source={{ uri: props.data.poster_path }}
                style={{ height: 160 }}
            />
            <Card.Title
                titleStyle={styles.text, { fontSize: 13 }}
                subtitleStyle={styles.text}
                title={props.data.title}
            />
        </Card>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'whitesmoke',
    }
})