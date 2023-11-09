import {useQuery, useMutation, useQueryClient, useInfiniteQuery} from '@tanstack/react-query';
import { createUserAccount, signInAccount } from '../appwrite/api';
import { INewUser } from '@/types';
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