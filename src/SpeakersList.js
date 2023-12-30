import Header from "./Header";
import LeftNavigationBar from "./LeftNavigationBar";
import './style.css';
import Product from "./Product";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function SpeakersList({addItem, details}){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const CategoryName = queryParams.get("maker");
    const [speakersProducts, setSpeakersProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:3001/api/getAllProducts",{
            params: { category: "Speakers" },
            });
            // Assuming the API response returns an array of products
            const products = response.data;
            console.log(products)
            setSpeakersProducts(products);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, [CategoryName]);

    function renderContent(){
        const productsByMaker = CategoryName
            ? speakersProducts.filter(
                (product) =>
                product.prod_Retailer.toLowerCase() === CategoryName.toLowerCase()
            )
            : speakersProducts;

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
                    Type="Speakers"
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
		            <a style={{fontSize: "24px"}}>Speakers</a>
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