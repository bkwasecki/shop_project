import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Error from './pages/Error'

function App() {
 return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='shop_project' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='products' element={<Products />} />
        <Route path='product/:id' element={<SingleProduct />} />
        <Route path='cart' element={<Cart />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;