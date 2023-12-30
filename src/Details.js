import Header from "./Header";
import LeftNavigationBar from "./LeftNavigationBar";
import { useLocation } from 'react-router-dom';

	export default function Details(item){

	const location = useLocation();
    const { item_p } = location.state;
    console.log(item_p)

	let detailsItem = item.item
	
	if(detailsItem.length == 0)
	{
		detailsItem = item_p
	}

  return (
    <>
    <div className="Container">
        <Header />
        <LeftNavigationBar />
        
        <div id='content'><div className='post'><h2 className='title meta'>
        <a style={{fontSize: "24px"}}>{detailsItem.Name}</a></h2>
        <div className='productContainer'><img src = {'images/' + detailsItem.Type + '/' + detailsItem.Image} alt =''  style ={{maxWidth: "200px", maxHeight: "170px", width:"200px", height:"170px"}}/><h2>
        {detailsItem.Desc}</h2> <h2> Price - ${detailsItem.Price} </h2></div>

        {console.log(detailsItem.Type)}
        <br></br>
        <br/>
        <br/>
        {detailsItem.Type === "Doorbells" && (
            <>
			  <h2>Accessory for Door Bells</h2>
			  <table><tr><td><div id='shop_item'>
			  <h3> Wedge Mount </h3>
			  <strong>$ 7.99 </strong><ul>
			  <li id='item'><img src='images/accessories/wedge_mount.jpg' alt='' /></li>
			
			 <li><form method='post' action='Cart'>
					<input type='hidden' name='name' value='wedgemount'/>
					<input type='hidden' name='type' value='accessories'/>
					<input type='hidden' name='maker' value='blink'/>
					<input type='hidden' name='access' value=''/>
					<div className='btn-group'>
					<input type='submit' className='btn btn-success' value='Buy Now'/>
					</div></form></li></ul></div></td>

			 <td><div id='shop_item'>
			 <h3> Rain Cover </h3>
			 <strong>$ 23.86 </strong><ul>
			 <li id='item'><img src='images/accessories/rain_cover.jpg' alt='' /></li>
			
			 <li><form method='post' action='Cart'>
				<input type='hidden' name='name' value='raincover'/>
				<input type='hidden' name='type' value='accessories'/>
				<input type='hidden' name='maker' value='HomeAll'/>
				<input type='hidden' name='access' value=''/>
				<div className='btn-group'>
				<input type='submit' className='btn btn-success' value='Buy Now'/>
				</div></form></li></ul></div></td></tr></table>
     </>
		)}
		{detailsItem.Type === "Speakers" && (
            <>

			<h2>Accessory for Speakers</h2>
			<table><tr><td><div id='shop_item'>
			<h3> Holder </h3>
			<strong>$ 12.59 </strong><ul>
			<li id='item'><img src='images/accessories/holder.jpg' alt='' /></li>
			
			<li><form method='post' action='Cart'>
			<input type='hidden' name='name' value='holder'/>
			<input type='hidden' name='type' value='accessories'/>
			<input type='hidden' name='maker' value='holder'/>
			<input type='hidden' name='access' value=''/>
			<div className='btn-group'>
			<input type='submit' className='btn btn-success' value='Buy Now'/>
			</div></form></li></ul></div></td>

			<td><div id='shop_item'>
			<h3> Mount It </h3>
			<strong>$ 16.99 </strong><ul>
			<li id='item'><img src='images/accessories/mountit.jpg' alt='' /></li>
			
			<li><form method='post' action='Cart'>
					<input type='hidden' name='name' value='mountit'/>
					<input type='hidden' name='type' value='accessories'/>
					<input type='hidden' name='maker' value='mountit'/>
					<input type='hidden' name='access' value=''/>
					<div className='btn-group'>
					<input type='submit' className='btn btn-success' value='Buy Now'/>
					</div></form></li></ul></div></td></tr></table>
          </>
		)}
		{detailsItem.Type === "Lightings" && (
		<>

			<h2>Accessory for Lightings</h2>
			<table><tr><td><div id='shop_item'>
			<h3> Wall Switch Module </h3>
			<strong>$ 44.99 </strong><ul>
			<li id='item'><img src='images/accessories/philips_2.jpg' alt='' /></li>
			
			<li><form method='post' action='Cart'>
			<input type='hidden' name='name' value='switchmodule'/>
			<input type='hidden' name='type' value='accessories'/>
			<input type='hidden' name='maker' value='philips'/>
			<input type='hidden' name='access' value=''/>
					<div className='btn-group'>
					<input type='submit' className='btn btn-success' value='Buy Now'/>
					</div></form></li></ul></div></td>

			<td><div id='shop_item'>
			<h3> Tap Dial Switch </h3>
			<strong>$ 49.99 </strong><ul>
			<li id='item'><img src='images/accessories/philips_3.jpg' alt='' /></li>
			
			<li><form method='post' action='Cart'>
					<input type='hidden' name='name' value='tapdialswitch'/>
					<input type='hidden' name='type' value='accessories'/>
					<input type='hidden' name='maker' value='philips'/>
					<input type='hidden' name='access' value=''/>
					<div className='btn-group'>
					<input type='submit' className='btn btn-success' value='Buy Now'/>
					</div></form></li></ul></div></td></tr></table>
          </>
		)}
    </div></div>
      </div>
    </>
  );
}