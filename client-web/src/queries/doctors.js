import gql from "graphql-tag";

export const GET_DOCTORS = gql`
query FetchDoctor($petshopId: ID!) {
  fetchDoctor(PetshopId: $petshopId) {
    name
    imgUrl
    id
    gender
    education
    PetshopId
  }
}
`
export const GET_DOCTOR = gql`
query FetchOneDoctor($petshopId: ID!, $doctorId: ID!) {
  fetchOneDoctor(PetshopId: $petshopId, DoctorId: $doctorId) {
    name
    imgUrl
    id
    gender
    education
  }
}
`

export const ADD_DOCTOR = gql`
mutation AddDoctor($name: String, $imgUrl: Upload, $gender: String, $education: String, $petshopId: ID) {
  addDoctor(name: $name, imgUrl: $imgUrl, gender: $gender, education: $education, PetshopId: $petshopId) {
    id
    name
    imgUrl
    gender
    education
    PetshopId
  }
}`

export const EDIT_DOCTOR = gql`
mutation EditDoctor($name: String, $imgUrl: Upload, $gender: String, $education: String, $petshopId: ID, $doctorId: ID) {
  editDoctor(name: $name, imgUrl: $imgUrl, gender: $gender, education: $education, PetshopId: $petshopId, DoctorId: $doctorId) {
    message
  }
}`

