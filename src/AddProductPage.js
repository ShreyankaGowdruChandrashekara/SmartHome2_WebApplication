import './style.css';
import Header1 from './Header1';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from 'react';
import axios from 'axios';

export default function AddProductPage(){
    const history = useHistory();

    const [formData, setFormData] = useState({
    pname: '',
    pdescription: '',
    pdiscount: '',
    pprice: '',
    pimage: '',
    pcondition: '',
    pcompany: '',
    pRebate: '1', // Default to 'Yes'
    pSale: '1', // Default to 'Yes'
    pcategory: 'doorbells', // Default category
    });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    };

    // function routeToComponent(e, routePath){

    //     e.preventDefault();
    //     history.push(routePath);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Send a POST request to your server to insert the product into the database
          const response = await axios.post('http://localhost:3001/api/addProduct', formData);
          console.log(response.data); // Log the response from the server
    
          // Display an alert indicating that the product has been added
          alert('Product added successfully!');
    
          // Redirect to the specified route
          history.push('HomeSM');
        } catch (error) {
          console.error('Error adding product:', error.message);
          // Handle error accordingly (e.g., display an error message)
        }
      };

    return(
        <>
            <div className="Container">
            <Header1 />
            <div className='post'>
            <div style={{marginRight:"10px",marginLeft:"15px", important: "all" }}><a style={{fontSize: "24px"}}>Add Product</a>
            <form onSubmit={handleSubmit}>
            <div className='form-group'><label><b>Product Name:</b></label><input type='text' className='form-control' name='pname' placeholder='Enter Product Name'  value={formData.pname} onChange={handleChange}/></div>
            <div className='form-group'><label><b>Product Description:</b></label><br/><textarea className='form-control' placeholder='Enter Product Description' name='pdescription' value={formData.pdescription} onChange={handleChange}></textarea></div>
            <div className='form-group'><label><b>Product Discount:</b></label><br/><input className='form-control' type='text' placeholder='Enter Product Discount' name='pdiscount' value={formData.pdiscount} onChange={handleChange} /></div>
            <div className='form-group'><label><b>Product Price:</b></label><input className='form-control' type='text' placeholder='Enter Product Price' name='pprice' value={formData.pprice} onChange={handleChange} /></div>
            <div className='form-group'><label><b>Enter Product Image Name:</b></label><br/><input className='form-control' type='text'  placeholder='Enter Product Image Name(with Extension)' name='pimage' value={formData.pimage} onChange={handleChange} /></div>
            <div className='form-group'><label><b>Product Condition:</b></label><br/><input className='form-control' type='text' placeholder='Enter Product Condition' name='pcondition' value={formData.pcondition} onChange={handleChange}/></div>
            <div className='form-group'><label><b>Product Company:</b></label><br/><input className='form-control' type='text' placeholder='Enter Product Company' name='pcompany' value={formData.pcompany} onChange={handleChange}/></div>
            <div className='form-group'><label><b>Is there any rebate on the product?</b></label><br/><select name='pRebate' value={formData.pRebate} onChange={handleChange}><option value='1' selected>Yes</option><option value='0'>No</option></select><br/><br/></div>
            <div className='form-group'><label><b>Is there any sale on the product?</b></label><br/><select name='pSale' value={formData.pSale} onChange={handleChange}><option value='1' selected>Yes</option><option value='0'>No</option></select><br/><br/></div>
		        <div className='form-group'><label>Select Category:</label><br/><select className='form-control' name='pcategory' value={formData.pCategory} onChange={handleChange}><option value='Doorbells' selected>Smart Door Bells</option><option value='Doorlocks'>Smart Door Locks</option><option value='Dpeakers'>Smart Speakers</option><option value='Lightings'>Smart Lightings</option><option value='Thermostats'>Smart Thermostats</option></select></div>
            <br/> <br/> <input type='submit' name='Add Product' className='btn btn-primary btn-lg' style={{width : '90%' }} value='Add Product'></input>
		    </form></div>
            </div>
            </div>
        </>
    );
}