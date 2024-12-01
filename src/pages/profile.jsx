import { Fragment } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import { Col, Container, Row } from "react-bootstrap";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { Link } from "react-router-dom";
import returns from "../Images/return.jpg";
import order from "../Images/order.png";
import cancel from "../Images/cancel.png";
import deliverd from "../Images/deliverd.png";

const Profile = () => {
  const newArrivalData = products.filter(
    (item) => item.category === "mobile" || item.category === "wireless"
  );
  const bestSales = products.filter((item) => item.category === "sofa");
  useWindowScrollToTop();
 let authToken = localStorage.getItem('Authorization');
  let name='';
if(authToken!== null)
{
  let a=authToken.split(',');
  name=a[1];
}
  
    return (
      
      <section className="cart-items">
      <Container>
      <div className="profile-page">
        <div className="profile-header">
          <h1>{name}</h1>
        </div>
        <div className="profile-bio">
          
        </div>
        {/* Add more profile information components here */}
      </div>
        <Row className="justify-content-center">
          <Col md={3}>
          <div className="cart-total" style={{height:"400px"}}>
              <h2>Orders</h2>
              <div className=" d_flex">
              <Link
             
              to={"/order"}
             
            >   <img src={order} height="100px"/>
			</Link>
              </div>
            </div>
                     </Col>
                     <Col md={3}>
          <div className="cart-total" style={{height:"400px"}}>
              <h2>Return Order</h2>
              <div className=" d_flex">
			   <Link
             
              to={"/return"}
             
            > 
              <img src={returns} height="100px"/>
              </Link>
			  </div>
            </div>
                     </Col>
          <Col md={3}>
            <div className="cart-total" style={{height:"400px"}}>
              <h2>Cancel Order</h2>
              <div className=" d_flex">
			  <Link
             
              to={"/cancel"}
             
            > 
              <img src={cancel} height="100px"/>
              </Link>
			  </div>
            </div>
            </Col>
            <Col md={3}>
          <div className="cart-total" style={{height:"400px"}}>
              <h2>Deliverd</h2>
              <div className=" d_flex">
              <Link
             
              to={"/deliverd"}
             
            >   <img src={deliverd} height="100px"/>
			</Link>
              </div>
            </div>
                     </Col>
        </Row>
        
<Row>
<Col md={4}> 
</Col>
<Col md={4}>
</Col>
</Row>
      </Container>
    </section>

    );
  }

export default Profile;
