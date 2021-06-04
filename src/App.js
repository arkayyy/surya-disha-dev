
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Provider} from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Home/Home'

function App() {
  return (
    <Router>

   
    <div className="App">

    <Switch>

      <Route path="/" exact component={Home}/>

    </Switch>
      
    </div>

    

    </Router>
  );
}

export default App;
