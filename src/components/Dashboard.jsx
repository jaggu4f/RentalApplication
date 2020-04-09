import React, { Component } from 'react'; 
import Header from './Navbar';
import Home from './Home';
import Sachin from './Sachin';
import Santosh from './Santosh';
import Jagadeesh from './Jagadeesh';
import UserTable from './UserTable';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Router>
                <div className="App">
                <Header />
                <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/home">
                            <Home />
                        </Route>
                        <Route path="/sachin">
                            <Sachin />
                        </Route>
                        <Route path="/santosh">
                            <Santosh />
                        </Route>
                        <Route path="/jagadeesh">
                            <Jagadeesh />
                        </Route>
                        <Route  path="/addNewUser" component={AddUser}/>
                        <Route  path="/:complexName/:clNo/:userId/updateUser" component={UpdateUser}/>
                        <Route exact path="/:complexName/:clNo/:userId" component={UserTable} />
                    </Switch>
                </div>
    </Router>
        )
    }
}

export default Dashboard;