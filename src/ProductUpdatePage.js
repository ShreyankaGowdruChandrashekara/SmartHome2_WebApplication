import './style.css';
import Header1 from './Header1';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useState,useEffect } from "react";

export default function ProductUpdatePage(){
    const history = useHistory();

    const [productDetails, setProductDetails] = useState({
        pId:"",
        pname: "",
        pdescription: "",
        pdiscount: "",
        pprice: "",
        pimage: "",
        pcondition: "",
        pcompany: "",
        pRebate: '',
        pSale: '',
        pcategory: "",
        pquantity:"",
    });

    const [allProducts, setAllProducts] = useState([]);

    function routeToComponent(e, routePath){

        e.preventDefault();
        history.push(routePath);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setProductDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    }
    useEffect(() => {
        // Fetch all products from the server
        fetchAllProducts();
      }, []); // Empty dependency array ensures useEffect runs only once on component mount
    
      const fetchAllProducts = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/allproducts'); // Update the endpoint as per your server setup
          const data = await response.json();
          setAllProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

    async function updateProduct(e) {
        e.preventDefault();

        try {
            // Assuming your server is running on the same host as your React app
            const response = await axios.put("http://localhost:3001/api/updateProduct", productDetails);
            const { success, productId } = response.data;

            if (success) {
                alert("Product Updated Successfully!");
                routeToComponent(e, "HomeSM");
            } else {
                alert("Failed to update product. Please try again.");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            alert("An error occurred while updating the product. Please try again.");
        }
    }

    return(
        <>
            <div className="Container">
            <Header1 />
            <div className='post'>
            <div style={{marginRight:"10px",marginLeft:"15px", important: "all" }}><a style={{fontSize: "24px"}}>Update Product</a>
            <form onSubmit={updateProduct}>
            <div className='form-group'><label><b>Select Product:</b></label><select className='form-control' name='pId' value={productDetails.pId} onChange={handleChange}> {allProducts.map((product) => (
                  <option key={product.prod_name} value={product.prod_name}>{product.prod_name}</option>
                ))}</select></div>
            <div className='form-group'><label><b>Product Name:</b></label><input type='text' className='form-control' name='pname' placeholder='Enter Product Name'  value={productDetails.pname} onChange={handleChange}/></div>
            <div className='form-group'><label><b>Product Description:</b></label><br/><textarea className='form-control' placeholder='Enter Product Description' name='pdescription' value={productDetails.pdescription} onChange={handleChange}></textarea></div>
            <div className='form-group'><label><b>Product Discount:</b></label><br/><input className='form-control' type='text' placeholder='Enter Product Discount' name='pdiscount' value={productDetails.pdiscount} onChange={handleChange} /></div>
		    <div className='form-group'><label><b>Product Price:</b></label><input className='form-control' type='text' placeholder='Enter Product Price' name='pprice' value={productDetails.pprice} onChange={handleChange}/></div>
		    <div className='form-group'><label><b>Enter Product Image Name:</b></label><br/><input className='form-control' type='text'  placeholder='Enter Product Image Name(with Extension)' name='pimage'  value={productDetails.pimage} onChange={handleChange}/></div>
		    <div className='form-group'><label><b>Product Condition:</b></label><br/><input className='form-control' type='text' placeholder='Enter Product Condition' name='pcondition' value={productDetails.pcondition} onChange={handleChange} /></div>
		    <div className='form-group'><label><b>Product Company:</b></label><br/><input className='form-control' type='text' placeholder='Enter Product Company' name='pcompany' value={productDetails.pcompany} onChange={handleChange} /></div>
            <div className='form-group'><label><b>Product Quantity</b></label><br/><textarea style={{width:'100%'}} type='number' placeholder='Enter Product Quantity' name='pquantity' value={productDetails.pquantity} onChange={handleChange} ></textarea><br/><br/></div>
            <div className='form-group'><label><b>Is there any rebate on the product?</b></label><br/><select name='pRebate' value={productDetails.pRebate} onChange={handleChange}><option value='1' selected>Yes</option><option value='0'>No</option></select><br/><br/></div>
            <div className='form-group'><label><b>Is there any sale on the product?</b></label><br/><select name='pSale' value={productDetails.pSale} onChange={handleChange}><option value='1' selected>Yes</option><option value='0'>No</option></select><br/><br/></div>
		    <div className='form-group'><label><b>Select Category:</b></label><br/><select className='form-control' name='pcategory' value={productDetails.pCategory} onChange={handleChange}><option value='Doorbells' selected>Smart Door Bells</option><option value='Doorlocks'>Smart Door Locks</option><option value='Dpeakers'>Smart Speakers</option><option value='Lightings'>Smart Lightings</option><option value='Thermostats'>Smart Thermostats</option></select></div>
            <br/> <br/> <input type='submit' name='Add Product' className='btn btn-primary btn-lg' style={{width : '90%' }} value='Update Product'></input>
		    </form></div>
		    </div>
            </div>
        </>
    );
}