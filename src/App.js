import React from 'react';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import CreatePost from './pages/createPost/CreatePost';
import GetShortPosts from './pages/getShortPosts/GetShortPosts';
import SignOut from './pages/signOut/SignOut';
import Navigation from './components/navigation/Navigation';
import Users from './pages/Users/Users';
import Settings from './pages/settings/Settings';
import PostWayPoint from './pages/postsWayPoint/PostsWayPoint';
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import { PrivateRoute } from './components/privateRoute/PrivateRoute';
import './styles/styles.scss';


const App = () => {
  return (
    <Router>
      <div className="header wrapper">
        <Navigation />
        <Switch>
          <Route exact path="/">
            <GetShortPosts />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <PrivateRoute path="/newpost" component={CreatePost}/>
          <PrivateRoute path="/signout" component={SignOut}/>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/postwaypoint">
            <PostWayPoint />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;