import './style.css';
import Header from './Header';
import LeftNavigationBar from './LeftNavigationBar';
import { useUser } from './UserContext';
import React, { useState, useEffect } from 'react';

export default function Account(){
    const {user} = useUser();
    const { username, usertype } = user || {};

    const userNameToCancel = username;
   
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [isFormVisible, setFormVisibility] = useState(true);
    const [cancellationMessage, setCancellationMessage] = useState();



    useEffect(() => {
        // Fetch data from localStorage
        const storedPaymentDetails = localStorage.getItem('PaymentDetails');
        if (storedPaymentDetails) {
          setPaymentDetails(JSON.parse(storedPaymentDetails));
        }
      }, []);

    const handleCancelOrder = (selectedOrderId, selectedOrderName) => {

        // Implement cancellation logic here
        console.log(selectedOrderId)
        console.log(selectedOrderName)
        if (selectedOrderName !== null && paymentDetails) {
          const updatedPaymentDetails = { ...paymentDetails };
          const order = updatedPaymentDetails.orders.find((o) => o.orderid === parseInt(selectedOrderId));
          console.log(order)
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

   
   
    const ordersForUser = [];

paymentDetails.orders.forEach((order) => {
  order.items
    .filter((oi) => oi.userName === username)
    .forEach((oi) => {
      const handleCancelOrderSubmit = (e) => {
        e.preventDefault();
        handleCancelOrder(order.orderid, oi.orderName);
      };
      ordersForUser.push(
        <tr key={oi.orderName}>
          <td>
            <form method="get" action="ViewOrder" onSubmit={handleCancelOrderSubmit}>
              <input type="radio" name="orderName" value={oi.orderName} />
              <input type="hidden" name="orderId" value={order.orderid} />
            </form>
          </td>
          <td>{order.orderid}</td>
          <td>{oi.userName}</td>
          <td>{oi.orderName}</td>
          <td>Price: {oi.orderPrice}</td>
          <td>
            <form method="get" action="ViewOrder" onSubmit={handleCancelOrderSubmit}>
                <input type="hidden" name="orderId" value={order.orderid} />
                <input type="submit" name="Order" value="CancelOrder" className="btnbuy" />
              </form>
          </td>
        </tr>
      );
    });
});


    return(
        <>
            <div className="Container">
            <Header />
            <LeftNavigationBar />
            <div id='content'><div className='post'><h2 className='title meta'>
            <a style={{fontSize: "24px"}}>Account</a>
            </h2><div className='entry'>
            {isFormVisible ? (
            <table className='gridtable'>
            <tr>
            <td> User Name: </td>
            <td>{username}</td>
            </tr>
            <tr>
            <td> User Type: </td>
            <td>{usertype}</td>
            </tr>
            <tr><td></td>
            <td>OrderId:</td>
            <td>UserName:</td>
            <td>productOrdered:</td>
            <td>productPrice:</td></tr>
            {ordersForUser.length > 0 ? (
                  ordersForUser
                ) : (
                    <h4 style={{ color: 'red' }}>You have not placed any order with this order id</h4>
                )}
                </table>
                ) : (
                  <div>
                    <h4 style={{ color: 'red' }}>{cancellationMessage}</h4>
                  </div>
                )}
        </div>
        </div></div></div>
        </>
    );
}