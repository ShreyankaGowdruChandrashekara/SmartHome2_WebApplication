import './style.css';
import Header1 from './Header1';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useState,useEffect } from "react";

export default function ProductDeletePage(){
    const history = useHistory();
    const [selectedProduct, setSelectedProduct] = useState('ringwired');
    const [allProducts, setAllProducts] = useState([]);


    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
    };

    useEffect(() => {
        // Fetch all products from the server
        fetchAllProducts();
      }, []);
    
      const fetchAllProducts = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/allproducts');
          setAllProducts(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

    const handleDeleteProduct = async () => {
        try {
        // Make a request to delete the selected product
        const response = await axios.delete('http://localhost:3001/api/deleteProduct', {
            params: { productName: selectedProduct }
        });

        } catch (error) {
        console.error('Error deleting product:', error);
        // Handle the error (show an error message, etc.)
        }
    };

    function routeToComponent(e, routePath){

        e.preventDefault();
        history.push(routePath);
    }

    return(
        <>
            <div className="Container">
            <Header1 />
            <div className='post'>
            <div style={{marginRight:"10px",marginLeft:"15px", important: "all" }}><a style={{fontSize: "24px"}}>Delete Product</a>
            <form>
            <div className='form-group'><label>Select Product:</label><select className='form-control' name='pId' value={selectedProduct} onChange={handleProductChange}>
            <option value="">Select a product</option>
                  {allProducts.map((product) => (
                    <option key={product.prod_name} value={product.prod_name}>
                      {product.prod_name}
                    </option>
                  ))}
                  </select></div>
            </form></div>
		    <button  data-toggle='modal' data-target='#myModal2' className='btn btn-primary' onClick={handleDeleteProduct}>Delete Product</button></div>
		    <div id='myModal2' className='modal fade' role='dialog'><div className='modal-dialog'><div className='modal-content'><div className='modal-header'> <button type='button' className='close' data-dismiss='modal'>&times;</button> <h4 className='modal-title'>Product Status</h4> </div>
		    <div className='modal-body'><p>Product Deleted Successfully!.</p></div><div className='modal-footer'><button type='button' className='btn btn-default' data-dismiss='modal' onClick={(e)=>(routeToComponent(e,"HomeSM"))}>Close</button></div></div></div></div>
            </div>
        </>
    );
}