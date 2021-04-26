import React from 'react';
import {login} from '../services/api_services';
import {storeData, TOKENID} from '../services/localStorages';
import {Button} from 'antd';

const crypto = require('crypto');

export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  encodePassword() {
    return crypto.createHash('sha512').
        update(this.state.password.trim()).digest('base64');
  }

  isConnected() {
    login({email: this.state.login, password: this.encodePassword()}).
        then(result => {
          if (result.status === 200) {
            storeData(TOKENID, result.response.token);
            window.location = '/admin';
          }
        });
    console.log(this.encodePassword());
  }

  render() {
    return (
        <div className="offset-5 col-2" style={{marginTop:"5%"}}>
          <input className="form-control" type="text" placeholder="login"
                 name="login"
                 value={this.state.login}
                 onChange={(this.onChange.bind(this))}/>
          <input className="form-control" type="password"
                 placeholder="password"
                 name="password" value={this.state.password}
                 onChange={this.onChange.bind(this)}/>
          <Button type="primary" className="buttonForm offset-4"
                  onClick={this.isConnected.bind(this)}>Connexion
          </Button>
        </div>
    );
  }
}