import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import StoreContextProvider from './context/StoreContext';
import Footer from './components/Footer/Footer';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';

function App() {
  return (
   <>
    <div>
      <BrowserRouter>
        <StoreContextProvider>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/order' element={<PlaceOrder/>}/>
          </Routes>
        </StoreContextProvider>
      </BrowserRouter>
    </div>
    <Footer />
    </> 
  );
}


export default App;
