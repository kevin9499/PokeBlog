import React from 'react';
import {useParams} from 'react-router-dom';
import PostForm from '../components/PostForm';

export default function AdminPostPage(props) {
  let {id} = useParams();
  return <PostForm itemId={id}/>;
}