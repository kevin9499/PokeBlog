import React from 'react';
import {
  fetchPokemon,
} from '../services/api_pokemon';
import Pokemons from './Pokemons';
import { Button } from 'antd';
import { Input } from 'antd';

export default class PokemonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pokemons: [],
    };
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value.toLowerCase()});
  };

  onClick = () => {
    const data = this.state.pokemons;

     fetchPokemon(this.state.name).then(res => {
      const isExist = this.state.pokemons.some((value, index) => {
        return value.name === res.name;
      });
      if (!isExist) {
        this.setState({pokemons: [...data, res]});
      }
    });
  };

  render() {
    const pokemons = this.state.pokemons.map((value, index) => {
      return <Pokemons key={index} name={value.name}
                       img={value['sprites']['other']['official-artwork'].front_default}
                       weight={value.weight}/>;
    });

    return (
        <div className="col-12">
          <div className="formPost offset-4 col-4 form-group"
               >
            <Input className="form-control" type="text" placeholder="name"
                   name="name"
                   value={this.state.name}
                   onChange={this.onChange}/>
            <Button type="primary" className="btn-discover offset-5 mt-4" onClick={this.onClick}>Search</Button>

          </div>
          <div className="row col-12 mb-5">
            {pokemons}
          </div>
        </div>);
  };
}