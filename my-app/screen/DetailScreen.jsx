import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

export default function SerieScreen(props) {
    const GET_SERIE = gql`
    query {
        seri(_id: "${props.route.params.data._id}") {
            _id
            title
            poster_path
            overview
            popularity
            tags
        }
    }
    `
    const GET_MOVIE = gql`
    query {
        movie(_id: "${props.route.params.data._id}") {
            _id
            title
            poster_path
            overview
            popularity
            tags
        }
    }
    `
    const { loading, error, data } = useQuery(props.route.params.data.asal === 'movie' ? GET_MOVIE : GET_SERIE)

    useEffect(() => {
        props.navigation.setOptions({
            title: props.route.params.data.title,
            headerStyle: { height: 50, backgroundColor: '#190061' },
            headerTintColor: 'white',
            headerTitleStyle: { fontWeight: 'bold' },
        })
    }, [])

    const renderSerie = () => {
        // console.log(data, 'ini loh');
        if (loading) return <Text>Loading...</Text>
        else if (error) return <Text>Something went wrong</Text>
        else return (
            <View>
                <View style={{ flexDirection: 'row' }} >
                    <Image source={{
                        uri: props.route.params.data.poster_path
                    }}
                        style={{
                            width: 200,
                            height: 250,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            resizeMode: "contain"
                        }}
                    />
                    <View>
                        <Text style={{ color: 'white' }} >{data[props.route.params.data.asal].title}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                data[props.route.params.data.asal].tags.map((tag, i) => <Text key={i} style={{ color: 'white', marginHorizontal: 3 }} >{tag}</Text>)
                            }
                        </View>
                        <Text style={{ color: 'white' }} >{data[props.route.params.data.asal].popularity} &#9734;</Text>
                    </View>
                </View>
                <Text style={{ color: 'white' }} >{data[props.route.params.data.asal].overview}</Text>
                <Text style={{ color: 'white' }} >{data[props.route.params.data.asal].poster_path}</Text>
                {/* <Text style={{ color: 'white' }} >{JSON.stringify(data)}</Text> */}
            </View>
        )
    }

    return (
        <View style={{ padding: 10 }} >
            {/* <Image source={{
                uri: props.route.params.data.poster_path
            }}
                style={{
                    width: 200,
                    height: 250,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    resizeMode: "contain"
                }}
            /> */}
            {/* <Text style={styles.text}>{props.route.params.data.title}</Text> */}
            {/* <Text style={{ color: 'white' }}>{JSON.stringify(props.route.params.data)}</Text> */}
            {renderSerie()}
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 20
    }
})