import React from 'react';
import Post from '../components/Post';
import {getRessources} from '../services/api_services';
import pic from '../components/asset/back.jpeg'

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {posts: []};
  }

  componentDidMount() {
    getRessources('post').then(response => {
      this.setState({posts: response});
    });
  }

  render() {
    const post = this.state.posts.map((value, index) => {
      return <Post key={index} item={value}/>;
    });

    return (
        <div>
          <div className="col-12 mb-5">
            <h1 className="offset-5" style={{color:"#FFD700",  textShadow:"1px 1px 0 blue,-1px -1px 0 blue,1px -1px 0 blue,-1px 1px 0 blue,1px 1px 0 blue"}}>Welcome To PokeBlog !</h1>
          </div>
          <div className="row col-12 mt-5 mb-5">
            {post}
          </div>
        </div>
    );
  }
}
