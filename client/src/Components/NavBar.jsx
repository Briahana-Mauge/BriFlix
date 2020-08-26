import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { RECEIVE_SUBMIT, RECEIVE_USER } from '../Components/store/actionTypes'


class NavBar extends React.Component {
    constructor(props) {
        super()
        this.state = {
            users: [],
            submitted: '',
            user: ''
        }
    }
    logOut = () => {
        this.props.receiveUser('');
        this.props.receiveSubmit(!this.props.loggedUser.submitted);
    }
    render() {
        return (
            <nav >
                <Link to='/users'> Users</Link> {' '}
                <Link to='/shows'>Shows</Link>{' '}
                <Link to='/newShow'>Add New Show</Link>{' '}
                <Link to='/about'>About</Link>{' '}
                {
                    this.props.loggedUser.submitted === true
                        ? <Link to='/' onClick={this.logOut}>Switch User</Link>
                        : <Link to='/'>Log In</Link>
                }
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.receiveUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        receiveUser: (user) => {
            dispatch({
                type: RECEIVE_USER,
                payload: user
            })
        },
        receiveSubmit: (submit) => {
            dispatch({
                type: RECEIVE_SUBMIT,
                payload: submit
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);