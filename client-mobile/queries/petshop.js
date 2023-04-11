import { gql } from "@apollo/client";

export const GET_ALL_PETSHOP = gql`
  query GetAllPetshops($serviceFilter: String, $nameFilter: String) {
    getAllPetshops(serviceFilter: $serviceFilter, nameFilter: $nameFilter) {
      id
      name
      logo
      address
      phoneNumber
      UserId
      location {
        coordinates
        type
      }
    }
  }
`;
