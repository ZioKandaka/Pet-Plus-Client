
import gql from "graphql-tag";

export const GET_SERVICE = gql`
  query FetchService($petshopId: ID!) {
    fetchService(PetshopId: $petshopId) {
      id
      name
      minPrice
      maxPrice
      serviceLogo
      PetshopId
    }
  }
`;


