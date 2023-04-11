import gql from "graphql-tag";

export const GET_ONESHOP = gql`
  query GetShopById($userId: Int) {
  getShopById(UserId: $userId) {
    id
    name
    logo
    address
    phoneNumber
    UserId
    Doctors {
      id
      name
      imgUrl
      gender
      education
      PetshopId
    }
    Services {
      id
      name
      minPrice
      maxPrice
      serviceLogo
      PetshopId
    }
    Posts {
      id
      title
      news
      status
      imageUrl
      PetshopId
    }
    location {
      type
      coordinates
    }
  }
}
`;


