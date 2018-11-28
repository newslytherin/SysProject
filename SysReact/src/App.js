import React, { Component } from "react"
import { HashRouter as Router, Route, NavLink } from "react-router-dom"
import Welcome from "./components/Welcome";
import User from "./components/User";
import Admin from "./components/Admin";
import SWAPI from "./components/swapi";
import LargeDataSet from "./components/LargeDataSet";
import EditTrip from "./components/EditTrip";
import AddFligth from "./components/MakeFlight";
import FlightsTable from "./components/FlightsTable";
import facade from "./apiFacade";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {username: "Username", loggedIn: false}
  }
  setname = (username) => {
    this.setState({username});
  }
  changeLoggedIn = () => {
    this.setState({loggedIn: !this.state.loggedIn});
  }
  render() {
    return (
      <Router>
        <div>
          <ul className="header">
            <li>{(this.state.loggedIn)?this.state.username:''}</li>
            <li> <NavLink exact to="/">Home</NavLink> </li>
            <li> <NavLink to="/swapi">SWAPI</NavLink> </li>
            <li> <NavLink to="/large-data-set">Large Data Set</NavLink> </li>
            <li> <NavLink to="/fligths">show fligths</NavLink> </li>
            <li> <NavLink to="/add">add fligth</NavLink> </li>
            <li> <NavLink to="/edit">edit fligth</NavLink> </li>
            {(this.state.loggedIn && facade.getRole().includes('user')) ? <li> <NavLink to="/user">User</NavLink> </li> : ''}
            {(this.state.loggedIn && facade.getRole().includes('admin')) ? <li> <NavLink to="/admin">Admin</NavLink> </li> : ''}
          </ul>
          <hr />
          <Route exact path="/" render={() => <Welcome roles={this.state.roles} setname={this.setname} loggedIn={this.state.loggedIn} changeLoggedIn={this.changeLoggedIn} />} />
          <Route path="/user"  render={() => <User username={this.state.username} roles={facade.getRole()} />} />
          <Route path="/admin" render={() => <Admin username={this.state.username} roles={facade.getRole()} />} />
          <Route path="/swapi" component={SWAPI} />
          <Route path="/large-data-set" component={LargeDataSet} />
          <Route path="/edit" component={EditTrip} />
          <Route path="/add" component={AddFligth} />
          <Route path="/fligths" component={FlightsTable} />
        </div>
      </Router>
    );
  }
}
