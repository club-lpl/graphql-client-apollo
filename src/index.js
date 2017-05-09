import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from "react-apollo";
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from "subscriptions-transport-ws";

const wsClient = new SubscriptionClient(`ws://localhost:8000/subscriptions`, {
  reconnect: true
});

const networkInterface = createNetworkInterface({
  uri: "http://localhost:8000/graphql"
});
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
});

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
