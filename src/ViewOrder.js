import './style.css';
import Header from './Header';
import LeftNavigationBar from './LeftNavigationBar';
import { useLocation } from "react-router-dom";
import {React, useState, useEffect} from 'react';
import { useUser } from './UserContext';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios';

export default function ViewOrder(){
    const {user} = useUser();
    const { username, usertype } = user || {}
    const history = useHistory();

    console.log(username)
    if (!username){
      history.push('/Login')
      
    }

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const Order = queryParams.get("Order");
    const orderId = queryParams.get("orderId");
    const orderName = queryParams.get("orderName");
    

    const userNameToSearch = username;
    const userNameToCancel = username;
    

    const [paymentDetails, setPaymentDetails] = useState(null);
    const [isFormVisible, setFormVisibility] = useState(true);
    const [cancellationMessage, setCancellationMessage] = useState();

    // Read paymentDetails from the JSON file
    useEffect(() => {
      // Read payment details from localStorage or load from a server if needed
      const fetchPaymentDetails = async () => {
        try {
          
          const storedPaymentDetails = localStorage.getItem('PaymentDetails');
          const initialPaymentDetails = storedPaymentDetails?JSON.parse(storedPaymentDetails):require('./PaymentDetails.json');
  
          setPaymentDetails(initialPaymentDetails);

          localStorage.setItem('PaymentDetails', JSON.stringify(initialPaymentDetails))
        } catch (error) {
          console.error("Error fetching payment details:", error);
        }
      };
  
      fetchPaymentDetails();
    }, []);

    const handleViewOrder = (e) => {
      e.preventDefault();
      const selectedOrderId = e.target.elements.orderId.value;
      if (selectedOrderId) {
        history.push(`/viewOrder?Order=ViewOrder&orderId=${selectedOrderId}`);
      } else {
        // Handle the case where the orderId is not valid
        console.log("Invalid orderId");
      }
    };
  
    const  handleCancelOrder = async (selectedOrderName,selectedOrderId) => {

      if (selectedOrderName !== null && paymentDetails) {
          const updatedPaymentDetails = { ...paymentDetails };
          
          const order = updatedPaymentDetails.orders.find((o) => o.orderid === parseInt(selectedOrderId));
          if (order) {
             if (selectedOrderName.trim() === "") {
              setCancellationMessage("Please select any product");
              return;
            }

            order.items = order.items.filter(
              (item) => !(item.orderName === selectedOrderName && item.userName === userNameToCancel)
            ); 
  
            if (order.items.length === 0) {
              updatedPaymentDetails.orders = updatedPaymentDetails.orders.filter((o) => o.orderid !== order.orderid);
            }
          
            console.log(updatedPaymentDetails)
          localStorage.setItem('PaymentDetails', JSON.stringify(updatedPaymentDetails));
          setCancellationMessage("Your Order is Cancelled");
          setFormVisibility(false);

          try{

            

            const response = await axios.delete('http://localhost:3001/api/deleteOrder', {
              params: { orderID: parseInt(selectedOrderId) }
          });
          }catch(e){
            console.error("Delete order");

          }

          

          

       }
       else {
          console.error("Error cancelling order");
       }
      
      
      }
    };

    if (!paymentDetails) {
      // If paymentDetails is still loading, you can render a loading spinner or a message
      return <p>Loading...</p>;
    }
  
    return(
        <>
        <div className="Container">
            <Header />
            <LeftNavigationBar />
            {isFormVisible && (
            <form  onSubmit={handleViewOrder}>
            <div id='content'><div className='post'><h2 className='title meta'>
            <a style={{fontSize: "24px"}}>Order</a>
            </h2><div className='entry'>
            { Order === null && (
                <table align='center'><tr><td>Enter OrderNo &nbsp;&nbsp;<input name='orderId' type='text'/></td>
                <td><input type='submit' name='Order' value='ViewOrder' className='btnbuy' /></td></tr></table>
            )}
            
          {Order !== null && Order === "ViewOrder" && (
			    <>
                {orderId !== null && orderId !== "" && paymentDetails && (
                  <>
                    <input type='hidden' name='orderId' value={orderId}/>
                    {paymentDetails.orders.find((o) => o.orderid === parseInt(orderId)) && (
                            <>
                              {Object.values(paymentDetails.orders.find((o) => o.orderid === parseInt(orderId)).items)
                                .filter((product) => product.userName === userNameToSearch)
                                .length > 0 ? (
                            <table className="gridtable">
                              <tr>
                                <td></td><td>OrderId:</td>
                                <td>UserName:</td>
                                <td>productOrdered:</td>
                                <td>productPrice:</td>
                              </tr>
                              {paymentDetails.orders.find((o) => o.orderid === parseInt(orderId)).items.map((order) => (
                                <tr key={order.userName}>
                                  <td>
                                    <input type="radio" name="orderName" value={order.orderName}/>
                                  </td>
                                  <td>{orderId}</td>
                                  <td>{order.userName}</td>
                                  <td>{order.orderName}</td>
                                  <td>Price:{order.orderPrice}</td>
                                  <td>
                                    <input type="button" name="Order" value="CancelOrder" className="btnbuy" onClick={() => handleCancelOrder(order.orderName, orderId)}/>
                                  </td>
                                </tr>
                              ))}
                            </table>
                          ) : (
                            <h4 style={{ color: "red" }}>
                              You have not placed any order with this order id
                            </h4>
                          )}
                        </>
                      )}
                      {!paymentDetails.orders.find((o) => o.orderid === parseInt(orderId)) && (
                            <h4 style={{ color: "red" }}>
                              You have not placed any order with this order id
                            </h4>
                          )}
                        </>
                      )}
                      {(!orderId || orderId === '') && (
                        <h4 style={{ color: 'red' }}>
                          Please enter the valid order number
                        </h4>
                      )}
                    </>
                  )}
                         
            </div>
            </div>
            </div> 
            </form>
            )}

            {cancellationMessage && (
                <><h4 style={{color:"red"}}> Your Order is cancelled</h4></>
              )}
        </div>
        </>
    );
}
