import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NoMatch from "./pages/NoMatch";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import Scan from "./components/Scan";
import Retrieve from "./components/Retrieve";
import Payment from "./components/Payment";
import Notify from "./components/Notify";
import { Container } from 'reactstrap';
import Space from "./components/Space";
import Chart from "./components/Chart";




function App() {
  return (
      <Router>
        <div>
          <TopNav />
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" render={(props) => <Auth {...props} action="signup" />} />
              <Route exact path="/login" render={(props) => <Auth {...props} action="login" />} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/vehicle" render={(props) => <Auth {...props} action="vehicle" />}/>
              <Route exact path="/pay" component={Payment} />
              <Route exact path="/notify" component={Notify} />
              <Route exact path="/scan" component={Scan} />
              <Route exact path="/retrieve" component={Retrieve} />
              <Route exact path="/chart" component={Chart} />
              <Route exact path="/space" component={Space} />
              <Route component={NoMatch} />
            </Switch>
          </Container>
          <Footer />
         
        </div>
      </Router>
  
     
  );

 
     
}




export default App;
