import React from 'react';
import {BrowserRouter as Router, Switch, Route}
  from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from '../screens/Home';
import PostPage from '../screens/PostPage';
import AdminPage from '../screens/AdminPage';
import AdminPostPage from '../screens/AdminPostPage';
import LoginPage from '../screens/LoginPage';
import AdminCategoryPage from '../screens/AdminCategoryPage';
import CategoryPage from '../screens/CategoryPage';
import CategoriesPage from '../screens/CategoriesPage';
import PokemonsPage from '../screens/PokemonsPage';
import FavoriPage from '../screens/FavoriPage';
import {Layout} from 'antd';
import Navbar from '../components/Navbar';
import openSocket from 'socket.io-client';
import {BASE_URL} from '../services/api_services';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import NotFound from '../components/NotFound';

const {Headers, Footers, Content} = Layout;
export default function AppRouter(props) {

    const socket = openSocket(BASE_URL);
    socket.on('message', (data) => {
      NotificationManager.info(data.action+" "+data.type);
    })

  return (
      <>
      <NotificationContainer/>

  <Layout>
        <Router>
          <Navbar/>
          <Header/>
          <Content style={{ padding: '14px 50px' }}>
          <Switch>
            <Route exact path="/post/:id" children={<PostPage/>}/>
            <Route exact path="/category/:id" children={<CategoryPage/>}/>
            <Route exact path="/category" children={<CategoriesPage/>}/>
            <Route exact path="/admin" children={<AdminPage/>}/>
            <Route exact path="/pokemon" children={<PokemonsPage/>}/>
            <Route exact path="/favoris" children={<FavoriPage/>}/>
            <Route exact path="/editPost/:id" children={<AdminPostPage/>}/>
            <Route exact path="/editCategory/:id"
                   children={<AdminCategoryPage/>}/>
            <Route exact path="/addPost" children={<AdminPostPage/>}/>
            <Route exact path="/addCategory" children={<AdminCategoryPage/>}/>
            <Route exact path="/login" children={<LoginPage/>}/>
            <Route exact path="/" children={<Home/>}/>
            <Route children={<NotFound/>} />
          </Switch>
          </Content>
            <Footer/>
        </Router>
      </Layout>
      </>
  );
}