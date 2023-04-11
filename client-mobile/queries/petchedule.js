import gql from "graphql-tag";

export const GET_PETSCHEDULE = gql`
  query FetchPetSchedule($petId: ID!) {
    fetchPetSchedule(PetId: $petId) {
      id
      complete
      details
      PetshopId
      DoctorScheduleId
      PetId
      Pet {
        id
        name
        imgUrl
        gender
        species
        breed
        description
        weight
        UserId
        User {
          id
          username
          fullName
          email
          imgUrl
          role
          phoneNumber
          address
        }
      }
      DoctorSchedule {
        id
        day
        time
        status
        PetshopId
        DoctorId
      }
      Petshop {
        id
        name
        logo
        address
        location {
          type
          coordinates
        }
        phoneNumber
        UserId
        PhoneNumber
      }
    }
  }
`;

export const POST_PET_SCHEDULE = gql`
  mutation Mutation($newSchedule: scheduleForm) {
    addPetSchedule(newSchedule: $newSchedule) {
      id
      complete
      details
      PetId
      DoctorScheduleId
      PetshopId
    }
  }
`;
