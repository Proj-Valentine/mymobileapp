import React from 'react';

import { Routes, Route } from 'react-router-dom';
// without curly braces implies default import
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SigninForm';
// with curly braces implies name import, helps to import more pages on one line
import { Home } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';

import './globals.css';


const App = () => {
  return (
   <main className="flex h-screen">
    <Routes>
        {/* public routes: these are routes everyone can seeeg sign in page/home page of app */}
          {/* placing signin/up pages into another page (ie authlayout page) */}
        <Route element={<AuthLayout/>}>
          <Route path="/sign-in" element={<SigninForm/>} />
          <Route path="/sign-up" element={<SignupForm/>} />
        </Route>

        {/* private routes: see only when you sign in ie personal profile*/}
          {/* create root page to contain other pages */}
        <Route element ={<RootLayout/>}>
          <Route index element={<Home/>}/>

        </Route>
    </Routes>

   </main>
  )
}

export default App
