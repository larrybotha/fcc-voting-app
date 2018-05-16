import React from 'react';

import {createUser$} from '../../streams/users';

class LoginPage extends Component {
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = e => {
    const {email, password} = this.state;
    e.preventDefault();

    const user$ = createUser$({email, password});

    user$.addListener({
      next(e) {
        console.log(e);
      },
      error(e) {
        console.error(e);
      },
    });
  };

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <form onSubmit={this.handleSubmit}>
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

          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
