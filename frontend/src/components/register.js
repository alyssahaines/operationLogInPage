import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Register = () => {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');

    
     const handleSubmit = async (e) => {
        e.preventDefault();
        const registerInfo = {username,password};
        try {
            const response = await axios.post('http//localhost:5003/api/register', registerInfo);
            if (response.status) {
                console.log('Registration Sucessful! Please follow link to login');
                setUsername('');
                setPassword('');
            }
        }
        catch (error) {
            console.log({message: error.message});
        }

     };



    return (
        <div> 
            <h1> Register here </h1>
            <form onSubmit = {handleSubmit}>
            <input
            type = "username"
            value = {username}
            placeholder = "username"
            onChange = {(e) => setUsername(e.target.value)}
            required
            />
            <input
            type = "password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            placeholder = "password"
            required
            />
            <button type = "submit" />
            </form>

        <h2> Have an Account?
        <Link to = '/login'> Login here</Link>
        </h2>
        </div>
    );
}

export default Register;