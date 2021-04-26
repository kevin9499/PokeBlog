import React from 'react';
import {getRessource} from '../services/api_services';
import {Card} from 'antd';
const { Meta } = Card;

export default class AdminCategory extends React.Component {
  constructor(props) {
    super(props);
    if (props.item) {
      this.state = props.item;
    } else {
      this.state = null;
    }
  }

  componentDidMount() {
    if (!this.state && this.props.itemId) {
      getRessource('category', this.props.itemId).then(response => {
        this.setState(response);
      });
    }
  }

  render() {
    return (
        <div className="container mb-2">
          <Card hoverable style={{ width: "80%", height: "80%" }}>
            {this.state &&
            <a className="adminPost" href={'/editCategory/' + this.props.item._id}>
              <img className="card-img-top col-12" src={this.state.image}
                   alt="image"/>
              <h2 className="card-title">{this.state.title}</h2>
              <Meta title={this.state.description}/>
            </a>
            }
          </Card>
        </div>
    );
  }
}