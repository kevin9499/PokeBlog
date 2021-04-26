import React from 'react';
import Post from '../components/Post';
import {getRessources} from '../services/api_services';
import Category from '../components/Category';

export default class CategoriesPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {categories: []};
  }

  componentDidMount() {
    getRessources('category').then(response => {
      this.setState({categories: response});
    });
  }

  render() {
    const category = this.state.categories.map((value, index) => {
      return <Category key={index} item={value}/>;
    })

    return (
        <div className="row col-12 mb-5">
          {category}
        </div>
    );
  }
}
