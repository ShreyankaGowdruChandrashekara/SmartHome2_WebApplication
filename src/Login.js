import './style.css';
import Header from './Header';
import { useForm, Controller } from 'react-hook-form';
import {React, useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useUser } from './UserContext';
import { useLocation } from "react-router-dom";
import axios from 'axios';

export default function Login() {

    const { register, handleSubmit, control, setValue,formState: {errors}} = useForm();
    const [error, setError] = useState('');
    const location = useLocation();
    const successParam = new URLSearchParams(location.search).get('success');
    const usertypeParam = new URLSearchParams(location.search).get('usertype');
    const [registrationSuccess, setRegistrationSuccess] = useState(successParam === 'true');
    const history = useHistory()
    const { loginUser } = useUser();

    useEffect(() => {
        // Set the default value for usertype when the component mounts
        setValue('usertype', 'customer');

        setValue('usertype', 'customer');
  }, [setValue]);

    

    const handleRegistration = (formData) => {
        console.log("Form submitted");
        console.log(formData);
        handleLogin(formData);
    }

    const handleLogin = async (formData) => {
        const { username, password, usertype } = formData;
    
        // // Check if the user exists in the JSON data
        // const user = userDetails.users.find(user => user.username === username);
        // console.log(user.password)
        // console.log(password)
        // console.log(user.usertype)
        // console.log(usertype)

        try {
          // Make a request to your server to check if the user exists in the database
          const response = await axios.post('http://localhost:3001/api/login', {
            username,
            password,
            usertype,
          });

          const { user } = response.data;
          
        // if (user && user.password === password && user.usertype === usertype) {
          if (user) {
          setError('');
          loginUser({ username: user.userName, usertype: user.userType });
          
          if(usertype === "customer")
          {
            history.push("home")
          }
          if(usertype === "storeManager")
          {
            history.push("homesm")
          }
          if(usertype === "salesManager")
          {
            history.push("homesam")
          }

        } else {
          // Simulate login failure
          setError('Invalid username, password, or user type.');
        }
      }catch (error) {
          console.error('Error logging in:', error.message);
          setError('An error occurred while logging in.');
        }
      };

    const handleError = (errors) => {};

    const registerOptions = {
        username : {required : "Username cannot be blank"},
        password : { required : "Password cannot be blank" },
    };  

    return (
        <>
        <div className="Container">
        <Header />
        <div className='post' style={{float: 'none', width: '100%'}}>
            <h2 className='title meta'><a style={{fontSize:'24px'}}>Login</a></h2>   
            <div className='entry'>
            <div style={{width:'400px', margin:'25px', marginLeft:'auto',marginRight: 'auto'}}>
            {registrationSuccess && (
          <p style={{ color: 'red',fontSize:"15px" }}>
            Your {usertypeParam} account has been created. Please login.
          </p>
        )}
        <form onSubmit={handleSubmit(handleRegistration, handleError)}>
			<table style={{width:'100%'}}>
                <tr><td>
				<h3>Username</h3></td><td><Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                            <>
                            <input type='text' name='username' className='input' {...register("username",registerOptions.username)} {...field} ></input>
                <small style={{color:"red"}}>{errors?.username && errors.username.message}</small></>)} />
				</td></tr><tr><td>
                <h3>Password</h3></td><td><Controller
                        name="password"
                        control={control}
                        render={({ field }) => ( <> <input type='password' name='password' className='input' {...register("password",registerOptions.password)} {...field}></input>
                <small style={{color:"red"}}>{errors?.password && errors.password.message}</small></>)} />
                </td></tr><tr><td>
                <h3>User Type</h3></td><td><Controller
                        name="usertype"
                        control={control}
                        render={({ field }) => (<select name='usertype' className='input' {...field} ><option value='customer'>Customer</option><option value='storeManager'>Store Manager</option><option value='salesManager'>salesManager</option></select>
                        )}
                        />
                </td></tr><tr><td></td><td>
                <input type='submit' className='btnbuy' value='Login' style={{float:'right',height:'20px', margin:'20px',marginRight:'10px'}}></input>
                </td></tr><tr><td></td><td>
                <strong><a className='' href='Registration' style={{float:'right',height:'20px' ,margin:'20px'}}>New User? Register here!</a></strong>
                </td></tr></table>    
                {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
        </div></div></div>
        </div>
        </>
    );
}