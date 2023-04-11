import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { createUploadLink } from "apollo-upload-client";

// // let url = "http://localhost:4000/graphql"
const client = new ApolloClient({
  uri: "https://3466-139-228-111-126.ap.ngrok.io/graphql",
  cache: new InMemoryCache(),
  // link: createUploadLink({
  //   uri: "https://7bb4-139-228-111-126.ap.ngrok.io/graphql",
  // }),
});

export default client;

// import { ApolloClient, InMemoryCache } from "@apollo/client";
// // const { createUploadLink } = require('apollo-upload-client')
// let url = "https://6338-103-177-96-40.ap.ngrok.io/graphql"

// // let url = "http://localhost:4000/graphql"
// const client = new ApolloClient({
//   uri: "https://7bb4-139-228-111-126.ap.ngrok.io/graphql",
//   cache: new InMemoryCache(),
//   link: createUploadLink({
//     uri: "https://7bb4-139-228-111-126.ap.ngrok.io/graphql",
//   }),
// });

// export default client;

// // // import { ApolloClient, InMemoryCache } from "@apollo/client";
// // // const { createUploadLink } = require('apollo-upload-client')
// let url = "https://7bb4-139-228-111-126.ap.ngrok.io/graphql";
// // let url = "http://localhost:4000/graphql"
// const client = new ApolloClient({
//   uri: url,
//   cache: new InMemoryCache(),
//   // link: createUploadLink()
// });

// export default client;
