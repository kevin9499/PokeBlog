import React from 'react';
import img from '../components/asset/pokemon.png';
import pokedex from '../components/asset/pokedex.png';

export default class Header extends React.Component {

  render() {
    return (
        <div>
          <img className="offset-4 col-4" src={img} alt="pokemon"/>
        </div>
    );
  }

}