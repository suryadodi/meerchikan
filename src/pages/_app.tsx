import type { AppProps } from "next/app";
import "../assets/scss/main.scss";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";
import { Provider } from "react-redux";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { persistor, store } from "@/services/store";
import client from "@/apolloClient";
import AuthListener from "@/auth-provider";
import { PersistGate } from "redux-persist/integration/react";
import '../assets/scss/pages/global.scss';




export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <AuthListener>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </AuthListener>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
