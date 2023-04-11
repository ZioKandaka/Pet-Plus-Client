import gql from "graphql-tag";

export const GET_SERVICES = gql`
query FetchService($petshopId: ID!) {
  fetchService(PetshopId: $petshopId) {
    serviceLogo
    minPrice
    name
    maxPrice
    PetshopId
    id
  }
}
`

export const POST_SERVICE = gql`
mutation AddService($serviceLogo: Upload, $name: String, $minPrice: Int, $maxPrice: Int, $petshopId: ID) {
  addService(serviceLogo: $serviceLogo, name: $name, minPrice: $minPrice, maxPrice: $maxPrice, PetshopId: $petshopId) {
    serviceLogo
    name
    minPrice
    maxPrice
    id
    PetshopId
  }
}
`