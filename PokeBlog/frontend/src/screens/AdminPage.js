import React from 'react';
import {getRessources} from '../services/api_services';
import AdminPost from '../components/AdminPost';
import {retrieveData, TOKENID} from '../services/localStorages';
import AdminCategory from '../components/AdminCategory';
import {Link} from 'react-router-dom';
import {Button, Card} from 'antd';
import img from '../components/asset/pokeball.png'
import generations from '../components/asset/generation.png'

export default class AdminPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      categories: [],
    };
  }

  componentDidMount() {
    let token = retrieveData(TOKENID);
    if (!token) {
      window.location = '/login';
    } else {
      getRessources('post').then(response => {
        this.setState({posts: response});
      });
      getRessources('category').then(response => {
        this.setState({categories: response});
      });
    }
  }

  render() {
    return (
        <div>
          <div className="row col-12 mb-5">
            <Card className="col-5" style={{background:"#f1efec"}}>
              <h2 className="font mt-5 mb-5" style={{color:"yellow", textShadow:"1px 1px 0 blue,-1px -1px 0 blue,1px -1px 0 blue,-1px 1px 0 blue,1px 1px 0 blue"}}>All Pokemons <img src={img} alt="pokeball" style={{width:"30px"}}/></h2>
              {this.state.posts.map((value, index) => {
                return <AdminPost key={index} item={value}/>;
              })
              }
            </Card>

            <Card className="offset-1 col-6"  style={{background:"#f1efec"}}>
              <img src={generations} alt="generations" style={{width:"240px"}}/>
              {this.state.categories.map((value, index) => {
                return <AdminCategory key={index} item={value}/>;
              })
              }
            </Card>
          </div>
          <div className="mb-5">
            <Link to="/addPost"><Button type="primary" className="btn-discover offset-2">Add Pokemon</Button></Link>
            <Link to="/addCategory"><Button type="primary" className="btn-discover offset-4">Add Generation</Button></Link>
          </div>
        </div>
    );
  }
}