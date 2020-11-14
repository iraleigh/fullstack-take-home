import React, { Component } from 'react';

class Users extends Component {
    state = {
        name: ""
    };

    handleInput = event => {
        this.setState({ name: event.target.value });
    };

    changeUser = () => {
        this.fetchUserId(this.state.name)
            .then(res => this.props.onChangeUser(res))
            .catch(err => alert("Invalid Username!"));
    }

    fetchUserId = async name => {
        const response = await fetch(`/users?name=${name}`);
        const user = await response.json();

        return user.id;
    };


    render() {
        return (
            <div>
                <input onChange={this.handleInput} type='text' placeholder='Name' />
                <button onClick={this.changeUser}>Sign Up</button>
            </div>
        );
    }
}

export default Users;