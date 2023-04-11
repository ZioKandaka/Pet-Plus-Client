import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
        uri: 'http://localhost:4000/graphql',
    })
});

export default client;