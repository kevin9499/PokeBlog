import React from 'react';
import Post from '../components/Post';
import {useParams} from 'react-router-dom';

export default function PostPage(props) {
  let {id} = useParams();
  return <Post itemId={id}/>;
}
