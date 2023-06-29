import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
export default function AuthRequired({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
