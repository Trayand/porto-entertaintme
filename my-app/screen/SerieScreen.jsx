import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Portal, FAB, Searchbar } from 'react-native-paper';
import { useQuery } from '@apollo/react-hooks'
import { useNavigation } from '@react-navigation/native';
import { GET_SERIES } from '../GraphText'

import MiniCard from '../components/MiniCard'



export default function SerieScreen(props) {
    const navigation = useNavigation()
    const [showOption, setShowOption] = useState(true)
    const [openIcon, setOpenIcon] = useState(false)
    const { loading, error, data } = useQuery(GET_SERIES)
    const [search, setSearch] = useState('')

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setShowOption(false)
        });

        return unsubscribe;
    }, [navigation])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setShowOption(true)
        });

        return unsubscribe;
    }, [navigation])

    const renderSeries = () => {
        if (loading) return <Text>Loading...</Text>
        else if (error) return <Text>Something went wrong</Text>
        else if (data.series.length === 0) return <Text>Serie kosong</Text>
        else return (
            <FlatList
                numColumns={2}
                data={filter(data.series, search)}
                renderItem={({ item }) => <MiniCard name="seri" data={item} />}
                keyExtractor={(item) => item._id}
            />
        )
    }


    return (
        <View style={{ paddingBottom: 40 }}>
            <Searchbar
                placeholder="Find Series"
                onChangeText={query => { setSearch(query) }}
                value={search}
            />
            {renderSeries()}
            {
                props.route.name === "TV Series"
                && <Portal>
                    <FAB.Group
                        visible={showOption}
                        // style={{ backgroundColor: 'yellow', height: 50, width: 50, position: 'absolute', bottom: 50, right: 0 }}
                        open={openIcon}
                        icon={openIcon ? 'window-minimize' : 'plus'}
                        actions={[
                            { icon: 'plus-box', label: 'Create', onPress: () => navigation.push('Create') },
                        ]}
                        onStateChange={() => setOpenIcon(!openIcon)}
                    />
                </Portal>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#393e46'
    }
})
const filter = (series, keyword) => {
    return series.filter(seri => seri.title.toLowerCase().includes(keyword.toLowerCase()))
}