import './style.css';
import Header from './Header';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import {React, useState, useEffect} from 'react';
import axios from 'axios';

export default function Registration(){
    const { register,control, handleSubmit, setError,setValue, formState: { errors } } = useForm();
    const history = useHistory();
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    useEffect(() => {
        // Set the default value for usertype when the component mounts
        setValue('usertype', 'customer');

        setValue('usertype', 'customer');
  }, [setValue]);

    const handleRegistration = async (data) => {
        if (data.password !== data.repassword) {
            setError('repassword', { type: 'manual', message: "Passwords don't match" });
          } else {
            // You can send the form data to your server for registration and data storage here
            console.log('Form submitted', data);
            try{
                const response = await axios.post('http://localhost:3001/api/checkUsername', {
                username: data.username,
            });
            if (response.data.exists) {
                setError('username', { type: 'manual', message: "Username already exists" });
            } else {
                // If the username doesn't exist, add it as a new record
                await axios.post('http://localhost:3001/api/addUser', {
                    username: data.username,
                    password: data.password,
                    usertype: data.usertype,
                    address: data.address,
                    city: data.city,
                    custName: data.name,
                    state: data.state,
                    zip: data.zip,
                });
            }
                  // Set registration success to true
                    setRegistrationSuccess(true);
                // Redirect to login or account page
                history.push(`/login?success=true&usertype=${data.usertype}`); // Change '/Login' to the appropriate route
            }
        catch (error) {
            console.error('Error checking username:', error.message);
            setError('username', { type: 'manual', message: "Error checking username" });
        }
      
          }
      }
      const handleError = (errors) => {};

    const registerOptions = {
        name : {required : "Name cannot be blank"},
        username : {required : "Username cannot be blank"},
        password : { required : "Password cannot be blank" },
        repassword : {required : "Password cannot be blank"},
        address : {required : "Address cannot be blank"},
        city : {required : "City cannot be blank"},
        state : {required : "state cannot be blank"},
        zip : {required : "Zip cannot be blank"},
    };  
    return(
        <>
             <div className="Container">
                <Header />
                <div className='post' style={{float: "none", width: "100%"}}>
                <h2 className='title meta'><a style={{fontSize: "24px"}}>Registration</a></h2>
                <div className='entry'>
                <div style={{width:"400px", margin:"25px", marginLeft: "auto",marginRight: "auto"}}>
                <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                    <table style={{width:'100%'}}><tr><td>
                    <h3>Name</h3></td><td><Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                        <>
                        <input type='text' name='name' className='input' {...register("name",registerOptions.name)} {...field} ></input>
                    <small style={{color:"red"}}>{errors?.username && errors.username.message}</small>
                    </>
                    )} />
                    </td></tr><tr><td>
                    <h3>Username</h3></td><td><Controller
                    name='username'
                    control={control}
                    render={({ field }) => (
                        <>
                        <input type='text' name='username' className='input' {...register("username",registerOptions.username)} {...field} ></input>
                    <small style={{color:"red"}}>{errors?.username && errors.username.message}</small>
                    </>
                    )} />
                    
                    </td></tr><tr><td>
                    <h3>Password</h3></td><td><Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                    <>
                    <input type='password' name='password' className='input' {...register("password",registerOptions.password)} {...field}></input>
                    <small style={{color:"red"}}>{errors?.password && errors.password.message}</small>
                    </>
                    )}
                  />
                    </td></tr><tr><td>
                    <h3>Re-Password</h3></td><td><Controller
                    name='repassword'
                    control={control}
                    render={({ field }) => (
                    <>
                    <input type='password' name='repassword' className='input' {...register("repassword",registerOptions.repassword)} {...field}></input>
                    <small style={{color:"red"}}>{errors?.repassword     && errors.repassword.message}</small>
                    </>
                    )}
                    />
                    </td></tr><tr><td>
                    <h3>User Type</h3></td><td><Controller
                        name="usertype"
                        control={control}
                        render={({ field }) => (<select name='usertype' className='input' {...field}><option value='customer'>Customer</option><option value='storeManager'>Store Manager</option><option value='salesManager'>salesManager</option></select>
                        )}
                        />
                        </td></tr><tr><td>
                    <h3>Street Address</h3></td><td><Controller
                    name='address'
                    control={control}
                    render={({ field }) => (
                        <>
                        <input type='text' name='address' className='input' {...register("address",registerOptions.address)} {...field} ></input>
                        <small style={{color:"red"}}>{errors?.address && errors.address.message}</small>
                        </>
                    )} />
                    </td></tr><tr><td>
                    <h3>City</h3></td><td><Controller
                    name='city'
                    control={control}
                    render={({ field }) => (
                        <>
                        <input type='text' name='city' className='input' {...register("city",registerOptions.city)} {...field} ></input>
                        <small style={{color:"red"}}>{errors?.city && errors.city.message}</small>
                        </>
                    )} />
                    </td></tr><tr><td>
                    <h3>State</h3></td><td><Controller
                    name='state'
                    control={control}
                    render={({ field }) => (
                        <>
                        <input type='text' name='state' className='input' {...register("state",registerOptions.state)} {...field} ></input>
                        <small style={{color:"red"}}>{errors?.state && errors.state.message}</small>
                        </>
                    )} />
                    </td></tr><tr><td>
                    <h3>Zip code</h3></td><td><Controller
                    name='zip'
                    control={control}
                    render={({ field }) => (
                        <>
                        <input type='text' name='zip' className='input' {...register("zip",registerOptions.zip)} {...field} ></input>
                        <small style={{color:"red"}}>{errors?.zip && errors.zip.message}</small>
                        </>
                    )} />
                    </td></tr><tr><td>
                    <input type='submit' className='btnbuy' name='ByUser' value='Create User' style={{float: "right",height: "20px", margin: "20px", marginRight: "10px"}}></input>
                    </td></tr>
                    </table>
                </form>
                
                </div></div></div>
            </div>
        </>
    );
}