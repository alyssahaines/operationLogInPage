import React,{useState,useEffect} from 'react';
import axios from 'axios';


const Dashboard = () => {
const [user,setUser] = useState('');
const [error,setError] = useState(null);

useEffect(() => {
    async function fetchItems() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
const response = await axios.get('http://localhost:5004/api/dashboard',{
    headers: {'Authorization':`Bearer ${token}`}
    ,
});
        if (response.status) {
            console.log(response.data);
            setUser(response.data);
        }
    }
    catch (error) {
        setError(error);


    }
}
fetchItems();
},
[]);

if (error) {
    return <h1> {error.message} </h1>;
};

return(
    <div>
        
    <h1> Welcome to your Dashboard,{user?.userInfo?.userID}!</h1>

    </div>
);

}
export default Dashboard;