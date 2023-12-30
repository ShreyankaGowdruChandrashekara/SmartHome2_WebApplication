import './style.css';
export default function Content() {
    return(
        <><br/><br/><h1 style={{color: 'brown'}}>Welcome to Smart Homes</h1><br/>
		<h3 style={{color: 'brown'}}>
		  Discover unbeatable deals on a wide range of Smart Home appliances. Explore our everyday low prices and choose from
		  convenient delivery or pickup options at your nearest store.
		</h3><br/><br/><br/>
    <div id="content">
	
	<div id="carouselExampleInterval" className="carousel slide" data-ride="carousel">
		<ol className="carousel-indicators">
			<li data-target="#carouselExampleInterval" data-slide-to="0" className="active"></li>
			<li data-target="#carouselExampleInterval" data-slide-to="1"></li>
			<li data-target="#carouselExampleInterval" data-slide-to="2"></li>
		</ol>

		<div className="carousel-inner">
			<div className="item active" >
				<img src="images/site/flash-sale.jpg" style={{width: "auto",
				height: "450px",
				maxHeight: "450px",
				margin: "auto", 
				display: "block"}} alt="..."/>
			</div>
			<div className="item" >
				<img src="images/site/home1.jpg" style={{width: "auto",
				height: "450px",
				maxHeight: "450px",
				margin: "auto", 
				display: "block"}} alt="..."/>
			</div>
			<div className="item"  >
				<img src="images/site/home2.jpg" style={{width: "auto",
				height: "450px",
				maxHeight: "450px",
				margin: "auto", 
				display: "block"}} alt="..."/>
			</div>
		</div>

		<a className="left carousel-control" href="#carouselExampleInterval" role="button" data-slide="prev">
			<span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
			<span className="sr-only">Previous</span>
		</a>
		<a className="right carousel-control" href="#carouselExampleInterval" role="button" data-slide="next">
			<span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
			<span className="sr-only">Next</span>
		</a>
	</div>

</div>

        </>
    );
}