import gql from "graphql-tag";

export const GET_PET = gql`
query FetchPet($fetchPetId: ID) {
  fetchPet(id: $fetchPetId) {
    User {
      username
      phoneNumber
      fullName
      email
      address
    }
    breed
    description
    gender
    imgUrl
    UserId
    name
    species
    weight
  }
}`