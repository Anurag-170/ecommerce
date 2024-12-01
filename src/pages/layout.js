import { Outlet, Link } from "react-router-dom";
import './style.css';
//import './all.min.css';
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

const Layout = () => {
  return (
    <>
    <div class="navbar">
            <div class="nav-logo border">
                <div class="logo">
                </div>
            </div>
                <div class="nav-address border">
                    <p class="add-first">Deliver to</p>
                    <div class="add-icon">
                       <FaLocationDot/>
                        <p class="add-sec">India</p>
                    </div>
                </div>
            <div class="nav-search">
                <select class="search-select">
                    <option>All</option>
                </select>    
                <input type="text" className="nav-searchs"/>
                <div class="search-icon">
                   <FaSearch/>
                </div>  
            </div>
        <div class="nav-signin border">
            <p>
                <span>Hello, signin</span>
            </p>
            
        <ul>
          
          <li className="menus">
            <Link to="/home">Home</Link>
          </li>
          <li  className="menus">
            <Link to="/login">Login</Link>
          </li>
          <li  className="menus">
            <Link to="/Reg">Reg</Link>
          </li>
        
          <li  className="menus">
            <Link to="/CartPage">CartPage</Link>
          </li>
         
        </ul>
      

        </div>

        <div class="nav-returns border">
            <p>
                <span>Returns</span>
            </p>
            <p class="nav-second">&orders</p>      
        </div>
        <div class="nav-cart border">
           <FaShoppingCart/>
            cart
        </div>
    </div>
      
      <Outlet />
    </>
  )
};

export default Layout;