import ReactDOM from 'react-dom/client'; // add /client to the import else wont work
import App from './App';
// importing router
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import { QueryProvider } from './lib/react-query/QueryProvider';

// add an exclamation for the document function to work
// ADD Browerser router to control routes for the app
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
);