import { Fragment } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import { Col, Container, Row } from "react-bootstrap";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { Link } from "react-router-dom";
import cod from "../Images/cod.png";
import card from "../Images/card.png";

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
          <Col md={6}>
          <div className="cart-total" style={{height:"400px"}}>
              <h2>Cash On Delivery</h2>
              <div className=" d_flex">
              <Link
             
              to={"/cod"}
             
            >  <center> <img src={cod} height="100px"/></center>
			</Link>
              </div>
            </div>
                     </Col>
                     <Col md={6}>
          <div className="cart-total" style={{height:"400px"}}>
              <h2>Online Pay</h2>
              <div className=" d_flex">
			   <Link
             
              to={"/payment"}
             
            > 
              <center><img src={card} height="100px"/></center>
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
