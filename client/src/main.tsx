import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Toaster } from "react-hot-toast";
import { SelectedUserProvider } from "./context/SelectedUserContext.tsx";
import { SocketContextProvider } from "./context/SocketContext.tsx";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <BrowserRouter>
      <SelectedUserProvider>
        <AuthProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
          <Toaster />
        </AuthProvider>
      </SelectedUserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
