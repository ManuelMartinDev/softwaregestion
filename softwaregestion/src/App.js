import React  from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import './App.css';
import Home from './Components/home';
import Sellform from './Components/sellform'
import Search from './Components/search';
import ClientForm from './Components/clientform';
import Unpaid from './Components/unpaid';
import ProductForm from './Components/productform';
import Products from './Components/products';
import SpentForm from './Components/spentform';

const App = () => {


  return(
    <Router>
      <Route exact path="/" component={Home}>
        
      </Route>

      <Route path="/sellform" component={Sellform}></Route>
      <Route path="/search" component={Search}></Route>
      <Route path="/addclient" component={ClientForm}></Route>
      <Route path="/unpaid" component={Unpaid}></Route>
      <Route path="/productform" component={ProductForm}></Route>
      <Route path="/products" component={Products}></Route>
      <Route path="/spentform" component={SpentForm}></Route>
    </Router>
  )
}

export default App;
