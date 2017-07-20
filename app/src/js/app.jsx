require('../sass/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';

const THREE = require('three');
require('./OrbitControls.js');
import { fragShader } from './shader/frag.jsx';
import { vertShader } from './shader/vert.jsx';

class ThreeContext extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.clock = new THREE.Clock();
    this.uniforms = {
      time: { value: 0.0 },
    };
    
    this.setupRenderer();
    this.setupScene();
    this.setupControls();
  }

  componentWillUnmount() {

  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer( { antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('context').appendChild(this.renderer.domElement);
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10);
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    let geometry = new THREE.BoxGeometry(3, 3, 3);
    let material = new THREE.ShaderMaterial(
      { 
        vertexShader: vertShader,
        fragmentShader: fragShader,
        uniforms: this.uniforms,
      }
    );
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  
    this.animate();
  }

  setupControls() {
    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    this.controls.enableZoom = false;
  }

  animate() {
    this.renderer.animate(this.renderAnimation.bind(this));
  }

  renderAnimation() {
    this.renderer.render(this.scene, this.camera);
    this.uniforms.time.value += this.clock.getDelta();

    if (this.props.animate) {
      this.cube.rotation.x += 0.003;
      this.cube.rotation.y += 0.005;
    } 
  }

  render() {
    return (
      <div id='context'></div>
    );
  }
}

class AnimateButton extends React.Component {
  constructor(props) {
    super(props);
    this.handlePress = this.props.handleButtonInput;
  }

  render() {
    const style = {
      "position": "absolute",
      "top": "20px",
      "left": "20px",
    }
    return (
      <button style={ style } onClick={ this.handlePress }>push me</button>
    );
  }
}

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = { animate: true };
    this.handleButtonInput = this.handleButtonInput.bind(this);
  }

  handleButtonInput() {
    console.log('press');
    this.setState((prevState) => {
      return { animate: !prevState.animate };
    });
  }

  render() {
    return (
      <div>
        <ThreeContext animate={ this.state.animate }/>
        <AnimateButton handleButtonInput={ this.handleButtonInput }/>
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));