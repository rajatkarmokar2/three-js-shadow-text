import * as THREE from 'three'
import { scene,renderer,camera } from './script'
import earthtextureimg from '../img/2k_earth_daymap.jpg'

export const Box = ( props ) => {
    const boxgeometry = new THREE.BoxGeometry()
    const boxmaterial = new THREE.MeshStandardMaterial( { color: 'yellow' } )
    const boxmesh = new THREE.Mesh( boxgeometry,boxmaterial )
    boxmesh.position.y = 1
    boxmesh.castShadow = true
    scene.add( boxmesh );

    const animateBox = ( time ) => {
        cancelAnimationFrame( animateBox )
        boxmesh.rotation.x += .01
        boxmesh.rotation.y += .01
        boxmesh.rotation.z += .01
        boxmesh.position.x = -2
        boxmesh.position.y = Math.abs( Math.cos( time / 500 ) ) + .5
        scene.add( boxmesh )
        renderer.render( scene,camera )
        requestAnimationFrame( animateBox )
    };
    animateBox()
    return { boxmesh }
}
export const Plane = ( props ) => {
    const planegeometry = new THREE.PlaneGeometry( 10,10 );
    const planematerial = new THREE.MeshStandardMaterial( { color: 'white',side: THREE.DoubleSide } );
    const planemesh = new THREE.Mesh( planegeometry,planematerial );
    planemesh.rotation.x = Math.PI * .5 // 90deg
    // planemesh.castShadow = true
    planemesh.receiveShadow = true;
    scene.add( planemesh );
    return { planemesh }
}
export const Sphere = ( props ) => {
    const spheregeometry = new THREE.SphereGeometry( 1,50,50 );
    const spherematerial = new THREE.MeshStandardMaterial( { color: '',wireframe: false } );
    const spheremesh = new THREE.Mesh( spheregeometry,spherematerial );
    scene.add( spheremesh );
    spheremesh.position.set( 2,0,0 )
    spheremesh.castShadow = true

    const loader = new THREE.ImageBitmapLoader();
    loader.setOptions( { imageOrientation: 'flipY' } );
    loader.load( earthtextureimg,function ( imageBitmap ) {
        spheremesh.material = new THREE.MeshStandardMaterial( { color: '',wireframe: false,map: new THREE.CanvasTexture( imageBitmap ) } )
    } )
    const animateSphere = ( time ) => {
        // spheremesh.position.y = Math.abs( Math.sin( time / 500 ) )
        spheremesh.position.y = 1
        spheremesh.rotation.y += .01
        // scene.add( boxmesh )
        renderer.render( scene,camera )
        requestAnimationFrame( animateSphere )
    };
    animateSphere()
    return { spheremesh }
}





