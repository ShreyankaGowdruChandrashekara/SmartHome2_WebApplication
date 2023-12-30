import {React, useState,useEffect} from 'react';
import Home from './Home';
import Footer from './Footer';
import DoorBellsList from './DoorBellsList';
import DoorLocksList from './DoorLocksList';
import SpeakersList from './SpeakersList';
import LightingsList from './LightingsList';
import ThermostatsList from './ThermostatsList';
import Login from './Login';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AccessoryList from './AccessoryList';
import Registration from './Registration';
import Cart from './Cart';
import Details from './Details';
import HomeSM from './HomeSM';
import HomeSAM from './HomeSAM';
import ViewOrder from './ViewOrder';
import AddProductPage from './AddProductPage';
import ProductUpdatePage from './ProductUpdatePage';
import ProductDeletePage from './ProductDeletePage';
import Logout from './Logout';
import Account from './Account';
import SMLogout from './SMLogout';
import SAMLogout from './SAMLogout';
import NewCustomerPage from './NewCustomerPage';
import OrderUpdatePage from './OrderUpdatePage';
import { useCart } from "./CartContext";
import ReviewForm from './ReviewForm';
import DisplayReviews from './DisplayReviews';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [detailsItem, setDetailsItems] = useState([]);

  const handleDetails = (item)=>{
    setDetailsItems(item)
  }
  
  const { items, count, updateCount } = useCart();

  const handleProduct = (product)=>{

    console.log("add to cart");
    setCartItems(
      [...cartItems,{...product, quantity:1}]
    )
    updateCount(cartItems.length)

    console.log(cartItems);
  };

  const handleRemoveItem = (item) =>{

    if(item === ''){
      console.log("empty")
      setCartItems([])
      updateCount(0)
      return;
    }
    console.log(cartItems)

    const temp = cartItems.filter((cartItem)=> !(cartItem === item))

    setCartItems(temp)
    updateCount(temp.length)

  }

  useEffect(() => {
    // Read payment details from localStorage or load from a server if needed
    const fetchPaymentDetails = async () => {
      try {
        
        const storedPaymentDetails = localStorage.getItem('PaymentDetails');
        const initialPaymentDetails = storedPaymentDetails?JSON.parse(storedPaymentDetails):require('./PaymentDetails.json');

        localStorage.setItem('PaymentDetails', JSON.stringify(initialPaymentDetails))

        localStorage.setItem('cart',0)
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, []);


  return (
    <Router>
    <div className="App">
      <div className='content'>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/homesm">
          <HomeSM />
        </Route>
        <Route exact path="/homesam">
          <HomeSAM />
        </Route>
        <Route path="/DoorBellsList">
          <DoorBellsList addItem={handleProduct}  details={handleDetails}/>
        </Route>
        <Route path="/DoorLocksList">
          <DoorLocksList addItem={handleProduct}  details={handleDetails}/>
        </Route>
        <Route path="/SpeakersList">
          <SpeakersList addItem={handleProduct}  details={handleDetails}/>
        </Route>
        <Route path="/LightingsList">
          <LightingsList addItem={handleProduct}  details={handleDetails}/>
        </Route>
        <Route path="/ThermostatsList">
          <ThermostatsList addItem={handleProduct}  details={handleDetails}/>
        </Route>
        <Route path="/AccessoryList">
          <AccessoryList addItem={handleProduct}  details={handleDetails}/>
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route exact path="/Logout">
          <Logout removeItem ={handleRemoveItem}/>
        </Route>
        <Route path="/Registration">
          <Registration />
        </Route>
        <Route exact path="/Cart">
          <Cart cartItems = {cartItems} removeItem ={handleRemoveItem}/>
        </Route>
        <Route path="/Details">
          <Details item = {detailsItem}/>
        </Route>
        <Route exact path="/ViewOrder">
          <ViewOrder />
        </Route>
        <Route exact path="/AddProductPage">
          <AddProductPage />
        </Route>
        <Route exact path="/ProductUpdatePage">
          <ProductUpdatePage />
        </Route>
        <Route exact path="/ProductDeletePage">
          <ProductDeletePage/>
        </Route>
        <Route exact path="/Account">
          <Account />
        </Route>
        <Route exact path ="/SMLogout">
          <SMLogout />
        </Route>
        <Route exact path ="/SAMLogout">
          <SAMLogout/>
        </Route>
        <Route path = "/NewCustomerPage">
          <NewCustomerPage/>
        </Route>
        <Route path = "/OrderUpdatePage">
          <OrderUpdatePage/>
        </Route>
        <Route path = "/ReviewForms">
          <ReviewForm/>
        </Route>
        <Route path = "/DisplayReviews">
          <DisplayReviews/>
        </Route>
      </Switch>
      <Footer />
      </div>
    </div>
    </Router>
  );
}

export default App;
