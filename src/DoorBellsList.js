import Header from "./Header";
import LeftNavigationBar from "./LeftNavigationBar";
import Product from "./Product";
import './style.css';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function DoorBellsList({addItem, details}){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const CategoryName = queryParams.get("maker");
    const [doorbellsProducts, setDoorbellsProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {

            const response = await axios.get("http://localhost:3001/api/getAllProducts",{
            params: { category: "Doorbells" },
            });
            // Assuming the API response returns an array of products
            const products = response.data;
            console.log(products)
            setDoorbellsProducts(products);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, [CategoryName]);

    function renderContent(){
        const productsByMaker = CategoryName
            ? doorbellsProducts.filter(
                (product) =>
                product.prod_Retailer.toLowerCase() === CategoryName.toLowerCase()
            )
            : doorbellsProducts;

        if (productsByMaker.length === 0) {
            return <p>No products found for {CategoryName}</p>;
        }

        // Render products in rows with three products per row
        const rows = [];
        for (let i = 0; i < productsByMaker.length; i += 3) {
            const row = productsByMaker.slice(i, i + 3).map((product) => (
            <td key={product.prod_id}>
            <div id='shop_item'>
            <Product
                Id={product.prod_id}
                Name={product.prod_name}
                Price={product.prod_price}
                Image={product.prod_img}
                Desc={product.prod_Description}
                Type="Doorbells"
                Maker={CategoryName}
                addItem={addItem}
                details = {details}
            />
            </div>
            </td>
        ));
        rows.push(<tr key={i}>{row}</tr>);
        }

        return rows;
    }
    return(
        <>
        <div className="Container">
        <Header />
        <LeftNavigationBar />
        <div id='content'>
            <div className='post'>
                <h2 className='title meta'>
		            <a style={{fontSize: "24px"}}>Door Bells</a>
                </h2>
                <div className='entry'>
                <table id='bestseller'>
                    <tbody>{renderContent()}</tbody>
                </table>
               </div>
            </div>
        </div>
        </div>
        </>
    );
}