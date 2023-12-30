import './style.css';
import Header from './Header';
import LeftNavigationBar from './LeftNavigationBar';
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

export default function DisplayReviews(){
    const location = useLocation();
    const { name } = location.state;
    console.log(name)
    const [reviews, setReviews] = useState([]);
    
      
    useEffect(() => {
        // Assuming you get the product ID from props or some other source
        const productId = 3;
    
        // Fetch reviews for the product
        // axios.get(`http://localhost:3001/api/getAllReviews`)
        console.log(name)
        axios.get(`http://localhost:3001/api/getProductReviews/${name}`)
          .then(response => {
            setReviews(response.data);
          })
          .catch(error => {
            console.error('Error fetching reviews:', error.message);
          });
      }, []);
      console.log(reviews)
      

    return(
        <>
            <div className="Container">
        <Header />
        <div id='body' style={{backgroundColor:"white",width:"100%"}}>
        <section id='content' style={{width:"100%",backgroundColor:"white"}}>
        {reviews.length === 0 ? (
        <p>No reviews found for the product.</p>
      ) : (<>
        <h1 style={{align:"center"}}><span style={{color:"red",align:"center"}}> {name} Reviews</span></h1><br/><br/>
        {reviews.map((review, index) => (
          <article key={index} style={{ marginLeft: '25%' }}>
          <h2 style={{ color: 'blue' }}>{`Review #${index + 1} by ${review.userId}`}</h2>
            <b>Product Name:</b> {review.productName} <br />
            <b>Product Category:</b> {review.productCategory} <br />
            <b>Product Price:</b> {review.productPrice} <br />
            <b>Product Company:</b> {review.productCompany} <br />
            <b>Retailer Zip:</b> {review.retailerZip} <br />
            <b>Retailer Name:</b> {review.retailerName} <br />
            <b>Retailer City:</b> {review.retailerCity} <br />
            <b>Retailer State:</b> {review.retailerState} <br />
            <b>Product on Sale:</b> {review.onSale} <br />
            <b>Manufacturer Rebate:</b> {review.productRebate} <br />
            <b>User:</b> {review.userId} <br />
            <b>User Age:</b> {review.userAge} <br />
            <b>User Gender:</b> {review.userGender} <br />
            <b>User Occupation:</b> {review.userOccupation} <br />
            <b>Review Rating:</b> {review.reviewRating} <br />
            <b>Review Date:</b> {review.reviewDate} <br />
            <b>Review Text:</b> {review.reviewText} <br />
          </article>
        ))}
            </>
        )
      }
      </section>
      </div>
      <div className="clear"></div>
      </div>
        </>
    );
}
