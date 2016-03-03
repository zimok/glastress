import React, { Component } from 'react'
import ThreeScene from '../components/ThreeScene'

import THREE from 'three'
import TWEEN from 'tween'

export default class IcosahedronButton extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mouseover: false,
    }

    this.mouseOver = this.mouseOver.bind(this)
    this.mouseOut = this.mouseOut.bind(this)

    this.animate = this.animate.bind(this)
    this.renderScene = this.renderScene.bind(this)
  }

  mouseOver() {
    this.setState({
      mouseover: true
    })
  }

  mouseOut() {
    this.setState({
      mouseover: false
    }) 
  }

  renderScene(scene, camera, renderer) {
    this.mesh = this.drawIco()
    scene.add(this.mesh)
  }

  drawIco() {
    const geometry = new THREE.IcosahedronGeometry( 320 );
    //const geometry = new THREE.TorusKnotGeometry(320, 40, 120, 4)
    const material = new THREE.MeshPhongMaterial( { 
      color: this.props.color||0xffffff, 
      wireframe: true,
      wireframeLinewidth: 0.1
      // transparent: true,
      // opacity: 1.0
    });
    const mesh = new THREE.Mesh( geometry, material);
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 1
    return mesh
    
  }

  drawMenu() {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3( -200, 0, 0 ),
      new THREE.Vector3( 200, 0, 0 ),
      new THREE.Vector3( -200, 120, 0 ),
      new THREE.Vector3( 200, 120, 0 ),
      new THREE.Vector3( -200, 240, 0 ),
      new THREE.Vector3( 200, 240, 0 )
    );

    var material = new THREE.LineBasicMaterial({
      color: 0xffffff
    });

    var lineSegments = new THREE.LineSegments( geometry, material );
    return lineSegments 
  }

  animate(scene, camera) {
    
    if(this.state.mouseover) {

      // const lineSegments = this.drawMenu()

      // this.mesh.geometry.vertices.forEach((v, i) => {
      //   if(lineSegments.geometry.vertices[i]) {
      //     v.x += lineSegments.geometry.vertices[i].x
      //     v.y += lineSegments.geometry.vertices[i].y
      //     v.z += lineSegments.geometry.vertices[i].z
      //   } else {
      //     this.mesh.geometry.vertices.pop()
      //   }

      //   this.mesh.geometry.dynamic = true;
      //   this.mesh.geometry.verticesNeedUpdate = true;
      // })
      scene.rotation.x += 0.01
      scene.rotation.y += 0.01
      scene.rotation.z += 0.01
    }

    //TWEEN.udpate()

  }

  render() {

    return (
      <div 
        onMouseOver={this.mouseOver} 
        onMouseOut={this.mouseOut} 
        onClick={this.props.onClick} 
        style={{cursor:'pointer'}}>
        <ThreeScene 
          ambientLightColor={0xffffff}
          fogColor={0x121212}
          height={96}
          width={96}
          initScene={this.renderScene} 
          animate={this.animate}
          alpha={true} />
      </div>)
  }
}