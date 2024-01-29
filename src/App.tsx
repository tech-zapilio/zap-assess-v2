import { ThemeProvider } from "@mui/material/styles";
import theme from "./Assets/Theme/theme";
import { AppRoutes } from "./Routes/Routes";
import { persistor, store } from "./Store";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

if (typeof window !== "undefined") {
  injectStyle();
}

const client_id =
  "808094837942-9k3dm4cctpma0vk5dnmklnqvo94q0n9c.apps.googleusercontent.com";

function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={client_id}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            <AppRoutes />
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </ThemeProvider>
        </PersistGate>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
