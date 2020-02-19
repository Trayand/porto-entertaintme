import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button } from 'react-native-paper';
import TagInput from 'react-native-tags-input';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_MOVIE, UPDATE_SERIE, GET_MOVIES, GET_MOVIE, GET_SERIES } from '../GraphText'
import { useNavigation } from '@react-navigation/native';


export default function CreateScreen(props) {
    const navigation = useNavigation()
    const [updateMovie, { loading: movieLoad }] = useMutation(UPDATE_MOVIE)
    const [updateSeries, { loading: seriLoad }] = useMutation(UPDATE_SERIE)


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
    // console.log(props.route.params);
    useEffect(() => {
        let dataku = props.route.params
        setTitle(dataku.title)
        setUrl(dataku.poster_path)
        setOverview(dataku.overview)
        setPopularity(dataku.popularity.toString())
        setTags({
            tag: '',
            tagsArray: dataku.tags
        })
    }, [])


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

        if (props.route.params.asal === 'movie') {
            updateMovie({
                variables: {
                    id: props.route.params._id,
                    title: Title,
                    poster_path: url,
                    popularity: Number(popularity),
                    overview,
                    tags: tags.tagsArray
                },
                refetchQueries: [
                    { query: GET_MOVIE, variables: { id: props.route.params._id } }
                ]
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
                    Alert.alert(err)
                    // console.log(err)
                });
        } else {
            updateSeries({
                variables: {
                    id: props.route.params._id,
                    title: Title,
                    poster_path: url,
                    popularity: Number(popularity),
                    overview,
                    tags: tags.tagsArray
                }, refetchQueries: [{ query: GET_SERIES }]
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
                    Alert.alert(err)
                    // console.log(err)
                });
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {
                    (movieLoad || seriLoad)
                    && <View style={styles.screenUp}>
                        <Image style={{ width: 200, height: 200 }} source={loadingGif} fadeDuration={0} />
                        {/* <ActivityIndicator size={100} color="#0000ff" /> */}
                    </View>
                }
                <View>

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
    screenUp: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(56,56,56,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20,
        zIndex: 10
    }
})
