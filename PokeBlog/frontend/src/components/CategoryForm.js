import React from 'react';
import {
  createRessource, deleteRessource,
  getRessource,
  updateRessource,
} from '../services/api_services';
import {Button, Input} from 'antd';

export default class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    if (this.props.itemId) {
      getRessource('category', this.props.itemId).then(response => {
        this.setState(response);
      });
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
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

  onSave() {
    if (this.props.itemId) {
      updateRessource('category', this.props.itemId, this.state).
          then(reponse => {
            alert('OK');
            window.location = '/admin';
          });
    } else {
      createRessource('category', this.state).then(reponse => {
        alert('OK');
        window.location = '/admin';
      });
    }
  }

  onDelete() {
    deleteRessource('category', this.props.itemId).then(reponse => {
      alert('OK');
      window.location = '/admin';
    });
  }

  render() {
    return (<div className="formPost offset-4 col-4 form-group"
                 style={{marginTop: '10%'}}>
      <Input className="form-control" type="text" placeholder="title"
             name="title"
             value={this.state.title} onChange={(this.onChange.bind(this))}/>
      <Input className="form-control" type="text"
             placeholder="description"
             name="description" value={this.state.description}
             onChange={this.onChange.bind(this)}/>
      <Input
          className="form-control-file"
          name="image"
          type="file"
          accept="image/*"
          onChange={this.handleFileChange.bind(this)}/>
      <Button type="primary" style={{ background: "green"}}
              className="buttonForm offset-3 col-3"
              onClick={this.onSave.bind(this)}>Save
      </Button>
      {this.props.itemId &&
      <Button type="danger"
          className="buttonForm col-3"
          onClick={this.onDelete.bind(this)}>Delete</Button>}
    </div>);
  };
}