import React from "react";
import Navigation from "./layout/Navigation";
import { BrowserRouter } from "react-router-dom";
import BoardRouter from "./router/BoardRouter";
import { ClerkProvider } from "@clerk/clerk-react";

export default function App() {  
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  return (
    <BrowserRouter>
      <ClerkProvider publishableKey={clerkPubKey}>
        <Navigation>
          <BoardRouter/>
        </Navigation>
      </ClerkProvider>
    </BrowserRouter>
  );
}