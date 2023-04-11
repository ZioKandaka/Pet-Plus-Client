import gql from "graphql-tag";

export const GET_SCHEDULES = gql`
query FetchPetScheduleForPetshop($petshopId: ID!) {
  fetchPetScheduleForPetshop(PetshopId: $petshopId) {
    id
    details
    complete
    Pet {
      name
      species
      id
      User {
        email
        fullName
        id
      }
    }
    DoctorSchedule {
      time
      status
      day
      DoctorId
    }
  }
}`

export const GET_DOCTOR_SCHEDULE = gql`
query FetchOneDoctor($doctorId: ID!, $petshopId: ID!) {
  getDocSched(DoctorId: $doctorId, PetshopId: $petshopId) {
    time
    status
    day
    id
  }
}`