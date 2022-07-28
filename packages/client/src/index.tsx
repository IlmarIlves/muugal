import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./i18n";
import { App } from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const client = new ApolloClient({
  // uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  // credentials: "include",
  link: createUploadLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  }),
});

const ApolloApp = (App: React.FC) => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(ApolloApp(App), document.getElementById("root"));
