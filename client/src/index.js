import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./context/Context";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <ContextProvider>
            <App />
        </ContextProvider>
    </React.StrictMode>
);

reportWebVitals();
