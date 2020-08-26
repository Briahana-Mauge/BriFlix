import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Comment from './Comments';
import './CSS/Show.css';

class Show extends React.Component {
  constructor() {
    super();
    this.state = {
      show: '',
      comments: [],
      count: '',
      newComment: '',
      commenter: '', 
      show_id:''
    }
  }
  async componentDidMount() {
    console.log('user: ',this.props.user_id)
    let show_Id = this.props.match.params.id
    console.log(show_Id)
    let show = await axios.get(`http://localhost:3194/shows/${show_Id}`)   //${this.props.match.params.id}`);
  
    let showInfo = show.data.payload[0]
    showInfo.id = this.props.match.params.id
    console.log(showInfo.id)
    this.setState({
      show: showInfo,
      commenter: this.props.user_id,
      // show_id: this.props.match.params.id
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
    let show_id = show.id;
    await axios.post('http://localhost:3194/comments/', { comment_body: newComment, show_id: show_id, user_id: commenter })
    this.getComments(show);
    this.setState({
      newComment: ''
    })
  }
  render() {
    let { show, count, comments, newComment, commenter } = this.state
    let { user_id} = this.props
    return (
      <div className = 'singleShow'>
        <Link to='/shows'><button>Back to Shows</button></Link>
        {
        !commenter
        ? <Link to={`/users/${commenter}`}><button>Back to Users</button></Link>
        : <Link to={`/users/${commenter}`}><button>Back to Profile</button></Link>
        }
        <h1>{show.title}</h1>
        <p>{show.genre_name}</p>
        <img src={show.img_url} alt={`${show.title}'s poster`} className = 'poster'></img>
        
        {count !== 1 ?
          <p><strong>{count}</strong> comments</p> :
          <p><strong>{count}</strong> comment</p>}
        <div className='comment'>
          <Comment comments={comments} handleSubmit={this.handleSubmit} handleInput={this.handleInput} newComment={newComment} />
        </div>
        
      </div>

    )
  }
}

export default Show;