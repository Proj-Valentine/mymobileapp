import {
    useQuery, 
    useMutation, 
    useQueryClient, 
    useInfiniteQuery} from '@tanstack/react-query';

import { createPost, createUserAccount, getRecentPosts, signInAccount, signOutAccount } from "@/lib/appwrite/api";
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