import React, { Component } from 'react'
import { Card } from 'antd';
import { Col } from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import {removeData, storeData} from '../services/localStorages';
import img from '../components/asset/pokeOpen.png'

class StoreImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: []
    }
  }
  handleClick = (image_data) => {
    let storage = JSON.parse(window.localStorage.getItem('pokemons'));
    let newStorage  = {
      pokemons: []
    }
    console.log(storage)
    if (storage !== null) {
      removeData("pokemons")
      for(let i = 0; i < storage.pokemons.length;i++){
        if(storage.pokemons[i] !== image_data){
          newStorage.pokemons.push(storage.pokemons[i])
        }
      }
      this.setState({pokemons: newStorage.pokemons})
      storeData("pokemons",JSON.stringify(newStorage))
    }
    this.props.refresh()
  };

  render() {
    return (
        <Col className="gutter-row" span={5} style={{ margin: ' 5px 0px 5px 0px' }}>
          <Card hoverable style={{ width: "100%", height: "100%" }}>
            <img alt={this.props.key} src={this.props.img} style={{width:"100%"}} />
            <div className="add-to-fav" style={{color:"red"}} onClick={() => this.handleClick(this.props.img)}>
             <img className="offset-5 mb-2 mt-2" alt="pokemon" src={img} style={{width:"40px"}}/> <p className="offset-3">Drop this Pokemon</p>
            </div>
          </Card>
        </Col>
    );
  }
}
export default StoreImg;