import {Button, Row} from 'antd';
import React, {Component} from 'react';
import StoreImg from './StoreImg';
import {
  removeData,
  retrieveData,
  storeData,
  TOKENID,
} from '../services/localStorages';
import img from '../components/asset/pokedex.png';

class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: {},
    };
  }

  componentDidMount() {
    let token = retrieveData(TOKENID);
    if (!token) {
      window.location = '/login';
    } else {
      this.refresh();
    }
  }

  refresh = () => {
    let storage = JSON.parse(retrieveData('pokemons'));
    if (storage !== null) {
      const pokemon = {...storage.pokemons};
      this.setState({pokemons: pokemon});
    }
  };

  render() {
    const pokemon = Object.keys(this.state.pokemons).map(item => {
      return <StoreImg img={this.state.pokemons[item]}
                       refresh={() => this.refresh()}/>;
    });

    return (
        <>
          <Row gutter={24} className="mt-5 mb-5">
            {pokemon}
          </Row>
        </>
    );
  }
}

export default Collection;