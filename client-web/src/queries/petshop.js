import { gql } from "@apollo/client";


export const GET_PETSHOP = gql`
query GetShopById($userId: Int) {
  getShopById(UserId: $userId) {
    phoneNumber
    name
    logo
    location {
      type
      coordinates
    }
    address
    UserId
    id
  }
}`