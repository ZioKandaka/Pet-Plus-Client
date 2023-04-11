import gql from "graphql-tag";

export const CREATE_RECORD = gql`
mutation PostRecord($newPost: Create) {
  postRecord(newPost: $newPost) {
    DoctorId
    PetScheduleId
    PetId
    PetshopId
    id
    notes
  }
}`