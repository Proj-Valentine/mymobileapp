// import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from 'react-router-dom';
// importing toaster hook
import { useToast } from "@/components/ui/use-toast";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SignupValidation} from "@/lib/validation";
import { z } from 'zod';
import Loader from "@/components/shared/Loader";
//  because we imported the mutation function, that mutate the createUserAccount function from appwrite api, we dont need to use it directly, we can use the mutated function
// to which will call the function quickly using the react query functionality ie bridge the gap between front and backend
// import { createUserAccount } from "@/lib/appwrite/api";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";

// define a form schema: this is moved to the validations index.ts file to make it reusable
// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// })


const SignupForm = () => {
  // creating a fake form field to load when SUBMIT is CLICKED
  const { toast } = useToast();
  // const isLoading= false;

  // the mutateAsync hook is the actual function we are calling in the useCreateUserAccountMutation function definition using mutation ie the createUserAccout function
  // we can rename it using : newname thus ( mutateAsync: newname )
  const { mutateAsync: createUserAccount, isLoading: isCreatingUser } =
    useCreateUserAccount;

    // call the useSignIn mutate hook
  const { mutateAsync: signInAccount, isLoading: isSigningIn} = useSignInAccount()

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler. ie what to do after submitting
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // create new users upon SIGN IN
    const newUser = await createUserAccount(values);

    // after creating user whats next you want to do, enter user into a session

    // rendering a toast if user account fails to create ie a pop up message
    if (!newUser) {
      return toast({ title: " Sign up Failed. Please try again" });
    }

    // create a sign in session
    const session = await signInAccount({email: values.email, password: values.password,});

    // check if signin session was succesful else return a TOAST
    if (!session) {
      return toast ({title: 'Sign in failed. Please try again.'})
    }
    // se need to store the session in our react context, so create a new context folder in src


    // Do something with the form values.
    console.log(newUser);
  }

  return (
    // <div> delete div to make form the outer element
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          {" "}
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-12">
          {" "}
          Enter your details to use SNAPGRAM
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    placeholder="valentine"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* copy and pasting form element to create other form fields  */}
          {/* username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    placeholder="MrV"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="shad-input"
                    placeholder="vkampah28gmail.com"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="shad-input"
                    placeholder="valentine"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {/* defining a Loader function to use instead of submit for users to see whats happening after clicking SIGN UP */}
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign up"
            )}
          </Button>

          {/* if user already have an account render a link component */}
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1"
            >
              {" "}
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
    // </div>
  );
}

export default SignupForm



// IMPORTED ZOD TO USE TO VALIDATE shadcn form schema
// import * as z from "zod"

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// })

