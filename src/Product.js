import './style.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useCart } from "./CartContext";

export default function Product(product){

		const history = useHistory()
		// details
		const { items, count, updateCount } = useCart();
    return (
        <>
			<h3>{product.Name}</h3>
			<strong>${product.Price}</strong>
			<ul>
                <li id='item'><img src={'images/' + product.Type + '/' + product.Image} alt='' /></li>
                <li>
                    <form onSubmit={(e)=>{
											
											
											const item = {'name':product.Name,'price':product.Price,'category':product.Type};
											product.addItem(item);
											e.preventDefault();
											updateCount(count+1)
											history.push('Cart');


										}}>
                        <input type='hidden' name='name' value={product.Name}/>
					    <input type='hidden' name='type' value={product.Type}/>
					    <input type='hidden' name='maker' value='"+CategoryName+"'/>
					    <input type='hidden' name='access' value=''/>
					    <div className='btn-group'>
					        <input type='submit' className='btn btn-success' value='Buy Now'/>
					    </div>
                    </form>
                </li>
                <li>
                    <form onSubmit={(e)=>{
											
											
											
											product.details(product);
											console.log("details called");
											e.preventDefault();
											history.push('Details');


										}}>
					    <input type='hidden' name='name' value={product.Name}/>
					    <input type='hidden' name='id' value=''/>
					    <input type='hidden' name='type' value={product.Type} />
					    <input type='hidden' name='maker' value={product.Maker}/>
					    <input type='hidden' name='price' value={product.Price}/>
					    <input type='hidden' name='imgAdd' value={product.Image}/>
					    <input type='hidden' name='des' value={product.Desc}/>
					    <input type='hidden' name='access' value=''/>
					    <div className ='btn-group'>
						    <input type='submit' className='btn btn-default' value='View Product'/>
					    </div>
					</form>
                </li>
				<li>
					<form onSubmit={(e)=>{
									e.preventDefault();
									const productData = {
										name: product.Name,
										id: product.Id, // Include other properties as needed
										category: product.Type,
										price: product.Price,
										img: product.Image,
										desc: product.Desc,
										maker: product.Maker,
										access: "",
									  };
									history.push({pathname:'ReviewForms',state:{ productData },});
					}}>
						<input type='hidden' name='name' value={product.Name}/>
						<input type='hidden' name='id' value={product.Id}/>
						<input type='hidden' name='category' value={product.Type}/>
						<input type='hidden' name='price' value={product.Price}/>
						<input type='hidden' name='img' value={product.Image}/>
						<input type='hidden' name='desc' value={product.Desc}/>
						<input type='hidden' name='maker' value={product.Maker}/>
						<input type='hidden' name='access' value=''/>
						<input type='submit' className='btn btn-warning' value='Review Product'/>
					</form>
				</li>
				<li>
					<form onSubmit={(e)=>{
									e.preventDefault();
									console.log(product.Name)
									history.push({pathname:'DisplayReviews', state: { name: product.Name },});
					}}>
					<input type='hidden' name='name' value={product.Name}/>
					<input type='hidden' name='id' value={product.Id}/>
					<input type='hidden' name='category' value={product.Type}/>
					<input type='hidden' name='price' value={product.Price}/>
					<input type='hidden' name='img' value={product.Image}/>
					<input type='hidden' name='desc' value={product.Desc}/>
					<input type='hidden' name='maker' value={product.Maker}/>
					<input type='hidden' name='access' value=''/>
					<input type='submit' className='btn btn-default' value='View Product Reviews'/></form></li>
            </ul>
        </>
    );
}