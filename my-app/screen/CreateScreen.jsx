import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import TagInput from 'react-native-tags-input';

export default function CreateScreen(props) {
    const [checked, setChecked] = useState('first')
    const [tags, setTags] = useState({
        tag: '',
        tagsArray: []
    })

    const updateTagState = (state) => {
        setTags(state)
        console.log(state);
    };


    return (
        <ScrollView>
            <View style={{ backgroundColor: 'pink', height: 600 }} >
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
                <TagInput
                    containerStyle={{ backgroundColor: 'white' }}
                    labelStyle={{ backgroundColor: 'red' }}
                    updateState={updateTagState}
                    tags={tags}
                />
            </View>
        </ScrollView>
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
    }
})
