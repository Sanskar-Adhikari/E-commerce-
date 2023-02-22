import './App.css';
import Header from './component/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './component/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products/>} />

 
     </Routes>
      <Footer />
    </Router>
  );
}

export default App;
