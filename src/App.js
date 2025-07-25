import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import StoreContextProvider from './context/StoreContext';

function App() {
  return (
    <div>
      <BrowserRouter>
        <StoreContextProvider>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </StoreContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
