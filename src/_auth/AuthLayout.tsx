import { Outlet, Navigate } from 'react-router-dom';
// import SignupForm from './forms/SignupForm';



const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ):(
        <>
          <section>
            {/* render what has to be on the page */}
            <Outlet />
          </section>
        </>
      )}
    </>
  )
}

export default AuthLayout
