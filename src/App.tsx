import React from 'react';
import './globals.css';

import { Routes, Route } from 'react-router-dom';
// without curly braces implies default import
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SigninForm';
// with curly braces implies name import, helps to import more pages on one line
import { Home } from './_root/pages';


const App = () => {
  return (
   <main className="flex h-screen">
    <Routes>
        {/* public routes: these are routes everyone can seeeg sign in page/home page of app */}
        <Route path="/sign-in" element={<SigninForm/>} />
        <Route path="/sign-up" element={<SignupForm/>} />

        {/* private routes: see only when you sign in ie personal profile*/}
    </Routes>
        <Route index element={<Home/>}/>

   </main>
  )
}

export default App
