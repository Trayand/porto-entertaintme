import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button } from 'react-native-paper';
import TagInput from 'react-native-tags-input';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_MOVIE, CREATE_SERIE } from '../GraphText'

export default function CreateScreen(props) {
    const [createMovie] = useMutation(CREATE_MOVIE)
    const [createSeries] = useMutation(CREATE_SERIE)

    const [checked, setChecked] = useState('first')

    const [Title, setTitle] = useState('coba')
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
        console.log(state);
    };


    const runSubmit = () => {
        console.log('coba masuk');
        TextInput.clear()
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled >
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
                        label='Press comma & space to add a tag'
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
                    <Button icon="gnome" mode="contained" style={{ marginTop: 10, backgroundColor: 'white' }} onPress={() => runSubmit}>
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
