import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
// import { setContext } from "redux-saga/effects";
import { setContext } from '@apollo/client/link/context';

 const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_HASURA_API_URL,
  });
  
  const authLink = setContext((_, { headers }: { headers?: Record<string, string> }) => ({
    headers: {
      ...headers,
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET, // Replace with your admin secret or JWT token
    },
  }));
  
const client = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache(),
  }); 

  export default client;