import { Home } from "./pages/Home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Product from "./pages/Product";
import { ProductList } from "./pages/ProductList";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import Cart from "./pages/Cart";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import Wishlist from "./pages/Wishlist";

function App() {
  const temp = useSelector((state) => state.user.currentUser);
  // console.log(temp);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route path="/productlist/:category">
            <ProductList />
          </Route>
          <Route path="/register">
            {temp ? <Redirect to="/" /> : <Register />}
            <Register />
          </Route>

          <Route path="/login">{temp ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/wishlist">
            <Wishlist/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
