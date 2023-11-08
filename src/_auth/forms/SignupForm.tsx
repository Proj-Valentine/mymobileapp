// import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from 'react-router-dom';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SignupValidation} from "@/lib/validation";
import { z } from 'zod';
import Loader from "@/components/shared/Loader";
import { createUserAccount } from "@/lib/appwrite/api";

// define a form schema: this is moved to the validations index.ts file to make it reusable
// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// })


const SignupForm = () => {
  // creating a fake form field to load when SUBMIT is CLICKED
  const isLoading= false;
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name:'',
      username: '',
      email:'',
      password:'',
    },
  })
 
  // 2. Define a submit handler. ie what to do after submitting
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // create new users upon SIGN IN
    const newUser = await createUserAccount (values);

    // after creating user whats next you want to do

    if (!newUser){
      return;
    }
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
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ):("Sign up")}
          </Button>

    {/* if user already have an account render a link component */}
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1"> Log in</Link>
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

