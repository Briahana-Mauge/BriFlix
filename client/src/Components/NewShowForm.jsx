import React from 'react';
import axios from 'axios';

class NewShowForm extends React.Component {
    constructor() {
        super()
        this.state = {
            options: [],
            user: 1,
            submitted: ''
        }
    }
    componentDidMount() {
        this.getAllGenres()
    }
    getAllGenres = async () => {
        let response = await axios.get(`http://localhost:3194/genres/`)
        let newOptions = []
        newOptions.push(<option value='' key=''  selected disabled required>Choose a Genre</option>)
        for (let i = 0; i < response.data.payload.length; i++) {
            newOptions.push(
                <option value={response.data.payload[i].id} key={response.data.payload[i].id}>{response.data.payload[i].genre_name}</option>
            )
        }
        this.setState({
            options: newOptions
        })
    }
    
    render() {
        const { options } = this.state
        const { handleInput, handleSubmit, url, title } = this.props
        return (
            <>
                <h1>Add Show</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='url'> Show Image URL <br></br><input type='text' name='url' placeholder='show_url' onChange={handleInput} value={url} required />
                    </label>
                    <br></br>

                    <label htmlFor='title'>Show Name <br></br><input type='text' name='title' placeholder='Show name' onChange={handleInput} value={title} required />
                    </label>
                    <br></br>

                    <select className='genre' name='genre_id' onChange={handleInput}>
                        {options}
                    </select>
                        <input type='submit' value='Add New Form'/>
                   
                </form>

            </>
        )
    }
}

export default NewShowForm;