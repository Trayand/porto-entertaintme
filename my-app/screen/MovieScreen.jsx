import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'


import MiniCard from '../components/MiniCard'


const GET_MOVIES = gql`
  query {
    movies {
      _id
      title
      poster_path
    }
  }
`




export default function SerieScreen(props) {
    const { loading, error, data } = useQuery(GET_MOVIES)
    const [search, setSearch] = useState('')
    const [moviesData, setMoviesData] = useState([])

    const renderMovies = () => {
        if (loading) return <Text>Loading...</Text>
        else if (error) return <Text>Something went wrong</Text>
        else if (data.movies.length === 0) return <Text>Movie kosong</Text>
        else return (
            <FlatList
                numColumns={2}
                data={moviesData}
                renderItem={({ item }) => <MiniCard name="movie" data={item} />}
                keyExtractor={(item) => item._id}
            />
        )
    }

    useEffect(() => {
        if (data?.movies) console.log(data.movies);
        if (data?.movies) setMoviesData(data.movies)
    }, [data])

    return (
        <View style={{ paddingBottom: 40 }}>
            <Searchbar
                placeholder="Find Movies"
                onChangeText={query => { setSearch(query) }}
                value={search}
            />
            {renderMovies()}
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#393e46'
    }
})