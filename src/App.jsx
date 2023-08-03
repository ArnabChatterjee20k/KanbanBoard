import React from "react";
import Navigation from "./layout/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardRouter from "./router/BoardRouter";
import { ClerkProvider } from "@clerk/clerk-react";
import DashboardRouter from "./router/DashboardRouter";
import AuthRequired from "./components/AuthRequired";
import { ErrorBoundary } from "react-error-boundary";
export default function App() {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
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
    </ErrorBoundary>
  );
}

function fallbackRender({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <pre style={{ color: "red" }}>{error.stack}</pre>
    </div>
  );
}
