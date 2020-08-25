import React from 'react';
// import { connect } from 'react-redux';
// import { RECEIVE_USER } from './store/actionTypes'
import axios from 'axios';


class SignIn extends React.Component {
    constructor(props) {
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
        const { users} = this.state;
        const {submitted, user_id, handleSubmit, handleInput, name } = this.props;

        return (
            <>
                <h1>Welcome to the TV Watchlist App </h1>
                <h4>Who's watching?</h4>
                <form onSubmit={handleSubmit}>
                    <select onChange={handleInput} name='user_id'>
                        {users}
                    </select>
                    <input type='submit' value='Log In' />
                </form>
                {submitted && user_id ? <p>Welcome <strong>{name}</strong></p> :
                    null}
            </>
        )
    }
}
// const mapStateToProps = (state) => {
//     return {
//         loggedUser: state.receiveUser
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         receiveUser: (user) => {
//             dispatch({
//                 type: RECEIVE_USER,
//                 payload: user
//             })
//         }
//     }
// }

export default SignIn;
// connect(mapStateToProps, mapDispatchToProps)(SignIn);