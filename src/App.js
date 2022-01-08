import "./App.css";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import { Switch, Route } from "react-router-dom";
import Products from "./component/Products";
import ProductDetail from "./component/ProductDetail";
import Cart from "./component/Cart";
import Login from "./component/Login";
import NotFound from "./component/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products/:id" component={ProductDetail} />
        <Route path="/products">
          <ProtectedRoute component={Products} />
        </Route>
        <Route path="/cart">
          <ProtectedRoute component={Cart} />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
