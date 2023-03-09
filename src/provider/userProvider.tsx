import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Manga } from '../types/manga';
import { CurrentUser } from '../types/user';
import { auth, db } from '../utils/firebaseUtils';

interface Props {
  children: React.ReactNode;
}

type Context = {
  currentUser?: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | undefined>>
}

export const UserContext = createContext<Context>({ currentUser: undefined, setCurrentUser: () => null });

export const UserProvider = ({ children }: Props): JSX.Element => {
  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(undefined);

  useEffect(() => {
    if (user) {
      const transactionsRef = doc(db, `users/${user?.uid}`);
      const docSnap = getDoc(transactionsRef);
      docSnap.then((value) => {
        const docUser = value.data() as CurrentUser;
        const mangaRef = collection(db, `users/${user?.uid}/mangas`);
        const q = query(mangaRef);
        onSnapshot(
          q,
          (snapShot) => {
            let list: Manga[] = [];
            snapShot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() } as Manga);
            });
            setCurrentUser({
              ...docUser,
              mangas: list
            });
          },
          (error) => {
            console.log(error);
          }
        );
      });
    }
  }, [user, auth])

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}
