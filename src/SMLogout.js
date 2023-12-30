import './style.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useUser } from './UserContext';
import {useEffect} from 'react';

export default function SMLogout(){
    const history = useHistory()
    const { logoutUser } = useUser();

    useEffect(() => {
        // Call logoutUser to set user to null
        logoutUser();
    
        // Redirect to the home page
        history.push('/Home');
      }, [history, logoutUser]);

    return(
        <>

        </>
    );
}