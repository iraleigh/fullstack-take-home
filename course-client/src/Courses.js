import React, { Component } from 'react';
import {
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";

import Course from './Course';

class Courses extends Component {
    state = {
        courses: []
    }

    componentDidMount() {
        this.load();
    }

    load = () => {
        this.fetchState()
            .then(res => this.setState({ courses: res }))
            .catch(err => console.log(err));
    }

    fetchState = async () => {
        const response = await fetch(`/courses`);
        const body = await response.json();

        return body;
    };

    render() {
        return (
            <div>
                <h2>Courses</h2>
                <ul>
                    {this.state.courses.map(course => (
                        <li key={course.id}>
                            <Link to={`${this.props.match.url}/${course.id}`}>{course.name}</Link>
                            <p>{course.description}</p>
                        </li>
                    ))}
                </ul>
                <hr />
                <Switch>
                    <Route path={`${this.props.match.path}/:courseId`}>
                        <Course userId={this.props.userId} />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default withRouter(Courses);