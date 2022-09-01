import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import Layout from "../components/Layout/Layout";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import store from "../feature/store";
import "../styles/globals.css";

//USING THEME IN STYLED COMPONENTS
const theme = {
  colors: {
    header: "#820000",
  },
};

//PERSITOR TO WRAP USING IT
let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    <section>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout />
            <Component {...pageProps} />
          </PersistGate>
        </ThemeProvider>
      </Provider>
    </section>
  );
}

export default MyApp;
