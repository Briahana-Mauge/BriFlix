import React from 'react'
import axios from 'axios'
import Show from './Show'
import { Link, Route, Switch } from 'react-router-dom';
// import '../Shows.css';

class Shows extends React.Component {
    constructor() {
        super()
        this.state = {
            shows: [],
            user: ''
        }
      console.log(this.props)
    }
    
    getAllShows = async () => {
        try {
            let results = await axios.get('http://localhost:3194/shows/')
            let newShows = []
            results.data.payload.map(show => {
                return newShows.push(show)
            })
            this.setState({
                shows: newShows
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
                    let watchers = []
                    return (
                        <div className='show' key={show.id}>
                            <Link to={`/shows/${show.id}`}/*/user/${user}`}*/>
                                <img src={show.img_url} alt={`${show.title}'s poster`} />
                                <h5>{show.title}</h5>
                                <h6>{show.genre[0]}</h6>
                                {(this.props.path === '/shows') ?
                                    <p key={watchers}>Being watched by: {show.watchers.join(', ')}</p>
                                    : null}
                            </Link>
                        </div>
                    )
                })}
            </>
        )
    }
    componentDidMount() {
        this.setState({
            user: this.props.user_id
        })
        this.getAllShows()
        
        console.log(this.props, this.state)
    }
    render() {
        return (
            <>
                <h3>All Shows</h3>
                <div className='new-Show'>
                    <Link to='/addShow'><button>Add New Show</button></Link>{' '}
                </div>
                <div className='all-Shows'>

                    <Switch>
                        <Route exact path="/shows" render={this.renderShows} />
                        <Route path="/shows/:id/" render={(props) => <Show {...props} name={this.props.name} user_id={this.state.user} />} />
                    </Switch>
                </div>
            </>
        )
    }
}

export default Shows;