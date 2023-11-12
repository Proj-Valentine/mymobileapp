import {
    useQuery, 
    useMutation, 
    useQueryClient, 
    useInfiniteQuery} from '@tanstack/react-query';

import { createPost, createUserAccount, deleteSavedPost, getCurrentUser, getPostById, getRecentPosts, likePost, savePost, signInAccount, signOutAccount } from "@/lib/appwrite/api";
import { INewPost, INewUser } from '@/types';
import { QUERY_KEYS } from './queryKeys';
// useQuery are for fetching data
// use mutations for modifying data
// to simplify data fetching and mutation

// export first mutation
// mutation mutates a function, in this case the useCreateUserAccountMutation, mutates the createUserAccount

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

// signin into account
export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {email: string, password: string}) => signInAccount(user)
    })
}

// import signOutAccount as a self calling function

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}

export const useCreatePost = () => {
    // since we  wanna  query existing post and show them online 

    const queryClient = useQueryClient();



    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            // after we create a new post we invalidate the query fro the recent post
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })

        }
})
}

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey:[QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts,
    })

}


export const useLikePost = () => {
    // since we  wanna  query existing post and show them online 
    // EVERY POST WE FETCH  using react query the useGetRecentPosts IS CACHED which implies that on subsequent reload when page refreshes it will be faster to fetch
    // implementing functionality so that when a post is LIKED on reload we will not return the cached old value but UPDATE the like 
        // =. that invalidtae current values

        // TO COUNT LIKES

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({postId,likesArray}: {postId: string; likesArray: string[]}) => likePost(postId,likesArray),
        onSuccess: (data) => {
            // update the Post itself
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_POST_BY_ID, data?.$id]})
            // update other related
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_RECENT_POSTS]})
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_POSTS]})
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_CURRENT_USER]})
            
        },
    } )

}

export const useSavePost = () => {
 

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({postId, userId}: {postId: string; userId: string}) => savePost(postId,userId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_RECENT_POSTS]})
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_POSTS]})
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_CURRENT_USER]})
            
        },
    } )

}

export const useDeleteSavedPost = () => {
 

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_RECENT_POSTS]})
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_POSTS]})
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_CURRENT_USER]})
            
        },
    } )

}


export const useGetCurrentUser = () => {
    return useQuery({
       queryKey: [QUERY_KEYS.GET_CURRENT_USER],
       queryFn: getCurrentUser 
    })
}

export const useGetPostById = (postId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID,postId],
        queryFn:() => getPostById(postId), 
        // enabled data fetch only when fetching data for another ID
        enabled:  !!postId
    })
}