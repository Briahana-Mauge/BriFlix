import React from 'react';
import NavBar from './Components/NavBar';
import SignIn from './Components/SignIn'
import About from './Components/About';
import Shows from './Components/Shows';
import Users from './Components/Users';
import NewShow from './Components/NewShow';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux';
import { RECEIVE_USER } from './Components/store/actionTypes'

class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      user_id: '',
      name: '',
      submitted: ''
    }
  }
  handleInput = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
      submitted: false
    })
  }
  getUser = async (props) => {
    const { user_id } = this.state
    // console.log('state: user_id', user_id)
    try {
      if (user_id) {
        let single_user = await axios.get(`http://localhost:3194/users/${user_id}`)
        // console.log('results', single_user)
        let user = single_user.data.payload
        this.setState({
          user_id: user.id,
          name: user.username
        })
      }

    } catch (err) {
      console.log('error', err)
    }
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      submitted: true
    })
    await this.props.receiveUser(this.state.user_id);
    this.getUser();
  }

  render() {
    const { user_id, title, url, genre_id, name, submitted } = this.state
    return (
      <div className="App">
        < NavBar />
        <Switch>
          <Route exact path='/' render={() => <SignIn user_id={user_id} handleInput={this.handleInput} handleSubmit={this.handleSubmit} submitted
           = {submitted} name = {name}/>} />
          <Route path='/about' render={() => <About user_id={user_id} />} />
          <Route path='/users' render={() => <Users user_id={user_id} name={name} />} />
          <Route path='/addShow' render={() => <NewShow user_id={user_id} title={title} url={url} genre_id={genre_id} />} />
          <Route path='/shows' render={() => <Shows user_id={user_id} name={name} handleInput={this.handleInput} handleSubmit={this.handleSubmit} path={'/shows'} />} />
        {/* <Route path = '/shows' component = {Shows}/> */}
          </Switch>
      </div>
    );
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);