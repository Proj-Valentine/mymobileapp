
// import utilities from react to create context
import { createContext, useContext, useEffect, useState } from "react";
import {IContextType, IUser} from "@/types";
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
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

// authProvider receives children as param and declares their type as react.Node {children}: {children: React.ReactNode}

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<IUser>(INITIAL_STATE);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuthUser = async () => {
        try{
          const currentAccount = await getCurrentUser();

          if(currentAccount) {
              setUser({
                  id: currentAccount.$id,
                  name: currentAccount.name,
                  username: currentAccount.username,
                  email: currentAccount.email,
                  imageUrl: currentAccount.imageUrl,
                  bio: currentAccount.bio
              })

              setIsAuthenticated(true);

              return true;
          }
          
          return false

    // In a more cleaner way we can destructure the code above as this
        //   const { $id, name, username, email, imageUrl, bio } = await getCurrentUser();

        //   if($id) {
        //       setUser({id: $id, name, username, email, imageUrl, bio })
        //   }

        } catch(error){
            console.log(error);
            return false;
        }
        finally {
            setIsLoading(false);
        }
    };

    const value = {
        user,
        setUser,
        isLoading,
        setIsLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }
    

  return 
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>;
}

export default AuthContext