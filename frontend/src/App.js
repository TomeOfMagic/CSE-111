import logo from './logo.svg';
import useToken from './Components/UseToken'; 
import Login from './Components/Admin/Login';
import Main from './Components/Admin/Main';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';

function App() {
  const { token, removeToken, setToken } = useToken();
  return (
    <Routes>
      <Route path="/Login" element={<Login token = {token} removeToken = {removeToken} setToken={setToken} />} />
      <Route path="/Admin/*">
        <Route index element={<Navigate to="Main" />} />
        <Route path="Main" element={<Main token = {token} removeToken = {removeToken} setToken={setToken} />} />
        <Route path="*" element={<Navigate to="/Login" />} />
      </Route>
      <Route path="/" element={<Navigate to="/Login" />} />
      <Route path="*" element={<Navigate to="/Login" />} />
    </Routes>
  );
}

export default App;
