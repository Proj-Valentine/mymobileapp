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
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            {/* render what has to be on the page */}
            {/* applying styling to center form element */}
            <Outlet />
          </section>
          <img
            src = "/assets/images/side-img3.jpg"
            alt="log"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"/>
        </>
      )}
    </>
  )
}

export default AuthLayout
