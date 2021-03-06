import React, { Component } from "react";
import Cat from "./Cat";
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  //handle the logout button click event
  logOutHandler = async event => {
    //prevent page refresh
    event.preventDefault();
    //amplify signOut
    try {
      Auth.signOut();
      this.props.auth.authenticateUser(false);
      this.props.auth.setAuthUser(null);
      this.props.history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  render() {
    return (
      <nav className="navbar">
        <div className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuth && this.props.auth.user && (
                <p>Hello {this.props.auth.user.username}</p>
              )}
              {this.props.auth.isAuth && this.props.auth.user && (
                <a href="/cat" className="button btn-info">
                  Cats
                </a>
              )}

              <div className="auth-buttons">
                {/* <a href="/register" className="button is-primary">
                  <strong>Register</strong>
                </a>
                <a href="/login" className="button is-light">
                  Log in
                </a> */}
                {!this.props.auth.isAuth && (
                  <div>
                    <a href="/register" className="button is-primary">
                      <strong>Register</strong>
                    </a>
                    <a href="/login" className="button is-light">
                      Log in
                    </a>
                  </div>
                )}
                {this.props.auth.isAuth && (
                  <div>
                    <a
                      href="/changepassword"
                      onClick={this.logOutHandler}
                      className="button is-light is-warning"
                    >
                      Change Password
                    </a>
                    <a
                      href="/"
                      onClick={this.logOutHandler}
                      className="button is-light"
                    >
                      Log out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
export default withRouter(Navbar);
