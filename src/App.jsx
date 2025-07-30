import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Login from './pages/Login';
import StoreContextProvider from './context/StoreContext';
import {ToastContainer} from 'react-toastify'

import React from 'react';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import { AppContextprovider } from './context/AppContext';

const AppLayout = () => {
  const location = useLocation();

  const hideLayoutRoutes = ['/login', '/email-verify', '/reset-password'];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      {!shouldHideLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContextprovider>
        <StoreContextProvider>
          <AppLayout />
        </StoreContextProvider>
      </AppContextprovider>
    </BrowserRouter>
  );
}

export default App;
