import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { AdminApp } from "./AdminApp";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

const ApolloApp = (App: React.FC) => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(ApolloApp(AdminApp), document.getElementById("root"));
