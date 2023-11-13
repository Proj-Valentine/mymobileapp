import { Routes, Route } from 'react-router-dom';
// without curly braces implies default import
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
// with curly braces implies name import, helps to import more pages on one line
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';

import './globals.css';

import { Toaster } from "@/components/ui/toaster";


const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes: these are routes everyone can seeeg sign in page/home page of app */}
        {/* placing signin/up pages into another page (ie authlayout page) */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes: see only when you sign in ie personal profile*/}
        {/* create root page to contain other pages */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
      {/* this will allow us to see the toaster on the page ie a prompt message, but the content will be defined in the specific component the toaster is used */}
      <Toaster />
    </main>
  );
}

export default App
