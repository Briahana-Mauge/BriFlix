import React from 'react';

import axios from 'axios';


class SignIn extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
            submitted: '',
            user: ''
        }
    }

    componentDidMount() {
        this.getAllUsers()
    }

    getAllUsers = async () => {

        let response = await axios.get(`http://localhost:3194/users/`)
        let newOptions = []
        newOptions.push(<option value='' key='' selected disabled required>Choose a User</option>)
        for (let i = 0; i < response.data.payload.length; i++) {
            newOptions.push(
                <option value={response.data.payload[i].id} key={response.data.payload[i].id}>{response.data.payload[i].username}</option>
            )
        }
        this.setState({
            users: newOptions,
        })
    }

    render() {
        const { users } = this.state;
        const { submitted, user_id, handleSubmit, handleInput, name, image } = this.props;

        return (
            <>
                <h1>Welcome to BriFlix </h1>

                {submitted && user_id ? <><p>Welcome <strong>{name}</strong></p>
                    <img src={image} alt={`${name}'s profile avatar`} />

                </> : <><h4>Who's watching?</h4>
                        <form onSubmit={handleSubmit}>
                            <select onChange={handleInput} name='user_id'>
                                {users}
                            </select>
                            <input type='submit' value='Log In' />
                        </form>
                    </>}
            </>
        )
    }
}

export default SignIn;
