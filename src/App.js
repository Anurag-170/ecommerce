import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Payment = lazy(() => import("./pages/Payment"));
const Paymentd = lazy(() => import("./pages/Paymentd"));
const Paytype = lazy(() => import("./pages/paytype"));
const Login = lazy(() => import("./pages/login"));
const Logout = lazy(() => import("./pages/logout"));
const Profile = lazy(() => import("./pages/profile"));
const Reg = lazy(() => import("./pages/reg"));
const Order = lazy(() => import("./pages/order"));
const Return = lazy(() => import("./pages/return"));
const Cancel = lazy(() => import("./pages/cancel"));
const Forgot = lazy(() => import("./pages/forgot"));
const Product = lazy(() => import("./pages/Product"));
const Track = lazy(() => import("./pages/track"));
const Payslip = lazy(() => import("./pages/Payslip"));
const Contact = lazy(() => import("./pages/Contact"));
const Deliverd = lazy(() => import("./pages/deliverd"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
		   <Route path="login" element={<Login />} />
		   <Route path="forgot" element={<Forgot />} />
		   <Route path="logout" element={<Logout />} />
		   <Route path="profile" element={<Profile />} />
		   <Route path="payslip" element={<Payslip />} />
		   <Route path="track" element={<Track />} />
		     <Route path="Reg" element={<Reg />} />
		     <Route path="order" element={<Order />} />
		     <Route path="return" element={<Return />} />
		     <Route path="cancel" element={<Cancel />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/cod" element={<Paymentd />} />
          <Route path="/paytype" element={<Paytype />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/deliverd" element={<Deliverd />} />

          

        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
