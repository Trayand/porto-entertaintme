import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { Portal, FAB } from 'react-native-paper';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const GET_SERIE = gql`
query($id: String) {
    seri(_id: $id) {
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
query($id: String) {
    movie(_id: $id) {
        _id
        title
        poster_path
        overview
        popularity
        tags
    }
}
`

export default function SerieScreen(props) {
    const [showOption, setShowOption] = useState(false)
    const [openIcon, setOpenIcon] = useState(false)
    const { loading, error, data } = useQuery(
        props.route.params.data.asal === 'movie' ? GET_MOVIE : GET_SERIE,
        { variables: { id: props.route.params.data._id } }
    )

    useEffect(() => {
        props.navigation.setOptions({
            title: props.route.params.data.title,
        })
    }, [])

    const renderSerie = () => {
        if (loading) return <Text>Loading...</Text>
        else if (error) return <Text>Something went wrong</Text>
        else return (
            <ScrollView>
                <StatusBar hidden={true} />
                <View style={{ flexDirection: 'row' }} >
                    <Image source={{
                        uri: props.route.params.data.poster_path
                    }}
                        style={{
                            width: 180,
                            height: 230,
                            resizeMode: "contain",
                            flex: 1,
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row' }} >
                    <Text style={{ color: 'white', fontSize: 27, marginTop: 15, flex: 5 }} >{data[props.route.params.data.asal].title}</Text>
                    <TouchableOpacity onPress={() => setShowOption(!showOption)} style={styles.btn} >
                        <Text style={{ fontSize: 8, color: 'white', textAlign: 'center' }} >{showOption ? "Hide Option" : "Show Option"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                    {
                        data[props.route.params.data.asal].tags.map((tag, i) => <Text key={i} style={styles.tags} >{tag}</Text>)
                    }
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }} >
                    <Text style={styles.overview} >OVERVIEW</Text>
                    <Text style={styles.popularity} >{data[props.route.params.data.asal].popularity} &#9734;</Text>
                </View>
                <Text style={{ color: 'white' }} >{data[props.route.params.data.asal].overview}</Text>

                <Portal >
                    <FAB.Group
                        visible={showOption}
                        open={openIcon}
                        icon={openIcon ? 'window-minimize' : 'library-plus'}
                        actions={[
                            { icon: 'star', label: 'Create', onPress: () => console.log('Pressed star') },
                            { icon: 'email', label: 'Edit', onPress: () => console.log('Pressed email') },
                            { icon: 'bell', label: 'Delete', onPress: () => console.log('Pressed notifications') },
                        ]}
                        onStateChange={() => setOpenIcon(!openIcon)}
                        onPress={() => {
                            if (openIcon) {
                                // do something if the speed dial is open
                                console.log('masuk');
                            }
                        }}
                    />
                </Portal>
            </ScrollView>
        )
    }

    return (
        <View style={{ padding: 10 }} >
            {renderSerie()}
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 20
    },
    tags: { color: 'white', marginHorizontal: 3, borderColor: 'white', borderWidth: 1, padding: 5, fontSize: 10 },
    overview: { color: 'white', textDecorationLine: 'underline', marginVertical: 10, fontSize: 20 },
    popularity: { color: 'white', textAlign: 'right', marginRight: 15, marginTop: 15, fontSize: 20 },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    btn: {
        borderWidth: 1,
        borderColor: 'white',
        color: 'white',
        flex: 1,
        margin: 12,
        marginTop: 17,
        borderRadius: 10,
        justifyContent: 'center'
    }
})