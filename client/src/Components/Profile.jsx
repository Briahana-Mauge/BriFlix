import React from 'react'
import Shows from './Shows'
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios'
// import '../Profile.css';

class Profile extends React.Component {
    constructor(props) {
        super()
        this.state = {
            shows: [],
            user: '', 
            username: ''
        }
        

    }
    componentDidMount() {
        this.getAllShowForSingleUser()
        
    }
    getAllShowForSingleUser = async () => {
    
        try {
            console.log(this.props)
            let user = this.props.match.params.id
            let results = await axios.get(`http://localhost:3194/shows/user/${user}`)
            // console.log(results.data.payload)
            let newShows = [];
            for (let i = results.data.payload.length - 1; i >= 0; i--) {
                newShows.push(results.data.payload[i])
            }
            this.setState({
                shows: newShows,
                user: user,
                username: results.data.payload[0].username
            })
        } catch (error) {
            console.log('error', error)
        }
    }
    renderShows = () => {
        const { shows, user } = this.state
        return (
            <>
                {shows.map(show => {
                    return (
                        <div className='show profile' key={show.id}>
                            <Link to={`/shows/${show.id}/user/${user}`}>
                                <img src={show.img_url} alt={`${show.title}'s poster`} />
                                <h5>{show.title}</h5>
                                <h6>{show.genre_name}</h6>
                            </Link>
                        </div>
                    )
                })}
            </>
        )
    }
    render = () => {
        return (<>
        <h3>{this.state.username}'s Profile</h3>
            < div className='profile-page'>
                <Switch>
                    <Route path="/users/" render={this.renderShows} />
                    <Route path="/shows/:id/user/:user_id" component={Shows} />
                </Switch>
            </div>
        </>
        )
    }
}

export default Profile;