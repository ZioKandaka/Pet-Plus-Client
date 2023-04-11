import gql from "graphql-tag";

export const GET_POSTS = gql`
query FetchPost($petshopId: ID!) {
  fetchPost(PetshopId: $petshopId) {
    title
    status
    news
    imageUrl
    id
    PetshopId
  }
}`

export const ADD_POST = gql`
mutation Mutation($title: String, $imageUrl: Upload, $news: String, $petshopId: ID) {
  addPost(title: $title, imageUrl: $imageUrl, news: $news, PetshopId: $petshopId) {
    title
    status
    news
    imageUrl
    id
    PetshopId
  }
}`

export const EDIT_POST = gql`
mutation Mutation($title: String, $imageUrl: Upload, $status: String, $news: String, $petshopId: ID, $postId: ID) {
  editPost(title: $title, imageUrl: $imageUrl, status: $status, news: $news, PetshopId: $petshopId, PostId: $postId) {
    message
  }
}
`