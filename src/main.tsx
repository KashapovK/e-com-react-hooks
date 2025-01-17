import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import { StoreProvider } from "./store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
   <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>,
);
