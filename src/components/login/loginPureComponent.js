import React, {  PureComponent, useState, useEffect } from 'react'

export class Login extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
 



  handleSubmit = (e) => {
    e.preventDefault()
    const { username, password } = this.state
    console.log('Username:', username)
    console.log('Password:', password)
  }

  render() {
    return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          
          <div>{this.state.username}<div/>
            <label>Username:</label>
            <input type="text" name="username" onChange={this.handleChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={this.handleChange} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default Login
