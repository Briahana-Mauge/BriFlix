import React from 'react';
import NewShowForm from './NewShowForm';
import axios from 'axios';

class NewShow extends React.Component {
    constructor() {
        super();
        this.state = {
            genre_id: '',
            url: '',
            title: '',
            submitted: ''
        }
    }
    handleInput = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
            submitted: ''
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.addNewShow()
        this.setState({
            genre_id: '',
            url: '',
            title: '',
            submitted: true
        })
    }
    addNewShow = async () => {
        try {
            const { user_id } = this.props
            const { title, genre_id, url } = this.state
            await axios.post(`http://localhost:3194/shows/`, { title: title, genre_id: genre_id, img_url: url, user_id: user_id })

        }
        catch (err) {
            console.log(err)
        }
    }
    render() {
        const { title, genre_id, url, submitted } = this.state
        return (
            <>
                <NewShowForm handleInput={this.handleInput} handleSubmit={this.handleSubmit} title={title} genre_id={genre_id} url={url} />
                {submitted ?
                    <p><em> Show was Added!</em></p> :
                    null}
            </>
        )
    }
}
export default NewShow;