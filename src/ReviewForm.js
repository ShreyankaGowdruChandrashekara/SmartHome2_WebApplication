import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useLocation } from "react-router-dom";
import Header from './Header';
import LeftNavigationBar from './LeftNavigationBar';
import { useUser } from './UserContext';

export default function ReviewForm() {
    const [reviewDetail, setReviewDetail] = useState({
    // Initialize with default values or leave empty

  });

  const [reviewAdded, setReviewAdded] = useState(false); 
  const {user} = useUser();
    const { username, usertype } = user || {}
  const u = username
  const location = useLocation();
  const { productData } = location.state;

  const productname = productData.name;
  const productid = productData.id;
  const productcategory = productData.category;
  const productprice = productData.price;
  const productimg = productData.img;
  const productdesc = productData.desc;
  const productmaker = productData.maker;
  let type = "";

  switch (productcategory) {
      case "Doorbells":
        type = "doorbells";
        break;
      case "Doorlocks":
        type = "doorlocks";
        break;
      case "Lightings":
        type = "lightings";
        break;
      case "Speakers":
        type = "speakers";
        break;
      case "Thermostats":
        type = "thermostats";
        break;
      default:
        type = "";
        break;
    }  
    


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewDetail({ ...reviewDetail, [name]: value,productname,
      productid,
      productcategory,
      productprice,
      productimg,
      productdesc,
      productmaker, 
      u,
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(reviewDetail)
      console.log(u)
      await axios.post('http://localhost:3001/api/addReview', reviewDetail);
      console.log('Review added successfully');
      setReviewAdded(true); 
    } catch (error) {
      console.error('Error adding review:', error.message);
    }
  };
  useEffect(() => {
    // Perform actions after the review is added
    if (reviewAdded) {
      // Optionally, you can redirect the user or display a success message
      // Here, we're updating the state to hide the form and other parts
      setReviewDetail({}); // Clear the form data
    }
  }, [reviewAdded]); 

  return (
    <>
     
    <div className="Container">
        <Header />
        <LeftNavigationBar />
        {!reviewAdded && (
      <>
        <div id='content'><div className='post'>
        <h2 className='title meta'>
        <a style={{fontSize: "24px",color:"purple",textAlign:"center",fontWeight:"bold"}}> Write Review for {productname}</a></h2><br/><br/>
        <div> <img src = {'images/' + type + '/' + productimg} alt='' style={{width :"350px" ,important: "all",height:"350px",important: "all",marginLeft:"35%"}}/><h4 style={{textAlign :"center",fontSize:"12px",important:"all"}}>{productdesc}
        </h4> <h4 style={{textAlign :"center",fontSize:"12px",important:"all"}}> Price - ${productprice}</h4></div></div></div>
      <form onSubmit={handleSubmit}>
        <div id='content'><div className='post'>
        <div className='entry'>
        <table><tr></tr><tr></tr>
        <table><tr><td>
        <b>Enter your Ratings here : <span className='tab'/>       </b> </td>
        <td><select name='ratings' id='ratings' style = {{margin:"50px",important:"all",width : "100px",important:"all"}} onChange={handleInputChange}>
        <option value='5' selected>5 Stars</option>
        <option value='4.5'>4.5 Stars</option>
        <option value='4'>4 Stars</option>
        <option value='3.5'>3.5 Stars</option>
        <option value='3'>3 Stars</option>
        <option value='2.5'>2.5 Stars</option>
        <option value='2'>2 Stars</option>
        <option value='1.5'>1.5 Stars</option>
        <option value='1'>1 Star</option>
        <option value='0'>0 Stars</option>
        </select>
        </td></tr></table>
        <tr><td><b>
        Enter your reviews here :</b></td></tr> <tr>
        <td><input type='text' name='reviews' style= {{width: "600px",important:"all",height:"50px",important:"all" ,size:'150'}} onChange={handleInputChange}></input>
        </td></tr><br/> <br/>
        <input type='hidden' name='userName' value={username}></input>
        <input type='hidden' name='prodID' value={productid}></input>
        <input type='hidden' name='prodCategory' value={productcategory}></input>
        <b style = {{color:'red',fontSize: '16px'}}> Please enter your details below </b> <br/> <br/>
        <tr><td><b>
        Enter your age :</b></td></tr> <tr>
        <td><input type='text' name='age' style= {{width: "100px",important:"all",size:'100'}} onChange={handleInputChange}>
            </input>
            </td></tr><br/> <br/> <br/>
            <tr><td><b>
            Enter your gender :</b></td></tr> <tr>
            <td><input type='text' name='gender' style= {{width: "100px",important:"all",size:'100'}} onChange={handleInputChange}></input>
            </td></tr><br/> <br/> <br/>
            <tr><td><b>
            Enter your occupation :</b></td></tr> <tr>
            <td><input type='text' name='occupation' style= {{width: "100px",important:"all",size:'100'}} onChange={handleInputChange}></input>
            </td></tr><br/> <br/> <br/>
            <tr><td colspan='2'>
            <input type='submit' name='submit' class='btnbuy' style= {{width: "600px",important:'all'}} onChange={handleInputChange}></input>
            </td></tr>
            </table>
        </div></div></div>
      </form> </>)}
      {reviewAdded && (
          <>
            <b>Review Added successfully. Go to products to view the reviews</b>
            </>
        )}
    </div>
    </>
  );
}

