import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  userID: string;
  setUserID: (id: string) => void;
}

const UserContext = createContext<UserContextType>({
  userID: 'Guest',
  setUserID: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userID, setUserID] = useState('Guest');
  return <UserContext.Provider value={{ userID, setUserID }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);