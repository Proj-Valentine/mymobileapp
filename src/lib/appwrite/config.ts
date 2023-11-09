import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

// initiatialize appwrite functionalities

export const appwriteConfig = {
    // INSTEAD of using actual project ID opied from appwrite project dir, use ENV variable
    // projectID: '476866068werreac5629', 
    // note typescript does not support the .env syntax so add a new file vite-env.d.ts in the src root dir
    projectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_URL,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    userCollectionId:import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    postCollectionId:import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    savesCollectionId:import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID

}
// initializing client and client utilities (ie what we services we from the client)
//  note pass the client param inside the other 4 services for typescript to not throw a warning
// export const client = new Client();
// export const account = new Account(client);
// export const databases = new  Databases (client);
// export const storage = new Storage(client);
// export const avatars = new Avatars(client);

//  add configuration to client using project ID and API endpoint

export const client = new Client();
client.setEndpoint(appwriteConfig.url)
client.setProject(appwriteConfig.projectID)
export const account = new Account(client);
export const databases = new  Databases (client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);