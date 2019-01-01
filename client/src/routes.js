import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './components/Home/home';
import Layout from './hoc/layout';
import BookView from './components/Books';
import Login from './components/Login/login';
import UserView from './components/Login/User/userView';
import AddReview from './components/Books/addReview';
import EditReview from './components/Books/editReview';
import UserReviews from './containers/userReviews';
import Register from './containers/register';

import Auth from './hoc/auth';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home, null)} />
                <Route path="/books/:id" exact component={Auth(BookView, null)} />
                <Route path="/user/login" exact component={Auth(Login, false)} />
                <Route path="/user" exact component={Auth(UserView, true)} />
                <Route path="/user/addReview" exact component={Auth(AddReview, true)} />
                <Route path="/user/editReview/:bookId" exact component={Auth(EditReview, true)} />
                <Route path="/user/reviews/" exact component={Auth(UserReviews, true)} />
                <Route path="/user/register/" exact component={Auth(Register, true)} />

            </Switch>
        </Layout>
    );
};

export default Routes;