import React from "react";
import Navigation from "./layout/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardRouter from "./router/BoardRouter";
import { ClerkProvider } from "@clerk/clerk-react";
import DashboardRouter from "./router/DashboardRouter";
import AuthRequired from "./components/AuthRequired";

export default function App() {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  return (
    <BrowserRouter>
      <ClerkProvider publishableKey={clerkPubKey}>
        <AuthRequired>
          <Navigation>
            <BoardRouter />
            <DashboardRouter />
          </Navigation>
        </AuthRequired>
      </ClerkProvider>
    </BrowserRouter>
  );
}
