import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class Course extends Component {
    state = {
        name: "",
        description: "",
        sessions: [],
        sections: [],
        enrolled: -1
    }

    load = () => {
        this.fetchState()
            .then(res => this.setState({ ...res }))
            .catch(err => console.log(err));
    }

    fetchState = async () => {
        const { courseId } = this.props.match.params;

        const courseResponse = await fetch(`/courses/${courseId}`);
        let course = await courseResponse.json();

        const sessionsResponse = await fetch(`/courses/${courseId}/sessions`);
        course.sessions = await sessionsResponse.json();

        const sectionsResponse = await fetch(`/courses/${courseId}/sections`);
        course.sections = await sectionsResponse.json();

        
        course.enrolled = -1;

        // Here be dragons:
        // Pretty ugly way to do this, could use refactoring;
        // potentionally from the API to avoid the an API call
        // per section on the front end
        for (let i = 0; i < course.sections.length; i++) {
            const studentsResponse = await fetch(`/sections/${course.sections[i].id}/enrollment`);
            const students = await studentsResponse.json();
            course.sections[i].students = students;
            if (!!students.find(s => this.props.userId === s.userid)) {
                course.enrolled = course.sections[i].id;
            }
            
        }

        return course;
    };

    enroll = sectionId => () => {
        this.callEnrollment(sectionId)
            .then(res => {
                if (res) {
                    this.load();
                }
            })
    }

    unenroll = sectionId => () => {
        this.callEnrollment(sectionId, true)
            .then(res => {
                if (res) {
                    this.load();
                }
            })
    }

    callEnrollment = async (sectionId, unenroll) => {
        const opts = { method: unenroll ? 'DELETE' : 'POST' }
        const response = await fetch(`/users/${this.props.userId}/sections/${sectionId}`, opts);
        return response.ok;
    }

    renderEnrollmentOption = section => {
        if (this.props.userId === -1) {
            return;
        }

        if (this.state.enrolled === -1) {
            return (<button onClick={this.enroll(section.id)}>enroll</button>);
        }

        if (this.state.enrolled === section.id) {
            return (<button onClick={this.unenroll(section.id)}>unenroll</button>)
        }
    }

    componentDidMount() {
        this.load();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.load();
        }
    }

    render() {
        return (
            <div>
                <h3>{this.state.name}</h3>
                <ul>
                    {this.state.sessions.map(session => (
                        <li key={session.id}>
                            <h4>{session.name}</h4>
                            <p>{session.description}</p>
                            <p>{this.state.enrolled !== -1 && session.content}</p>
                        </li>
                    ))}
                </ul>
                <hr />
                <h3>Sections</h3>
                <ul>
                    {this.state.sections.map(section => (
                        <li key={section.id}>
                            <h4>{section.nickname}  {this.renderEnrollmentOption(section)}</h4>
                            <p>Starts On: {section.startdate}</p>
                            <ol>
                                {(section.students || []).map(student => (
                                    <li key={student.id}>{student.name}</li>
                                ))}
                            </ol>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default withRouter(Course);