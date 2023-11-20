import * as z from "zod";

// define a form validation schema to reuse
export const SignupValidation = z.object({
    name: z.string().min(2,{message: 'Too short: name must be more than 2 characters'} ),
    // username: z.string().min(2).max(50),
    username: z.string().min(2, {message:'Too short: username must be more than 2 characters'}),
    email: z.string().email(),
    password: z.string().min(8,{message: 'password must not be less than 8 characters'})

})

export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8,{message: 'password must not be less than 8 characters'})

})

export const PostValidation = z.object({
    caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(100),
    tags: z.string()
})

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});