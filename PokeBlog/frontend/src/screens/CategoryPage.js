import React from 'react';
import {useParams} from 'react-router-dom';
import Category from '../components/Category';

export default function CategoryPage(props) {
  let {id} = useParams();
  return <Category itemId={id}/>;
}
