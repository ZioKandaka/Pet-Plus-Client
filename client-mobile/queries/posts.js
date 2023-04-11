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
  }
`;
