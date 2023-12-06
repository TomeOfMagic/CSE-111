import logo from './logo.svg';
import useToken from './Components/UseToken'; 
import Login from './Components/Admin/Login';
import Main from './Components/Admin/Main';
import { Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import AdminPage from './Components/Admin/Pages/AdminPage';
import { useState } from 'react';

function App() {

  const { token, removeToken, setToken } = useToken();
  const [name , setName] = useState("");

  return (
    <Routes>
      <Route path="/Login" element={<Login token = {token} removeToken = {removeToken} setToken={setToken} name = {setName}/>} />
      <Route path="/Admin/*" element={<Main token = {token} removeToken = {removeToken} setToken={setToken} name = {name} />} >
        <Route index element={<Navigate to="AdminPage" />} />
        <Route path="AdminPage" element = {<AdminPage />} />
        <Route path="*" element={<Navigate to="/Login" />} />
      </Route>
      
      <Route path="/" element={<Navigate to="/Login" />} />
      <Route path="*" element={<Navigate to="/Login" />} />
    </Routes>
  );
}

export default App;
