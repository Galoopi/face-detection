import React from 'react';


class Signin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }
  handleEmailChange = (event)=> {
    this.setState({signInEmail: event.target.value})
  }

  handlePasswordChange = (event)=> {
    this.setState({signInPassword: event.target.value})
  }

  handleSubmitSignIn = ()=> {
    fetch('http://localhost:3000/signin',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user.id){
        this.props.handleRouteChange('home');
      }
    })
  }

  render(){
    const {handleRouteChange} = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-4 center">
        <main className="pa4 black-80">
        <div className="measure ">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f2 fw6 ph0 mh0">Sign In</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input
              onChange={this.handleEmailChange}
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"   type="email"
              name="email-address"
              id="email-address"/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input
              onChange={this.handlePasswordChange}
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"         type="password"
              name="password"
              id="password"/>
      </div>

    </fieldset>
      <div className="">
          <input
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          onClick={this.handleSubmitSignIn}
          type="submit" value="Sign in"/>
        </div>
        <div className="lh-copy mt3">
          <p
          onClick={() => handleRouteChange('register')}
          className="f6 link dim black db pointer">Register</p>
          <a href="#0"
          className="f6 link dim black db">Forgot your password?</a>
        </div>
      </div>
    </main>
  </article>

    );
  }
}

export default Signin;
