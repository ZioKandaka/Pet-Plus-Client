import gql from "graphql-tag";

export const CREATE_INVOICE = gql`
mutation GenerateInvoice($newInvoice: dataInvoice) {
  generateInvoice(newInvoice: $newInvoice) {
    invoice
  }
}`