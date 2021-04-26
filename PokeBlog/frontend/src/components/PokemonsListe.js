import React from 'react';
import {
  fetchPokemon, fetchAllPokemon,
} from '../services/api_pokemon';
import Pokemons from './Pokemons';

export default class PokemonsListe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.size,
      pokemons: [],
    };
  }

  componentDidMount() {
    const data = this.state.pokemons;
    for (let i = 0; i < +this.props.size; i++) {
      fetchPokemon(i).then((res) => {
        data.push(res);
        this.setState({pokemons: data});
      });
    }
  };

  refresh() {

  }

  render() {
    const pokemons = this.state.pokemons.map((value, index) => {
      return <Pokemons key={index} name={value.name}
                       img={value['sprites']['other']['official-artwork'].front_default}
                       weight={value.weight}/>;
    });

    return (
        <div className="row col-12 mb-5">
          {pokemons}
        </div>
    );
  };
}