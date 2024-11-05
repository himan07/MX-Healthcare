import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from '@clerk/clerk-react'
import App from "./App.jsx";
import "./assets/css/main.css";

// const clerkFrontendApi = `https://select-swift-42.clerk.accounts.dev`;
// const clerkPublishableKey = `pk_test_c2VsZWN0LXN3aWZ0LTQyLmNsZXJrLmFjY291bnRzLmRldiQ`;
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const FRONTEND_API_KEY  = import.meta.env.REACT_APP_CLERK_FRONTEND_API


if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} FRONTEND_API_KEY={FRONTEND_API_KEY} afterSignOutUrl="/"> */}
      <App />
    {/* </ClerkProvider> */}
  </StrictMode>
);
