import { createContext, ReactNode } from "react";

interface UserProps {
  name: string;
  avatarUrl: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  async function signIn() {
    alert("Trying to sign in...");
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: {
          name: "Hemerson",
          avatarUrl: "https://github.com/hemerson-dev.png",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
