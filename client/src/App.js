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
import { RECEIVE_USER, RECEIVE_SUBMIT } from './Components/store/actionTypes'

class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      user_id: '',
      name: '',
      submitted: false, 
      show_id: ''
    }
    console.log(props)
  }
  handleInput = async (event) => {
    const { name, value } = event.target
    console.log(name, value)
    this.setState({
      [name]: value,
      submitted: false,
      
    })
  }
  getUser = async () => {
    const { user_id } = this.state
    try {
      if (user_id) {
        let single_user = await axios.get(`http://localhost:3194/users/${user_id}`)
        console.log('results', single_user)
        let user = single_user.data.payload
        this.setState({
          name: user.username,
          image: user.avatar_url
        })
      }
    } catch (err) {
      console.log('error', err)
    }
  }

  handleSubmit = async (event) => {
    const { submitted, user_id } = this.state
    event.preventDefault();

    this.setState({
      submitted: !submitted,//true
      user_id: this.props.loggedUser.loggedUser
    })
    this.getUser();
    await this.props.receiveUser(user_id);
    await this.props.receiveSubmit(!submitted);
  }

  render() {
    const { user_id, title, url, genre_id, name, submitted, image, show_id } = this.state
    return (
      <div className="App">
        < NavBar submitted={submitted} />
        <Switch>
          <Route exact path='/' render={() => <SignIn user_id={this.props.loggedUser.loggedUser} handleInput={this.handleInput} handleSubmit={this.handleSubmit} submitted
            ={this.props.loggedUser.submitted} name={name} image = {image} />} />
          <Route path='/about' render={() => <About user_id={user_id} />} />
          <Route path='/users' render={() => <Users user_id={user_id} name={name} />} />
          <Route path='/newShow' render={() => <NewShow user_id={user_id} title={title} url={url} genre_id={genre_id} />} />
          <Route path='/shows' render={() => <Shows user_id={this.props.loggedUser.loggedUser} name={name} handleInput={this.handleInput} handleSubmit={this.handleSubmit} show_id = {show_id} path={'/shows'} />} />
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
    },
    receiveSubmit: (submit) => {
      dispatch({
        type: RECEIVE_SUBMIT,
        payload: submit
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);