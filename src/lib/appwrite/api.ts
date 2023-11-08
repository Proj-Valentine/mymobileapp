//  after establishing and connecting to client, creating a function to perform an action
import { INewUser} from "@/types";
import { ID } from "appwrite";
import { account, appwriteConfig, databases } from "./config";

// in typescript types are enforced when defining functions , so INewUser is a variable that has its values as data:type key value pairs inside the 'type' folder in the index.ts file
//  So this funcion saves the Users Account and saves user information to the database
export async function createUserAccount(user: INewUser) {
    try{
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );
            if (!newAccount) throw Error;
            const avatarUrl= avatars.getInitials(user.name);

            // passing the new user account values ie NewAccount to the saveUserToDB function to be saved to the database
            const newUser = await saveUserToDB({
                accountId: newAccount.$Id,
                name: newAccount.name,
                email: newAccount.email,
                username: user.username,
                imageUrl: avatarUrl})

            // return newAccount; comment this out or delete, now we want to return a new user
            return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// this is a function to save a new User to database, the function takes the user object destructured to enforce types and optional attributes e.g username?
//  the function takes users info and saves it in the users collection, using the databaseid and the usercollection id, a unique key 9primary key0 and the user object..
//  by calling the createDocument method of the database client
export async function saveUserToDB(user: 
    {accountId: string;
    email:string; 
    name:string;
    imageUrl:URL;
    username?:string;}) {
        try{
            const newUser = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                ID.unique(),
                user
            )
            return newUser

        } catch (error) {
            console.log(error);
        }


}