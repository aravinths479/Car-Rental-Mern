import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// const Navbar = () => {
//   const { logout } = useLogout();
//   const { user } = useAuthContext();

//   const handleClick = () => {
//     logout();
//   };

//   return (
//     <header id="header" className="header fixed-top d-flex align-items-center">
//       <div className="d-flex align-items-center justify-content-between">
//         <Link to="/" className="logo d-flex align-items-center">
//           <img src="assets/img/logo.png" alt="" />
//           <span className="d-none d-lg-block">Car Rental</span>
//         </Link>
//         <i className="bi bi-list toggle-sidebar-btn"></i>
//       </div>

//       <div className="search-bar">
//         <form
//           className="search-form d-flex align-items-center"
//           method="POST"
//           action="#"
//         >
//           <input
//             type="text"
//             name="query"
//             placeholder="Search"
//             title="Enter search keyword"
//           />
//           <button type="submit" title="Search">
//             <i className="bi bi-search"></i>
//           </button>
//         </form>
//       </div>

//       <nav className="header-nav ms-auto">
//         <ul className="d-flex align-items-center">
//           <li className="nav-item d-block d-lg-none">
//             <a className="nav-link nav-icon search-bar-toggle " href="#">
//               <i className="bi bi-search"></i>
//             </a>
//           </li>

//           {!user && (
//             <div>
//               <Link to="/login">Login</Link>
//               <Link to="/signup">Signup</Link>
//             </div>
//           )}

      
//           {user && (
//             <li className="nav-item dropdown pe-3">
//               <Link
//                 className="nav-link nav-profile d-flex align-items-center pe-0"
//                 to="/"
//                 data-bs-toggle="dropdown"
//               >
//                 <img
//                   src="assets/img/profile-img.jpg"
//                   alt="Profile"
//                   className="rounded-circle"
//                 />
//                 <span className="d-none d-md-block dropdown-toggle ps-2">
//                   {user.email}
                  
//                 </span> 
//               </Link>

//               <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
               

//                 <li>
//                   <Link
//                     className="dropdown-item d-flex align-items-center"
//                     to="/profile"
//                   >
//                     <i className="bi bi-person"></i>
//                     <span>My Profile</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <hr className="dropdown-divider" />
//                 </li>
//                 <li>
//                   <button
//                     onClick={handleClick}
//                     className="dropdown-item d-flex align-items-center"
//                   >
//                     <i className="bi bi-box-arrow-right"></i>
//                     Sign Out
//                   </button>
//                 </li>
//               </ul>
//             </li>
//           )}
//         </ul>
//       </nav>
      
//     </header>
//   );
// };

// export default Navbar;


const Navbar = () => {

    const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return ( 

    
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">

      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/mybooking">My Bookings</Link>
        </li>
      </ul>

      


    {!user && (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      </ul>
    )}

    {user && (

      

      <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {user.email}
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link className="dropdown-item" to="/profile">My Profile</Link>
              <button  onClick={handleClick} className="dropdown-item" to="/">Sign Out</button>
            </div>
          </li>
        </ul>

    )}

    </div>
  </nav>

   );
}
 
export default Navbar;

