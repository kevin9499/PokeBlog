import React from 'react';
import {useParams} from 'react-router-dom';
import PokemonForm from '../components/PokemonForm';
import {Button} from 'antd';
import PokemonsListe from '../components/PokemonsListe';
import {fetchAllPokemon} from '../services/api_pokemon';

export default class PokemonsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
      showAll: false,
      size: 0,
    };
  }

  search = () => {
    this.setState({showSearch: true, showAll: false});
  };

  show = () => {
    this.setState({showAll: true, showSearch: false});
  };

  componentDidMount() {
    let data;
    fetchAllPokemon().then(res => {
      data = res.count;
      this.setState({size: data});
    });
  }

  render() {
    return (
        <>
          <div className="col-12 mb-5">
            <Button className=" offset-4 col-1" type="primary"
                    onClick={this.search}>Search</Button>
            <Button className="offset-2 col-1" type="primary"
                    onClick={this.show}>Show all</Button>
          </div>
          <div className="col-12">
            {this.state.showSearch && <PokemonForm/>}
            {this.state.showAll && <PokemonsListe size={this.state.size}/>}
          </div>
        </>
    );
  }
}
