import { gql } from 'apollo-boost'

export const GET_MOVIES = gql`
  query {
    movies {
      _id
      title
      poster_path
    }
  }
`
export const GET_SERIES = gql`
  query {
    series {
      _id
      title
      poster_path
    }
  }
`
export const GET_SERIE = gql`
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
export const GET_MOVIE = gql`
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

export const DELETE_SERI = gql`
mutation($id: String) {
    deleteSeries(_id: $id) {
        title
    }
}
`

export const DELETE_MOVIE = gql`
mutation($id: String) {
    deleteMovie(_id: $id) {
        title
    }
}
`

export const CREATE_MOVIE = gql`
mutation($title: String, $overview: String, $poster_path: String, $popularity: Int, $tags: [String]) {
  createMovie(title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags){
    _id
    title
    poster_path
    overview
    popularity
    tags
  }
}
`

export const CREATE_SERIE = gql`
mutation($title: String, $overview: String, $poster_path: String, $popularity: Int, $tags: [String]) {
  createSeries(title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags){
     _id
    title
    poster_path
    overview
    popularity
    tags
  }
}
`

export const UPDATE_MOVIE = gql`
mutation($id: String, $title: String, $overview: String, $poster_path: String, $popularity: Int, $tags: [String]) {
  updateMovie(_id: $id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags){
    _id
    title
  }
}
`

export const UPDATE_SERIE = gql`
mutation($id: String, $title: String, $overview: String, $poster_path: String, $popularity: Int, $tags: [String]) {
  updateSeries(_id: $id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags){
    _id
    title
  }
}
`
