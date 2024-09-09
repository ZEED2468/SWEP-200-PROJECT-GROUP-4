import React from "react";
import App from "./App";
import { ApolloClient, InMemoryCache } from "@apollo/client"; // use the updated Apollo Client
import { createHttpLink } from "@apollo/client"; // for HTTP linking
import { ApolloProvider } from "@apollo/client/react"; // updated Apollo provider
import { setContext } from "@apollo/client/link/context"; // for auth
import { AuthContextProvider } from "./context/AuthContext";

// Define the HTTP link for GraphQL API
const httpLink = createHttpLink({
  uri:
    process.env.REACT_APP_BASE_URL ??
    (!process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : ""), // replace with your production URL
});

// Set up the authentication link
const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Apollo Client setup
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine auth and HTTP links
  cache: new InMemoryCache(), // InMemoryCache is used to cache query results
});

// Export the ApolloProvider wrapping the App component
export default function ApolloProviderWrapper() {
  return (
    <AuthContextProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AuthContextProvider>
  );
}
