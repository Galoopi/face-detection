import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import ImageLinkBox from './components/ImageLinkBox/ImageLinkBox';
import Rank from './components/Rank/Rank';
import FaceDetection from './components/FaceDetection/FaceDetection';
import Clarifai from 'clarifai';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const app = new Clarifai.App({
 apiKey: 'c1710ad3ee3f4960b81f653dffe7e83f'
});

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box: {},
      route: 'signin',
      signedIn: false,
      user: {
        id:'',
        Name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //   .then(response => response.json())
  //   .then(console.log);
  // }

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      Name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  faceBoxLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const height = Number(image.height);
    const width = Number(image.width);
    //console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width, // get width of display
      topRow: clarifaiFace.top_row * height, // get height % of display box
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row  * height),
    }
  }

  faceBoxDisplay = (box) => {
    //console.log(box);
    this.setState({box:box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      app.models
       .predict( Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response => {
          if (response) {
            fetch('http://localhost:3000/image',{
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                email: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState({users:{
                entries:count
              }})
            })
          }
          this.faceBoxDisplay(this.faceBoxLocation(response))
      })
        .catch(err => console.log(err));
  }

  handleRouteChange = (route) => {
    if (route === 'singout') {
      this.setState({signedIn: false})
    }else if (route === 'home') {
      this.setState({signedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    const {signedIn, imageUrl, route, box} = this.state;
    return (
    <div className="App">

      <Navigation signedIn={signedIn} handleRouteChange={this.handleRouteChange}/>
      { route === 'home'
      ? <div>
      <Logo />
      <Rank name={this.state.user.name} entries={this.state.user.entries} />
      <ImageLinkBox
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
          />
      <FaceDetection
          box={box}
          imageUrl={imageUrl}
          />
      </div>
      : (
        route === 'signin'
        ?
        <Signin loadUser={this.loadUser} handleRouteChange={this.handleRouteChange}/>
        :
        <Register loadUser={this.loadUser} handleRouteChange={this.handleRouteChange}/>
        )
      }
      </div>
    );
  }
}
export default App;
