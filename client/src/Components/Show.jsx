import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Comment from './Comments';
// import '../Show.css';

class Show extends React.Component {
  constructor() {
    super();
    this.state = {
      show: '',
      comments: [],
      count: '',
      newComment: '',
      commenter: ''
    }
  }
  async componentDidMount() {
    console.log('user: ',this.props.user_id)
    let show_Id = this.props.match.params.id
    let show = await axios.get(`http://localhost:3194/shows/${show_Id}`)   //${this.props.match.params.id}`);
  
    let showInfo = show.data.payload[0]
    console.log(showInfo.id)
    this.setState({
      show: showInfo,
      commenter:this.props.user_id, 
    })
    await this.getComments();
  }
  getComments = async () => {
    const {show} = this.state
    let id = show.id
    let res = await axios.get(`http://localhost:3194/comments/show/${id}`);
    let comments = res.data.payload
    this.setState({
      comments: comments,
      count: comments.length
    })
  }
  handleInput = (event) => {
    this.setState({
      newComment: event.target.value
    })
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { newComment, show, commenter } = this.state;
    let show_id = show.id 
    console.log(commenter)
    await axios.post('http://localhost:3194/comments/', { comment_body: newComment, show_id: show_id, user_id: commenter })
    this.getComments(show)
    this.setState({
      newComment: ''
    })
  }
  render() {
    let { show, count, comments, newComment } = this.state
    let { user, name } = this.props
    return (
      <div className = 'singleShow'>
        <h1>{show.title} of {name}</h1>
        <img src={show.img_url} alt={`${show.title}'s poster`}></img>
        <p>{show.genre_name}</p>
        {count !== 1 ?
          <p><strong>{count}</strong> comments</p> :
          <p><strong>{count}</strong> comment</p>}
        <div className='comment'>
          <Comment comments={comments} handleSubmit={this.handleSubmit} handleInput={this.handleInput} newComment={newComment} />
        </div>
        <Link to='/shows'><button>Back to Shows</button></Link>
        <Link to={`/users/${user}`}><button>Back to Profile</button></Link>
      </div>

    )
  }
}

export default Show;