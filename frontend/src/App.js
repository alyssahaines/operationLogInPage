import {BrowserRouter as Route,Router,Source,Redirect,Routes, Navigate} from 'react-router-dom';
import Login from './components/loginPage';
import Register from './components/register';
import Dashboard from './components/dashboard';

function App() {
  return (
    <Router>
      <Routes>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/register" element = {<Register/>} />
      <Route path = '/dashboard' element = {<Dashboard/>}/>
      <Route path = "/" element = {<Navigate to = "/login"/>}/>
      </Routes>

    </Router>
    
  );
}

export default App;
