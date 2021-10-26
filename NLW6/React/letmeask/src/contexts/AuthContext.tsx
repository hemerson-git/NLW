import {
  useContext,
  useState,
  ReactNode,
  createContext,
  useEffect,
} from "react";

import { firebase, auth } from "../services/firebase";

type UserProps = {
  name: string;
  id: string;
  avatar: string;
};

type AuthContextProps = {
  user: UserProps | undefined;
  signInWithGoogle: () => Promise<firebase.auth.UserCredential>;
  handleSetUser: (incomingUser: UserProps) => void;
};

const AuthContext = createContext({} as AuthContextProps);

type ChildrenProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<UserProps | undefined>();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { photoURL, uid, displayName } = user;

        const tempUser = {
          id: uid || "",
          avatar: photoURL || "",
          name: displayName || "",
        };

        handleSetUser(tempUser);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function handleSetUser(incomingUser: UserProps) {
    if (incomingUser) {
      const { name, avatar, id } = incomingUser;

      if (!name || !avatar) {
        throw new Error("Missing information from Google Account");
      }

      setUser({
        name,
        avatar,
        id,
      });
    }
  }

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      const tempUser = {
        id: uid || "",
        name: displayName || "",
        avatar: photoURL || "",
      };

      handleSetUser(tempUser);
    }

    return result;
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, handleSetUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
