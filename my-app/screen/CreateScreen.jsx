import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, KeyboardAvoidingView, Alert } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button } from 'react-native-paper';
import TagInput from 'react-native-tags-input';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_MOVIE, CREATE_SERIE, GET_MOVIES, GET_SERIES } from '../GraphText'
import { useNavigation } from '@react-navigation/native';


export default function CreateScreen(props) {
    const navigation = useNavigation()
    const [createMovie] = useMutation(CREATE_MOVIE)
    const [createSeries] = useMutation(CREATE_SERIE)

    const [checked, setChecked] = useState('first')

    const [Title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [popularity, setPopularity] = useState('')
    const [overview, setOverview] = useState('')

    const [tagsColor, setTagsColor] = useState('#3ca897')
    const [tagsText, setTagsText] = useState('#3ca897')
    const [tags, setTags] = useState({
        tag: '',
        tagsArray: []
    })

    const updateTagState = (state) => {
        setTags(state)
    };


    const runSubmit = () => {
        if (!Title || !url || !popularity) {
            Alert.alert('semua form input harus diisi')
            return
        } else if (tags.tagsArray.length === 0) {
            Alert.alert('harus memiliki setidaknya satu teks')
            return
        } else if (overview.length < 20) {
            Alert.alert('Overview harus lebih dari 20 karakter')
            return
        }

        if (checked === 'first') {
            createMovie({
                variables: {
                    title: Title,
                    poster_path: url,
                    popularity: Number(popularity),
                    overview,
                    tags: tags.tagsArray
                },
                update: (cache, { data }) => {
                    const cacheData = cache.readQuery({ query: GET_MOVIES })
                    cache.writeQuery({
                        query: GET_MOVIES,
                        data: { movies: cacheData.movies.concat([data.createMovie]) }
                    })
                }
            })
                .then((result) => {
                    setTitle('')
                    setUrl('')
                    setPopularity('')
                    setOverview('')
                    setTags({
                        tag: '',
                        tagsArray: []
                    })
                    navigation.goBack()
                }).catch((err) => {
                    console.log(err)
                });
        } else {
            createSeries({
                variables: {
                    title: Title,
                    poster_path: url,
                    popularity: Number(popularity),
                    overview,
                    tags: tags.tagsArray
                },
                update: (cache, { data }) => {
                    const cacheData = cache.readQuery({ query: GET_SERIES })
                    cache.writeQuery({
                        query: GET_SERIES,
                        data: { series: cacheData.series.concat([data.createSeries]) }
                    })
                }
            })
                .then((result) => {
                    setTitle('')
                    setUrl('')
                    setPopularity('')
                    setOverview('')
                    setTags({
                        tag: '',
                        tagsArray: []
                    })
                    navigation.goBack()
                }).catch((err) => {
                    console.log(err)
                });
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15 }} >
                        <TouchableOpacity style={checked === 'first' ? styles.pressed : styles.TouchBtn}
                            onPress={() => setChecked('first')}
                        >
                            <Text style={{ color: 'white' }} >Movie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={checked === 'second' ? styles.pressed : styles.TouchBtn}
                            onPress={() => setChecked('second')}
                        >
                            <Text style={{ color: 'white' }} >TV Series</Text>
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        label='Title'
                        value={Title}
                        onChangeText={text => setTitle(text)}

                    />
                    <TextInput
                        label="Poster's URL"
                        value={url}
                        onChangeText={text => setUrl(text)}
                    />
                    <TextInput
                        label="Popularity"
                        value={popularity}
                        onChangeText={text => setPopularity(text)}
                        keyboardType="number-pad"
                    />

                    <TagInput
                        containerStyle={{ backgroundColor: 'white', marginTop: 30 }}
                        labelStyle={{ backgroundColor: 'red', color: 'blue' }}
                        updateState={updateTagState}
                        tags={tags}
                        placeholder="Tags..."
                        label='Press space to add a tag'
                        labelStyle={{ color: '#fff' }}
                        leftElementContainerStyle={{ marginLeft: 3 }}
                        containerStyle={{ width: (Dimensions.get('window').width - 40) }}
                        inputContainerStyle={[styles.textInput, { backgroundColor: tagsColor }]}
                        inputStyle={{ color: tagsText }}
                        onFocus={() => {
                            setTagsColor('#fff')
                            setTagsText('#3ca897')
                        }}
                        onBlur={() => {
                            setTagsColor('#3ca897')
                            setTagsText('#fff')
                        }}
                        autoCorrect={false}
                        tagStyle={styles.tag}
                        tagTextStyle={styles.tagText}
                        keysForTag={' '} />

                    <TextInput
                        label="Overview"
                        value={overview}
                        onChangeText={text => setOverview(text)}
                        multiline={true}
                        numberOfLines={10}
                    />
                    <Button icon="gnome" mode="contained" style={{ marginTop: 10, backgroundColor: 'white' }} onPress={() => runSubmit()}>
                        Submit
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    TouchBtn: {
        width: 150,
        height: 50,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 0.5,
        borderRadius: 10
    },
    pressed: {
        width: 150,
        height: 50,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1.5,
        borderRadius: 15
    },
    textInput: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 3,
    },
    tag: {
        backgroundColor: '#fff'
    },
    tagText: {
        color: '#3ca897'
    },
})
