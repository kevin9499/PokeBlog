import React from 'react';
import {getRessource} from '../services/api_services';
import {Button, Card, Modal} from 'antd';

const {Meta} = Card;

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    if (props.item) {
      this.state = {
        item: props.item,
        isModalVisible: false,
        generation: ''
      };
    } else {
      this.state = {
        item: null,
        isModalVisible: false,
        generation: ''
      };
    }
  }

  componentDidMount() {
    if (!this.state.item && this.props.itemId) {
      getRessource('post', this.props.itemId).then(response => {
        this.setState({item: response});
      });
    }
    getRessource('category', this.props.item.categoryId).then(response => {
      this.setState({generation: response.title});

    });
  }

  formatDate() {
    let date = new Date(this.state.item.update);
    const ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
    const mo = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(date);
    const da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date);
    let dateFormat = ye + '-' + mo + '-' + da;
    return dateFormat;
  }

  render() {
    const showModal = () => {
      this.setState({isModalVisible: true});
    };

    const handleOk = () => {
      this.setState({isModalVisible: false});

    };

    const handleCancel = () => {
      this.setState({isModalVisible: false});

    };

    return (
        <div className="col-3 mb-5">
          <Card hoverable style={{width: '100%', height: '100%'}}>
            {this.state.item &&
            <a type="primary" onClick={showModal}>
              <img className="card-img-top col-12" src={this.state.item.image}
                   alt="image"/>
              <h2 className="card-title">{this.state.item.title}</h2>
              <Meta title={this.state.item.title_description + ', Date: ' +
              this.formatDate()} description={this.state.generation}/>
              <p className="card-text mt-2" style={{color:"black"}}>{this.state.item.contenu}</p>
            </a>
            }
          </Card>
          <Modal visible={this.state.isModalVisible}
                 onOk={handleOk}
                 onCancel={handleCancel}>
            {this.state.item &&
            <a className="adminPost" >
              <img className="card-img-top col-12" src={this.state.item.image}
                   alt="image"/>
              <h2 className="card-title">{this.state.item.title}</h2>
              <Meta title={this.state.item.title_description + ', Date: ' +
              this.formatDate()} description={this.state.generation}/>
              <p className="card-text mt-2" style={{color:"black"}}>{this.state.item.contenu}</p>
            </a>
            }
          </Modal>
        </div>
    );
  };
}