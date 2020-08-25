import React from 'react';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';
import Profile from './Profile';
// import '../Users.css';

class Users extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
            new_user: ''
        }
    }
    componentDidMount() {
        this.getAllUsers()
    }
    getAllUsers = async () => {
        const { users } = this.state
        try {
            let results = await axios.get('http://localhost:3194/users/')
            let newUsers = [...users]
            results.data.payload.map(user => {
                return newUsers.push(user)
            })
            this.setState({
                users: newUsers
            })
        } catch (err) {
            console.log('error', err)
        }
    }

    renderUsers = () => {
        const { users, } = this.state
        // console.log(this.props)
        return (
            <div className='user-list'>

                {users.map(user => {
                    
                    return (
                        
                        <Link to={`/users/${user.id}`} key={user.id} className='user-card'> 
                           {user.username === this.props.name ?
                                <div >
                                    <img className='avatar' src={user.avatar_url} alt={`${user.username}'s avatar`} /> 
                                    <p>{user.username}</p>
                                    <em>(Logged In)</em>
                                </div> :
                                <div>
                                    <img className='avatar' src={user.avatar_url} alt={`${user.username}'s avatar`} />
                                    <p>{user.username}</p>
                                </div>}

                        </Link>
                    )
                })}
            </div>
        )
        
    }
    render() {
        console.log(this.props.user_id)
        return (
            <div>
                <h1>All Users</h1>
                <Switch>
                    <Route exact path="/users" render={this.renderUsers} />
                    {/* <Route path="/users/:id" render={() => <Profile  /*name={this.props.name} user_id={this.props.user_id}/> */}
                <Route path = "/users/:id" component = {Profile}/>
                </Switch>
            </div>
        )
    }
}
export default Users