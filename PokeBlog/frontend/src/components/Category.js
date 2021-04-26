import React from 'react';
import {getRessource} from '../services/api_services';
import {Card, Modal} from 'antd';

const {Meta} = Card;

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    if (props.item) {
      this.state = {
        item: props.item,
        isModalVisible: false,
      };
    } else {
      this.state = {
        item: null,
        isModalVisible: false,
      };
    }
  }
  componentDidMount() {
    if (!this.state.item && this.props.itemId) {
      getRessource('category', this.props.itemId).then(response => {
        this.setState({item: response});
      });
    }
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
        <div className="offset-2 col-8 mb-5">
          <Card hoverable style={{width: '100%', height: '100%'}}>
            {this.state.item &&
            <a type="primary" onClick={showModal}>
              <img className="card-img-top col-12" src={this.state.item.image}
                   alt="image"/>
              <h2 className="card-title">{this.state.item.title}</h2>
              <Meta title={'Marque: ' + this.state.item.description + ', Date: ' +
              this.formatDate()}/>
            </a>
            }
          </Card>
          <Modal  visible={this.state.isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}>
            {this.state.item &&
            <a className="adminPost" href={'/category/' + this.state.item._id}>
              <img className="card-img-top col-12" src={this.state.item.image}
                   alt="image"/>
              <h2 className="card-title">{this.state.item.title}</h2>
              <Meta title={'Marque: ' + this.state.item.description + ', Date: ' +
              this.formatDate()}/>
            </a>
            }
          </Modal>
        </div>
    );
  };
}