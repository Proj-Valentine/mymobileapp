
import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";


const Bottombar = () => {

//   const  pathname  = useLocation(); this is different from the code below with parenthesis {}
  const {pathname} = useLocation();



  return (
    <div>
      <section className="bottom-bar">
        {/* link doesnt need an interface INavlink */}
        {bottombarLinks.map((link) => {
          // is Active will return a boolean to check if pathname ie contains the loaction ie url of an element
          const isActive = pathname === link.route;
        //   console.log(isActive);
       

          return (
            <Link
              to={link.route}
              key={link.label}
              // adding a background color to show the link/page we are on (that is active)
              // if we are on the page useLocation variable will return the url of the page ie the route
              // adding group class to extend the hover from li to the children
                className={`flex-center flex-col gap-1 p-2 transition ${
                  isActive && "bg-primary-500 rounded-[10px]"
                } `}
            >
              <img
                src={link.imgURL}
                alt={link.label}
                width={16}
                height={16}
                className={`${isActive && "invert-white"}`}
              />
              <p className="tiny-medium text-light-2">{link.label}</p>
            </Link>
            
          );
        })}
      </section>
    </div>
  );
}

export default Bottombar
