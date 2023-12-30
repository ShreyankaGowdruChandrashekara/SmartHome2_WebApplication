import Header from "./Header"
import LeftNavigationBar from "./LeftNavigationBar"
import './style.css';
import Content from "./Content";
import { useUser } from './UserContext';

export default function Home(){
    const {user} = useUser();
    const { username, usertype } = user || {};

    return(
        <>
        <div className="Container">
        <Header />
        <LeftNavigationBar />
        <Content />
        </div>
        </>
    );
}