import logo from './logo.svg';
import NavAdmin from './Components/NavBar';
import useToken from './Components/UseToken'; 
import Login from './Components/Admin/Login';
import EmpReg from './Components/Employee/empLogin';
import CustomerSignIn from './Components/Customer/SignIn';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Checkin from './Components/Checkin';
import './App.css';

function App() {
  const { token, removeToken, setToken } = useToken();
  const location = useLocation();
  const IsAdmin = location.pathname.includes('/Admin');
  return (
    <Routes>
      {!IsAdmin? (
        <>
          <Route path = "/" element = {<Checkin />}/>
          <Route path="/Employee/*">
            <Route index element = {<Navigate to = "empReg" />} />
            <Route path="empReg" element={<EmpReg />} />
          </Route>
          <Route path = "/Customer/*">
            <Route index element = {<Navigate to = "Login" />} />
            <Route path="Login" element = {<CustomerSignIn />}/>
          </Route>
        </>
      ): 
      (
        <>
        <Route path="/Admin/*">
          <Route index element={<Navigate to="Login" />} />
          <Route path="Login" element={<Login setToken = {setToken} />} />
          <Route path="*" element={<Navigate to="/Admin/" />} />
        </Route>
      </>
      )}
      <Route path="/" element={<Navigate to="/Employee/" />} />
    </Routes>
  );
}

export default App;
