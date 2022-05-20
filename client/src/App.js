import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import RouteFC from "./components/routes/RouteFC";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ToastContainer />
      <BrowserRouter>
        <RouteFC />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
