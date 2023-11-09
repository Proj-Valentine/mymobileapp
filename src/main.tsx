import React from 'react';
import ReactDOM from 'react-dom/client'; // add /client to the import else wont work
import App from './App';
// importing router
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext';

// add an exclamation for the document function to work
// ADD Browerser router to control routes for the app
ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
)