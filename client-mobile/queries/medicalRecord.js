import gql from "graphql-tag";

export const GET_RECORDS = gql`
  
  query GetRecord($petId: ID!) {
  getRecord(PetId: $petId) {
    id
    notes
    PetId
    DoctorId
    PetScheduleId
    PetshopId
    Actions {
      id
      document
      totalPrice
      MedicalRecordId
      ServiceId
      Service {
        id
        name
        minPrice
        maxPrice
        serviceLogo
        PetshopId
      }
    }
    Doctor {
      id
      name
      imgUrl
      gender
      education
      PetshopId
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
    PetSchedule {
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
    createdAt
  }
}
`;


