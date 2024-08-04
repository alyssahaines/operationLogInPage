import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './loginRegisterStyle.css';


const Register = () => {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
    const history = useNavigate();
    
     const handleSubmit = async (e) => {
        e.preventDefault();
        const registerInfo = {username,password};
        try {
            const response = await axios.post('http://localhost:5004/api/register', registerInfo);
            if (response.status) {
                
                setUsername('');
                setPassword('');
                history('/login');
            }
        }
        catch (error) {
            console.log({message: error.message});
        }

     };



    return (
        <div> 
            <div className = "logreg">
            <h1> Register Here </h1>
            <form onSubmit = {handleSubmit}>
            <input
            type = "text"
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
            <button type = "submit"> Sign up</button>
            </form>
        
        <h2 className = "links"> Have an Account?
        <Link to = '/login'> Login Here</Link>
        
        </h2>
        </div>
        </div>
    );
}

export default Register;