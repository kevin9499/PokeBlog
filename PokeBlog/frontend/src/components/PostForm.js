import React from 'react';
import {
  createRessource, deleteRessource,
  getRessource, getRessources,
  updateRessource,
} from '../services/api_services';
import {Button, Input} from 'antd';
import { Alert } from 'antd';
const {TextArea} = Input;

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      title_description: '',
      image: '',
      contenu: '',
      categoryId: '',
      categories: [],
    };
  }

  componentDidMount() {
    if (this.props.itemId) {
      getRessource('post', this.props.itemId).then(response => {
        this.setState(response);
      });
      getRessources('category').then(response => {
        this.setState({categories: response, categoryId: response[0]._id});
      });
    }
    getRessources('category').then(response => {
      this.setState({categories: response, categoryId: response[0]._id});
    });
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSave() {
    let data = this.state;
    delete data['categories'];
    if (this.props.itemId) {
      updateRessource('post', this.props.itemId, data).
          then(reponse => {
            alert('OK');
            window.location = '/admin';
          });
    } else {
      createRessource('post', data).then(reponse => {
        alert('OK');
        window.location = '/admin';
      });
    }
  }

  handleFileChange(e) {
    const {target} = e;
    const {files} = target;
    if (files && files[0]) {
      let reader = new FileReader();
      reader.onload = event => {
        this.setState({image: event.target.result});
      };
      reader.readAsDataURL(files[0]);
    }
  }

  onDelete() {
    deleteRessource('post', this.props.itemId).then(reponse => {
      alert('OK');
      window.location = '/admin';
    });
  }

  render() {
    return (<div className="formPost offset-4 col-4 form-group"
                 style={{marginTop: '10%'}}>
      <Input className="form-control mb-1" type="text" placeholder="title"
             name="title"
             value={this.state.title}
             onChange={(this.onChange.bind(this))}/>
      <Input className="form-control mb-1" type="text"
             placeholder="title_description"
             name="title_description" value={this.state.title_description}
             onChange={this.onChange.bind(this)}/>
      <Input
          className="form-control-file mb-1"
          name="image"
          type="file"
          accept="image/*"
          onChange={this.handleFileChange.bind(this)}/>

      <TextArea className="form-control mb-1" placeholder="contenu"
                name="contenu"
                value={this.state.contenu}
                onChange={this.onChange.bind(this)}/>
      <select className="form-control" name="categoryId"
              onChange={this.onChange.bind(this)}>
        {this.state.categories.map((option, index) => (
            <option key={index} value={option._id}>{option.title}</option>
        ))}
      </select>
      <div className="mb-5">
        <Button type="primary" className="buttonForm offset-3 col-3"
                style={{background: 'green'}}
                onClick={this.onSave.bind(this)}>Save
        </Button>
        {this.props.itemId &&
        <Button type="danger" className="buttonForm col-3"
                onClick={this.onDelete.bind(
                    this)}>Delete</Button>}</div>
    </div>);
  };
}