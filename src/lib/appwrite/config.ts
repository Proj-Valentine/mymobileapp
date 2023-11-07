import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

// initiatialize appwrite functionalities

export const appwriteConfig = {
    // INSTEAD of using actual project ID opied from appwrite project dir, use ENV variable
    // projectID: '476866068werreac5629', 
    // note typescript does not support the .env syntax so add a new file vite-env.d.ts in the src root dir
    projectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_URL,

}
// initializing 
//  note pass the client param inside the other 4 services for typescript to not throw a warning
// export const client = new Client();
// export const account = new Account(client);
// export const databases = new  Databases (client);
// export const storage = new Storage(client);
// export const avatars = new Avatars(client);

//  add configuration

export const client = new Client();
client.setProject(appwriteConfig.projectID)
client.setEndpoint(appwriteConfig.url)
export const account = new Account(client);
export const databases = new  Databases (client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);