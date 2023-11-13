//  after establishing and connecting to client, creating a function to perform an action
import { INewPost, INewUser, IUpdatePost} from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

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
            // Note $Id is used to retrieve the value from appwrite, its an appwrite syntax
            const newUser = await saveUserToDB({
                accountId: newAccount.$id,
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

export async function signInAccount(user: {email: string; password: string;}){
    try{
        // createEmailSession is a utility method in appwrite
        const session = await account.createEmailSession(user.email, user.password)
        return session
    }catch(error) 
    {console.log(error)}
}

// GET ACCOUNT

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

// get current user ifo to use in the context creation
export async function getCurrentUser() {


    try{
        const currentAccount = await getAccount();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            // we pass what we are trying to fetch using a query, to get the currentAccount ID
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0];

    }catch(error){
        console.log(error);
        return null;
    }
}

export async function signOutAccount(){
    try{
        const session = await account.deleteSession("current");

        return session;

    }
    catch(error) {
        console.log(error)
    }
}

// created the four functions below to create a post and save to Database

export async function createPost( post: INewPost) {
    try{
        // upload image to storage
        const  uploadedFile = await uploadFile(post.file[0]);

        if(!uploadedFile) throw Error;

        const fileUrl= getFilePreview(uploadedFile.$id);

        // if file url is corrupted delete it
        if (!fileUrl) {
            deleteFile(uploadedFile.$id)
            throw Error;
        }

        // convert tags to an array

        const tags = post.tags?.replace(/ /g,'').split(',') || []

        //save post to Database
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId, 
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags
            }
        )

        if (!newPost) {
            await deleteFile(uploadedFile.$id)
            throw Error;
            }

        return newPost

    } catch (error) {
        console.log(error)
    }
}
export async function uploadFile(file: File) {
    try{
        // to save media
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        );

        return uploadedFile

    } catch (error) {
        console.log(error)
    }
    
}

// preview file to see width 2000 , height 2000 , gravity ie where its going to show "top", and Quality 100
// removing async function because only a promise is returned wihcih makes the imageUrl get a value of an empty list
export function getFilePreview (fileId: string) {
    try{
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            "top",
            100,
        )

        return fileUrl

    } catch (error) {
        console.log(error)
    }
    
}

export async function deleteFile(fileId: string) {
    try{
        await storage.deleteFile(appwriteConfig.storageId, fileId);

        return { status: 'ok'}

    } catch (error) {
        console.log(error)
    }
    
}

// QUERY DATABASE TO SHOW TOP 20 POST
export async function getRecentPosts() {
    try{
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(20)]
        )

        if(!posts) throw Error;

        return posts;

    } catch(error){
        console.log(error)
    }
}

// GET LIKED POST
// get id of users who likes your post
export async function likePost(postId: string, likesArray: string[]) {
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
            {
                likes: likesArray
            }
        )

        if(!updatedPost) throw Error;

        return updatedPost;

    } catch (error) {
        console.log(error)
    }
    
}

// SAVE POST

export async function savePost(postId: string, userId: string) {
    try {
        const updatedPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                user: userId,
                post: postId
            }
        )

        if(!updatedPost) throw Error;

        return updatedPost;

    } catch (error) {
        console.log(error)
    }
    
}

//DELETE SAVE POST FROM DB

export async function deleteSavedPost(saveRecordId: string) {
    try {

        // deleteDocument returns a statuscode
        const statusCode = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            saveRecordId,

        )

        if(!statusCode) throw Error;

        return {status: "ok"};

    } catch (error) {
        console.log(error)
    }
    
}

// FETCH OLD POST usig post id..
// after fteching create a mutation using react QEURY

export async function getPostById ( postId: string) {
    try{
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        )

        return post

    } catch (error) {
        console.log(error)
    }

}

//UPDATE POST

export async function updatePost( post: IUpdatePost) {
    // check if usr has file to update
    const hasFileToUpdate = post.file.length > 0;
    try {

        let image = {
          imageUrl: post.imageUrl,
          imageId: post.imageId
        }

        if (hasFileToUpdate) {
              // upload image to storage
            const uploadedFile = await uploadFile(post.file[0]);
            if(!uploadedFile) throw Error;
            // GET FILE
             const fileUrl= getFilePreview(uploadedFile.$id);

        // if file url is corrupted delete it
            if (!fileUrl) {
                deleteFile(uploadedFile.$id)
                throw Error;
            }
            image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id}
        }
    
        // convert tags to an array

        const tags = post.tags?.replace(/ /g,'').split(',') || []

        //save post to Database
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId, 
            appwriteConfig.postCollectionId,
            post.postId,
            {
            //    define whats to Update in post
                caption: post.caption,
                imageUrl: image.imageUrl,
                imageId: image.imageId,
                location: post.location,
                tags: tags
            }
        )

        if (!updatedPost) {
            await deleteFile(post.imageId)
            throw Error;
            }

        return updatedPost

    } catch (error) {
        console.log(error)
    }
}

export async function deletePost(postId: string, imageId: string) {
    if (!postId || !imageId) throw Error;

    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        )

        return {status: 'ok'}

    } catch (error) {
        console.log(error)
    }

}

// gET INFINITE POST
export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(10)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

// SEARCH POST
export async function searchPosts(searchTerm: string) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search("caption", searchTerm)]
    );

    if (!posts) throw Error;


    return posts;
  } catch (error) {
    console.log(error);
  }
}
