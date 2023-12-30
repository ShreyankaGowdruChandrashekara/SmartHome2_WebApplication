import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useUser } from './UserContext';

import './style.css';
export default function Header1(){

	const history = useHistory();

	function routeToComponent(e, routePath){

		e.preventDefault();
		history.push(routePath);
	}

	const {user} = useUser();
    const { username, usertype } = user || {};

    return(
        <>
		{/* The name of the company goes here  */}
			
		<br/>
			<h1 style={{textAlign:"center",alignItems:"center",alignSelf:"center"}}><span></span><span style={{color:'brown'}}>SMART HOME APPLIANCES</span></h1><br/>

		{/* the navigation bar starts here, the remaining items are added according to the session value from utilites servlet  */}

        <nav className="navbar navbar-default">
			<div className="container-fluid" id="menu">
				<ul className="nav navbar-nav">
					<li><a href="Home"  onClick={(e)=>(routeToComponent(e,"Home")) } className="first"><span className="glyphicon glyphicon-home">Home</span></a></li>
					<li><a target="DoorBellsList" href="DoorBellsList" onClick={(e)=>(routeToComponent(e,"DoorBellsList")) }><span className="glyphicon">Smart-Doorbells</span></a></li>
					<li><a href="DoorLocksList" onClick={(e)=>(routeToComponent(e,"DoorLocksList")) }><span className="glyphicon">Smart-Doorlocks </span></a></li>
					<li><a href="SpeakersList" onClick={(e)=>(routeToComponent(e,"SpeakersList")) }><span className="glyphicon">Smart-Speakers</span></a></li>
					<li><a href="LightingsList" onClick={(e)=>(routeToComponent(e,"LightingsList")) }><span className="glyphicon">Smart-Lightings</span></a></li>
					<li><a href="ThermostatsList" onClick={(e)=>(routeToComponent(e,"ThermostatsList")) }><span className="glyphicon">Smart-Thermostats</span></a></li>
					<li><a href="AccessoryList?maker=all" onClick={(e)=>(routeToComponent(e,"AccessoryList?maker=all"))} ><span className="glyphicon">Accessory </span></a></li>
				</ul>
			</div>
            <div style={{float: 'right'}} >
                <ul className='nav navbar-nav'>
                    <li className="start selected"><a href="HomeSM">Home</a></li>
                    <li><a href="AddProductPage" onClick={(e)=>(routeToComponent(e,"AddProductPage"))}>Add Product</a></li>
                    <li><a href="ProductUpdatePage" onClick={(e)=>(routeToComponent(e,"ProductUpdatePage"))}>Update Product</a></li>
                    <li><a href="ProductDeletePage" onClick={(e)=>(routeToComponent(e,"ProductDeletePage"))}>Delete Product</a></li>
                    <li><a href="SMLogout" onClick={(e)=>(routeToComponent(e,"SMLogout"))}>Sign Out</a></li>
                </ul>
            </div>
        </nav>
    

        </>
    );
}