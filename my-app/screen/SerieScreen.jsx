import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function SerieScreen(props) {


    return (
        <View>
            <Card
                style={{
                    backgroundColor: '#f0ece2',
                    margin: 15,
                    padding: 10,
                    paddingTop: -10
                }}
                accessible={true}
                onPress={() => Alert.alert('asdas')}
            >
                <View>
                    <Card.Title
                        titleStyle={styles.text}
                        subtitleStyle={styles.text}
                        title="Title disini"
                        subtitle="tap for more"
                    // left={(props) => <Avatar.Icon {...props} icon="folder" />}
                    />
                    <Text></Text>
                </View>
                <Card.Cover
                    source={{ uri: 'https://picsum.photos/700' }}
                    style={{ borderRadius: 30 }} />
                <Paragraph
                    style={styles.text}
                >
                    INI overview nya nanti
                    trus poster untuk Card.cover
                    PANAJAJAJAJAJAJAJAAJj
                    PANAJAJAJAJAJAJAJAAJj
                    PANAJAJAJAJAJAJAJAAJjPANAJAJAJAJAJAJAJAAJj
                    </Paragraph>
                {/* <Text
                    style={{
                        color: 'blue',
                        fontSize: 18,
                        textAlign: 'right',
                        marginRight: 10,
                        marginTop: 10
                    }}
                    onPress={() => Alert.alert('masuk')}
                >
                    See more >>>
                </Text> */}
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#393e46'
    }
})