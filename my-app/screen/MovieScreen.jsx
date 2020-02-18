import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, Dimensions } from 'react-native';
import { Portal, FAB, Searchbar } from 'react-native-paper';
import { useQuery } from '@apollo/react-hooks'
import { useNavigation } from '@react-navigation/native';
import { GET_MOVIES } from '../GraphText'


import MiniCard from '../components/MiniCard'




export default function SerieScreen(props) {
    const navigation = useNavigation()
    const [showOption, setShowOption] = useState(true)
    const [openIcon, setOpenIcon] = useState(false)
    const { loading, error, data } = useQuery(GET_MOVIES)
    const [search, setSearch] = useState('')

    const renderMovies = () => {
        if (loading) return <Text>Loading...</Text>
        else if (error) return <Text>Something went wrong</Text>
        else if (data.movies.length === 0) return <Text>Movie kosong</Text>
        else return (
            <FlatList
                numColumns={2}
                data={filter(data.movies, search)}
                renderItem={({ item }) => <MiniCard name="movie" data={item} />}
                keyExtractor={(item) => item._id}
            />
        )
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setShowOption(false)
            console.log('masukk blurr');
        });

        return unsubscribe;
    }, [navigation])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setShowOption(true)
        });

        return unsubscribe;
    }, [navigation])

    return (
        <View style={{
            paddingBottom: 40,
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width
        }}>
            <Searchbar
                placeholder="Find Movies"
                onChangeText={query => { setSearch(query) }}
                value={search}
            />
            {renderMovies()}

            <Portal>
                <FAB.Group
                    visible={showOption}
                    open={openIcon}
                    icon={openIcon ? 'window-minimize' : 'plus'}
                    actions={[
                        { icon: 'plus-box', label: 'Create', onPress: () => navigation.push('Create') },
                    ]}
                    onStateChange={() => setOpenIcon(!openIcon)}
                />
            </Portal>

        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#393e46'
    }
})

const filter = (movies, keyword) => {
    return movies.filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()))
}