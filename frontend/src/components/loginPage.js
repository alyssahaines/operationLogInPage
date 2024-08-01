import {useNavigate,Link} from 'react-router-dom';
import React, {useState} from 'react';
import axios from 'axios';

const Login = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const history = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    const loginInfo = {username, password};
    try {
   const response = await axios.post('api/login',loginInfo);
   if (response.ok) {
    const token = response.data;
    localStorage.setItem('token',token);
    setUsername('');
    setPassword('');
    history.push('/dashboard');
   }
    }
    catch (error) {
        console.log({message: error.message});
    }
    
};


return(
<div>
<h1> Login Page </h1>
<form onSubmit = {handleSubmit}> 
<input
type = "username"
value = {username}
onChange = {(e) => setUsername(e.target.value) }
placeholder = "Username"
required
/>
<input
type = "password"
value = {password}
onChange = {(e) => setPassword(e.target.value)}
placeholder = "Password"
required
/>

<button type = "submit"> Login </button>
</form>
<h2>
    Don't have an account? <Link to = "/register"> Register Here</Link>
</h2>


</div>

);



}
export default Login;