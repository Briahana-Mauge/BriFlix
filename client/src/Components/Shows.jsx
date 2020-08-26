import React from 'react'
import axios from 'axios'
import Show from './Show'
import { Link, Route, Switch } from 'react-router-dom';
import './CSS/Shows.css';

class Shows extends React.Component {
    constructor() {
        super()
        this.state = {
            shows: [],
            user: '',
            showsOptions: [],
            message: '',
            // show_id:''
        }
        // console.log()

    }

    getAllShows = async () => {
        
        try {
            let results = await axios.get('http://localhost:3194/shows/')
            let newShows = []
            let newOptions = []
            newOptions.push(<option value='' key='' selected disabled required>Choose a Show</option>)

            results.data.payload.map(show => {
                newOptions.push(
                    <option value={show.id} key={show.id}>{show.title}</option>
                )

                return newShows.push(show)
            })
            this.setState({
                shows: newShows,
                showsOptions: newOptions
            })

        } catch (error) {
            console.log('error', error)
        }
    }

    addShowToQueue = async (event) => {
        event.preventDefault();
        console.log('ja')
        try {
            const { show_id } = this.props
            const { user } = this.state
            if (user) {
                await axios.post(`http://localhost:3194/shows/add`, { id: show_id, user_id: user })
                this.getAllShows();
            } else {
                this.setState({
                    message: 'You must bee logged in to add a show to your queue'
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    renderShows = () => {
        const { shows } = this.state

        return (
            <>
                {shows.map(show => {
                    // {console.log(show.user_id)}
                    let watchers
                    let list = new Set();
                    {
                        let set = new Set();


                        for (let i = 0; i < show.user_id.length; i++) {
                            // console.log(show.user_id[i])
                            console.log(show.watchers[i])
                            let link = ''
                            if (!list.has(show.watchers[i])) {
                                list.add(show.watchers[i])

                                link = <Link to={`/users/${show.user_id[i]}`} key={show.user_id[i]} className='user-card'>
                                    <li key={show.watchers[i]}>
                                        {show.watchers[i]}
                                    </li>
                                </Link>
                                set.add(link)
                            }
                        }

                        watchers = [...set]
                        console.log(/*show.title, set,*/  'watchers: ', watchers)
                    }

                    console.log('show id: ', show.id)
                    return (
                        <div className='show' key={show.id}>
                            <Link to={`/shows/${show.id}`}/*/user/${user}`}*/>
                                <img src={show.img_url} alt={`${show.title}'s poster`} className = 'poster'/>
                                <h3>{show.title}</h3>
                                <h5>{show.genre[0]}</h5>
                                {(this.props.path === '/shows') ?
                                    <p key={watchers}>Being watched by: {watchers}{/*{show.watchers.join(', ')*/}</p>
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
    }
    render() {
        const { showsOptions, message } = this.state
        console.log('state',this.state, this.props)
        return (
            <>
                {/* <h3>All Shows</h3> */}
                <div className='new-Show'>
                    <form onSubmit={this.addShowToQueue}>
                        <p>Start a new show</p>
                        <select onChange={this.props.handleInput} name='show_id'>
                            {showsOptions}
                        </select>
                        
                        <button>Add to Queue</button>
                        {message !== '' ? <p>{message}</p> : null}
                    </form>
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