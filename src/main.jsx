import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ChatUI from "./ChatUI.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChatUI />
  </StrictMode>
);
