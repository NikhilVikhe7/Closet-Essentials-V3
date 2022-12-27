import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import styled from "styled-components";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {BrowserRouter as Router,
    Routes,
    Route,
    redirect,
    Navigate
} from "react-router-dom";
import {useSelector} from "react-redux";

const App = () => {
  const user = useSelector(state => state.user.currentUser);
  return(
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} ></Route>
          <Route path="/products/:category" element={<ProductList/>} />
          <Route path="/products" element={<ProductList/>} />
          <Route path="/product/:id" element={<Product/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/login" element={user ? <Navigate to="/" replace/>: <Login/>}/>
          <Route path="/register" element={user ? <Navigate to="/" replace/>:<Register/>}/>
        </Routes>
      </Router>
  );
};

export default App;