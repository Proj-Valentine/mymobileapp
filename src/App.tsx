import React from 'react';
import './globals.css';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
   <main className="flex h-screen">
    <Routes>
        {/* public routes: these are routes everyone can seeeg sign in page/home page of app */}
        <Route path="/sign-in" element={<SignForm} />

        {/* private routes: see only when you sign in ie personal profile*/}
        <Route index element={<Home />}/>
    </Routes>

   </main>
  )
}

export default App
