import React, {Component} from 'react';

import {createUser} from '../../actions/user';

class SignupPage extends Component {
  state = {email: '', password: ''};

  constructor(props) {
    super(props);
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = e => {
    const {dispatch, createUser} = this.props;
    const {email, password} = this.state;
    e.preventDefault();

    dispatch(createUser({email, password}));
  };

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <form>
          <div>
            <label>email</label>
            <div>
              <input onChange={this.handleChange} name="email" type="email" />
            </div>
          </div>
          <div>
            <label>password</label>
            <div>
              <input
                onChange={this.handleChange}
                name="password"
                type="password"
              />
            </div>
          </div>

          <button onClick={this.handleSubmit} type="submit">
            submit
          </button>
        </form>
      </div>
    );
  }
}

export default SignupPage;
