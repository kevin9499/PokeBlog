import React from 'react';
import {useParams} from 'react-router-dom';
import CategoryForm from '../components/CategoryForm';

export default function AdminCategoryPage(props) {
  let {id} = useParams();
  return <CategoryForm itemId={id}/>;
}