import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import Courses from './Courses';
import Users from './Users';

import './App.css';

class App extends Component {
	state = {
		userId: -1,
		userName: ""
	}

	changeUser = user => {
		this.setState({ userId: user.id, userName: user.name });
	}

	render() {
		return (
			<Router>
				<div>
					<p>{this.state.userName.length === 0 ? "" : `Welcome, ${this.state.userName}`}</p>
					<nav>
						<ul>
							<li>
								<Link to="/courses">Courses</Link>
							</li>
							<li>
								<Link to="/users">Users</Link>
							</li>
						</ul>
					</nav>
					<hr />
				</div>
				<Switch>
					<Route path="/courses">
						<Courses userId={this.state.userId} />
					</Route>
					<Route path="/users">
						<Users onChangeUser={this.changeUser} />
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;
