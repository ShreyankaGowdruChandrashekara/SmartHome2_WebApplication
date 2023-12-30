import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './style.css';

export default function Header2(){

		const history = useHistory();

		function routeToComponent(e, routePath){

			e.preventDefault();
			history.push(routePath);
		}

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
                    <li><a href="OrderUpdatePage" onClick={(e)=>(routeToComponent(e,"OrderUpdatePage"))}>Manage Customer Orders</a></li>
                    <li><a href="NewCustomerPage" onClick={(e)=>(routeToComponent(e,"NewCustomerPage"))}>Add Customer Accounts</a></li>
                    <li><a href="SAMLogout" onClick={(e)=>(routeToComponent(e,"SAMLogout"))}>SignOut</a></li>  
                </ul>
            </div>
        </nav>
    

        </>
    );
}