import React, { useState } from 'react';
import Header from './components/Header';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';


function App() {

const info: string | null = localStorage.getItem('user');
const userInfo = info ? JSON.parse(info) : null;
const [user, setUser] = useState(userInfo);

  return (
  <>
  <BrowserRouter>
    <Header/>
  <Routes>
    <Route path = "/" element = {<Home/>} />
    <Route path = "/register" element = {<Register/>} />
    <Route path = "/signin" element = {<Login/>} />
  </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
