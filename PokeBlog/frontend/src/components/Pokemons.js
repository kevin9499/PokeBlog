import React from 'react';
import {storeData} from '../services/localStorages';
import {PlusCircleOutlined} from '@ant-design/icons';
import {Card} from 'antd';
import img from '../components/asset/pokeball.png'

export default class Pokemons extends React.Component {
  constructor(props) {
    super(props);

  }

  handleClick = (image_data) => {
    let storage = JSON.parse(window.localStorage.getItem('pokemons'));
    if (storage == null) storage = {
      pokemons: [],
    };
    if (storage.pokemons.length > 0) {
      const isExist = storage.pokemons.some((value, index) => {
        return value === image_data;
      });
      if (!isExist) {
        alert("Add to favorite")
        storage.pokemons = [...storage.pokemons, image_data];
      }else{
        alert("Already in favorite")
      }
    } else {
      storage.pokemons.push(image_data);
    }
    storeData('pokemons', JSON.stringify(storage));
  };

  render() {
    return (
        <div className="col-3 mb-5">
          <Card hoverable className="card-body">
            <img className="card-img-top" src={this.props.img}/>
            <h4 className="card-title">{this.props.name}</h4>
            <p className="card-title">{this.props.weight} lb</p>
            <div className="add-to-fav"
                 onClick={() => this.handleClick(this.props.img)}
                 style={{color: '#1890ff', hover: 'black'}}>
              <img className="offset-5 mb-2 mt-2" alt="pokeball" src={img} style={{width:"20px"}}/><p
                className="offset-2">catch this Pokemon</p>
            </div>
          </Card>
        </div>
    );
  };
}