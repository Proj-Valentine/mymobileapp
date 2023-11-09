
// import utilities from react to create context
import { useNavigate } from 'react-router-dom';
import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";


// defining an empty user
export const INITIAL_USER = {
    id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

// define intial state
const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading:false,
    isAuthenticated: false,
    setUser:() => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
};

type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

// authProvider receives children as param and declares their type as react.Node {children}: {children: React.ReactNode}

export function AuthProvider ({children}: {children: React.ReactNode}) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });

        setIsAuthenticated(true);

        return true;
      }

      return false;

      // In a more cleaner way we can destructure the code above as this
      //   const { $id, name, username, email, imageUrl, bio } = await getCurrentUser();

      //   if($id) {
      //       setUser({id: $id, name, username, email, imageUrl, bio })
      //   }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // we need to call the checkAuthUser whenever we reload the page so we useEffect// to navigate the user back to the screen
//   useEffect(() => {
//     //   localStorage.getItem("cookieFallback") === null
//     if (
//       localStorage.getItem("cookieFallback") === "[]"
//     ) {navigate("/sign-in")
    
//   } checkAuthUser()}, []);


  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]"
    //   cookieFallback === null ||
    //   cookieFallback === undefined
    ) {
      navigate("/sign-in");
    }

    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return;
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
}

export default AuthProvider;

// export to make it simple to use our context everytime

export const useUserContext = () => useContext(AuthContext)
