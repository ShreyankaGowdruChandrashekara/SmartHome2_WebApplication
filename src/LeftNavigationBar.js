import './style.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LeftNavigationBar() {
    
	const history = useHistory();

		function routeToComponent(e, routePath){

			e.preventDefault();
			history.push(routePath);
		}		
		
		
		return(
        <div>
        <div id="sidebar" >
	<ul>
		<li>
			<h2>Smart Doorbells</h2>
			<ul>
				<li id="first"><a href="DoorBellsList?maker=Amazon" onClick={(e)=>(routeToComponent(e,"DoorBellsList?maker=Amazon")) }>Amazon </a></li>
				<li><a href="DoorBellsList?maker=Google" onClick={(e)=>(routeToComponent(e,"DoorBellsList?maker=Google")) }>Google </a></li>
				<li><a href="DoorBellsList?maker=Arlo" onClick={(e)=>(routeToComponent(e,"DoorBellsList?maker=google")) }>Arlo </a></li>
				<li><a href="DoorBellsList?maker=Anker Innovations" onClick={(e)=>(routeToComponent(e,"DoorBellsList?maker=Anker Innovations")) }>Anker Innovations</a></li>
				<li><a href="DoorBellsList?maker=Simpli Safe" onClick={(e)=>(routeToComponent(e,"DoorBellsList?maker=Simpli Safe")) }>Simpli Safe</a></li>
			</ul>
		</li>
		<li>
			<h2>Smart Doorlocks</h2>
			<ul>
				<li id="first"><a href="DoorLocksList?maker=Assa Abloy" onClick={(e)=>(routeToComponent(e,"DoorLocksList?maker=Assa Abloy")) }>Assa Abloy</a></li>
				<li><a href="DoorLocksList?maker=Allegion" onClick={(e)=>(routeToComponent(e,"DoorLocksList?maker=Allegion")) }>Allegion</a></li>
				<li><a href="DoorLocksList?maker=Spectrum Brands" onClick={(e)=>(routeToComponent(e,"DoorLocksList?maker=Spectrum Brands")) }>Spectrum Brands</a></li>
				<li><a href="DoorLocksList?maker=PIN Genie" onClick={(e)=>(routeToComponent(e,"DoorLocksList?maker=PIN Genie")) }>PIN Genie</a></li>
			</ul>
		</li>
		<li>
			<h2>Smart Lightings</h2>
			<ul>
				<li id="first"><a href="LightingsList?maker=Philips" onClick={(e)=>(routeToComponent(e,"LightingsList?maker=Philips")) }>Philips</a></li>
				<li><a href="LightingsList?maker=LIFX" onClick={(e)=>(routeToComponent(e,"LightingsList?maker=LIFX")) }>LIFX</a></li>
				<li><a href="LightingsList?maker=Nanoleaf" onClick={(e)=>(routeToComponent(e,"LightingsList?maker=Nanoleaf")) }>Nanoleaf</a></li>
				<li><a href="LightingsList?maker=Sengled" onClick={(e)=>(routeToComponent(e,"LightingsList?maker=Sengled")) }>Sengled</a></li>
			</ul>
		</li>
		
		<li>
			<h2>Smart Speakers</h2>
			<ul>
				<li id="first"><a href="SpeakersList?maker=Amazon" onClick={(e)=>(routeToComponent(e,"SpeakersList?maker=Amazon")) }>Amazon</a></li>
				<li><a href="SpeakersList?maker=Google" onClick={(e)=>(routeToComponent(e,"SpeakersList?maker=Google")) }>Google</a></li>
				<li><a href="SpeakersList?maker=Apple" onClick={(e)=>(routeToComponent(e,"SpeakersList?maker=Apple")) }>Apple</a></li>
				<li><a href="SpeakersList?maker=Bose" onClick={(e)=>(routeToComponent(e,"SpeakersList?maker=Bose")) }>Bose</a></li>
			</ul>
		</li>
		
		<li>
			<h2>Smart Thermostats</h2>
			<ul>
				<li id="first"><a href="ThermostatsList?maker=Nest Labs" onClick={(e)=>(routeToComponent(e,"ThermostatsList?maker=Nest Labs")) }>Nest Labs</a></li>
				<li><a href="ThermostatsList?maker=Ecobee" onClick={(e)=>(routeToComponent(e,"ThermostatsList?maker=Ecobee")) }>Ecobee</a></li>
				<li><a href="ThermostatsList?maker=Honeywell International" onClick={(e)=>(routeToComponent(e,"ThermostatsList?maker=Honeywell International")) }>Honeywell International</a></li>
				<li><a href="ThermostatsList?maker=Emerson Electric" onClick={(e)=>(routeToComponent(e,"ThermostatsList?maker=Emerson Electric")) }>Emerson Electric</a></li>
			</ul>
		</li>
		<li>
			<h2>Accessories</h2>
			<ul>
				<li id="first"><a href="AccessoryList?maker=doorbells" onClick={(e)=>(routeToComponent(e,"AccessoryList?maker=doorbells")) }>Doorbells</a></li>
				<li><a href="AccessoryList?maker=speakers" onClick={(e)=>(routeToComponent(e,"AccessoryList?maker=speakers")) }>Speakers</a></li>
				<li><a href="AccessoryList?maker=lightings" onClick={(e)=>(routeToComponent(e,"AccessoryList?maker=lightings")) }>Lightings</a></li>
			</ul>
		</li>
	</ul>
</div>
    </div>    
    );
}
export default LeftNavigationBar;