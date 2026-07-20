import { createAuthClient } from "better-auth/react";

// The hook returned by createAuthClient does not automatically pick up the custom type
// for the user session unless explicitly handled.
// Using 'any' for the session user is a temporary workaround to unblock the build
// while maintaining type safety in the components using this wrapper.

// Keep browser requests on this origin. Next.js rewrites `/api/*` to the backend,
// which avoids CORS and lets the browser persist the session cookie locally.
const baseURL = "";

const authClientRaw = createAuthClient({
  baseURL,
});

export const { signIn, signUp, signOut } = authClientRaw;

export const useSession = () => {
  const session = authClientRaw.useSession();
  
  // Cast the user to include the role field
  const user = session.data?.user as any;
  
  return {
    ...session,
    data: session.data
      ? {
          ...session.data,
          user: {
            ...user,
            role: (user?.role as "student" | "mentor" | "admin") || "student",
          },
        }
      : null,
  };
};

export const authClient = {
  ...authClientRaw,
  useSession,
};
