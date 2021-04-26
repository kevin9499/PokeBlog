import React from 'react';
import {Card, Menu} from 'antd';
import {retrieveData, TOKENID} from '../services/localStorages';
import {Link} from 'react-router-dom';
import img from './asset/blogg.png';
import {UserOutlined} from '@ant-design/icons';
const {Meta} = Card;

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
    };
  }

  componentDidMount() {
    let token = retrieveData(TOKENID);
    if (token) {
      this.setState({isConnected: false});
    } else {
      this.setState({isConnected: true});
    }
  }

  isDeconnected() {
    this.setState({isConnected: false});
    localStorage.removeItem(TOKENID);
  }

  render() {
    return (
        <Menu onClick={this.handleClick} mode="horizontal" theme="dark">
          <Menu.Item key="mail">
            <Link to="/"><img src={img} alt="blog " width="40"
                              height="40"/></Link>
          </Menu.Item>
          <Menu.Item key="categorie">
            <Link to="/category" style={{color:"yellow",  textShadow:"1px 1px 0 blue,-1px -1px 0 blue,1px -1px 0 blue,-1px 1px 0 blue,1px 1px 0 blue"}}>Generations</Link>
          </Menu.Item>
          <Menu.Item key="pokemon">
            <Link to="/pokemon" style={{color:"yellow",  textShadow:"1px 1px 0 blue,-1px -1px 0 blue,1px -1px 0 blue,-1px 1px 0 blue,1px 1px 0 blue"}}>Catch Pokemon</Link>
          </Menu.Item>
          {this.state.isConnected ?
              <Menu.Item key="connexion">
                <Link to="/admin" style={{color:"yellow",  textShadow:"1px 1px 0 blue,-1px -1px 0 blue,1px -1px 0 blue,-1px 1px 0 blue,1px 1px 0 blue"}}>Connexion</Link>
              </Menu.Item> :
              <>
                <Menu.Item key="favoris">
                  <Link to="/favoris" style={{color:"yellow",  textShadow:"1px 1px 0 blue,-1px -1px 0 blue,1px -1px 0 blue,-1px 1px 0 blue,1px 1px 0 blue"}}>My Pokedex</Link>
                </Menu.Item>
                <Menu.Item key="admin">
                  <Link to="/admin" style={{color:"yellow", textShadow:"1px 1px 0 blue,-1px -1px 0 blue,1px -1px 0 blue,-1px 1px 0 blue,1px 1px 0 blue"}}>Admin</Link>
                </Menu.Item>
                <Menu.Item key="deconnexion">
                  <Link to="/admin" style={{color:"yellow", textShadow:"1px 1px 0 blue,-1px -1px 0 blue,1px -1px 0 blue,-1px 1px 0 blue,1px 1px 0 blue"}}
                        onClick={this.isDeconnected.bind(this)}><UserOutlined/>Deconnexion
                  </Link>
                </Menu.Item>
              </>
          }
        </Menu>
    );
  }
}