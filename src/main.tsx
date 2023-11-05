import React from 'react';
import ReactDOM from 'react-dom/client'; // add /client to the import else wont work
import App from './App';

// add an exclamation for the document function to work
ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)