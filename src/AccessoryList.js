import Header from "./Header";
import LeftNavigationBar from "./LeftNavigationBar";
import './style.css';
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useCart } from "./CartContext";

export default function AccessoryList(){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const { items, count, updateCount } = useCart();

    const CategoryName = queryParams.get("maker");
    function renderContent(){
        if(CategoryName === "doorbells")
        {
            return(
                <>
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
                    </div></form></li></ul></div> </td>
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
                    </div>
                    </form>
                    </li>
                    </ul></div>
                    </td></tr></table>
                </>
            );
        }
        else if(CategoryName === "speakers")
        {
            return(
                <>
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
                    </div></form></li></ul></div> </td>
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
                    </div>
                    </form>
                    </li>
                    </ul></div>
                    </td></tr></table>
                </>
            );
        }
        else if(CategoryName === "lightings")
        {
            return(
                <>
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
                    </div></form></li></ul></div> </td>
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
                    </div>
                    </form>
                    </li>
                    </ul></div>
                    </td></tr></table>
                </>
            );
        }
        else if(CategoryName === "all")
        {
            return(
                <>
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
                    </div></form></li></ul></div> </td>
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
                    </div>
                    </form>
                    </li>
                    </ul></div>
                    </td></tr></table>

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
                    </div></form></li></ul></div> </td>
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
                    </div>
                    </form>
                    </li>
                    </ul></div>
                    </td></tr></table>

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
                    </div></form></li></ul></div> </td>
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
                    </div>
                    </form>
                    </li>
                    </ul></div>
                    </td></tr></table>
                </>
            );
        }
    }
    return(
        <>
        <div className="Container">
            <Header />
            <LeftNavigationBar />
            <div id='content'>
                <div className='post'>
                    <h2 className='title meta'>
		                <a style={{fontSize: "24px"}}>Accessories</a>
                    </h2>
                    <div className='entry'>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}