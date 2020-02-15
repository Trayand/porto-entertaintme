import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

import MiniCard from '../components/MiniCard'

const GET_SERIES = gql`
  query {
    series {
      _id
      title
      poster_path
    }
  }
`



export default function SerieScreen(props) {
    const { loading, error, data } = useQuery(GET_SERIES)
    const [search, setSearch] = useState('')

    const renderSeries = () => {
        if (loading) return <Text>Loading...</Text>
        else if (error) return <Text>Something went wrong</Text>
        else if (data.series.length === 0) return <Text>Serie kosong</Text>
        else return (
            <FlatList
                numColumns={2}
                data={data.series}
                renderItem={({ item }) => <MiniCard name="seri" data={item} />}
                keyExtractor={(item) => item._id}
            />
        )
    }

    return (
        <View>
            <Searchbar
                placeholder="Find Series"
                onChangeText={query => { setSearch(query) }}
                value={search}
            />
            {renderSeries()}
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#393e46'
    }
})