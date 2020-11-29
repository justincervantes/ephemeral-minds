import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import auth from "./services/authService";
import HomePage from "./components/homePage";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import Profile from "./components/profilePage";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import JournalEntryForm from "./components/journalEntryForm";
import WeightPage from "./components/weightPage";
import JournalPage from "./components/journalPage";
import NotFoundPage from "./components/notFoundPage";
import { getImageUrl } from "./services/userService";

class App extends Component {
  state = {};

  async componentDidMount() {
    const user = auth.getCurrentUser();
    user.imageUrl = await getImageUrl();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container-fluid">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route
              path="/users/me"
              render={(props) => <Profile user={this.state.user} />}
            />
            <Route
              path="/new-entry"
              render={(props) => (
                <JournalEntryForm user={this.state.user} {...props} />
              )}
            />
            <Route
              path="/"
              exact
              render={(props) => <HomePage user={this.state.user} {...props} />}
            />
            <Route
              path="/journal"
              exact
              render={(props) => (
                <JournalPage user={this.state.user} {...props} />
              )}
            />
            <Route
              path="/posts/:postid"
              render={(props) => (
                <JournalEntryForm user={this.state.user} {...props} />
              )}
            />
            <Route path="/weight" component={WeightPage} />
            <Route path="/not-found" component={NotFoundPage} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
