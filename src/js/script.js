/** @format */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import spacetextureimg from '../img/space-background-filtered.jpg'
// import spacetextureimg from '../img/2k_earth_daymap.jpg'
import * as GShapes from './boxGeometry'
import * as dat from 'dat.gui';




// var gui = new dat.GUI();

// const freefiremodel = new URL( '../3dmodels/Diamond Royle New Model_Free Fire.glb',import.meta.url )

export const renderer = new THREE.WebGL1Renderer()
renderer.setSize( window.innerWidth,window.innerHeight )
document.body.appendChild( renderer.domElement )


// step 1
export const scene = new THREE.Scene()

// step 2
export const camera = new THREE.PerspectiveCamera(
    50, // depth or field
    window.innerWidth / window.innerHeight, // aspect ratio
    .1,2000 // near, far boundary
)
camera.position.set( 0,4,8 )
// camera.position.set( 4,4,5 )
// camera.rotation.set( .4,.4,.5 )
const controls = new OrbitControls( camera,renderer.domElement );
controls.update();





// texture
const spacetexture = new THREE.CubeTextureLoader()
const color2 = new THREE.Color( 0x0088ff );
// scene.background = color2
scene.background = spacetexture.load( [
    spacetextureimg,
    spacetextureimg,
    spacetextureimg,
    spacetextureimg,
    spacetextureimg,
    spacetextureimg
] )



// step 4 (create objects)

// const { planemesh } = GShapes.Plane( {} )

// const { boxmesh } = GShapes.Box( {} )

// const { spheremesh } = GShapes.Sphere( {} )

const obj_pos = { x: .5,y: -.5 }

// box
const boxgeometry = new THREE.BoxGeometry( 8,.3,8 );
const material = new THREE.MeshPhongMaterial( { color: 0x0022ff } );
const cube = new THREE.Mesh( boxgeometry,material );
cube.castShadow = true
cube.receiveShadow = true
cube.position.set( .2,0,0 )
cube.position.x = obj_pos.x
cube.rotation.y = obj_pos.y
scene.add( cube );

// importing 3d models
const gftlloader = new GLTFLoader();
const rgbeloader = new RGBELoader()
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1;

let textmodel
// rgbeloader.load( './3dmodels/3dmodel/MR_INT-006_LoftIndustrialWindow_Griffintown.hdr',( texture ) => {
//     // texture.mapping = THREE.EquirectangularReflectionMapping
//     // scene.environment = texture
// } )
gftlloader.load( './3dmodels/3_d_text_copy.gltf',function ( gltf ) {
    textmodel = gltf.scene
    const newMaterial = new THREE.MeshPhongMaterial( { color:0xff0000 } );
    // textmodel = new THREE.Mesh( textmodel,newMaterial )
    // console.log(textmodel)
    textmodel.traverse( ( model ) => {
        // console.log(model)
        if ( model.isMesh ) {
            model.material = newMaterial;
            model.castShadow = true
        }
    } );
    console.log( textmodel )
    textmodel.position.set( 0,0,0 )
    // const scale=0
    // textmodel.scale.set(scale,scale,scale)
    textmodel.position.x = obj_pos.x
    textmodel.rotation.y = obj_pos.y
    scene.add( textmodel )
    renderer.render( scene,camera )
    // var dirlight = gui.addFolder( 'text model' );
    // // dirlight.add( options.directionlight,'position',0,0.0010 ).listen();
    // dirlight.add( textmodel.rotation,'x',-100,100 ).listen();
    // dirlight.add( textmodel.rotation,'y',-100,100 ).listen();
    // dirlight.add( textmodel.rotation,'z',-100,100 ).listen();
    // dirlight.add( obj_pos,'x',-1,1 ).listen();
    // dirlight.open();

    function animate ( time ) {
        cancelAnimationFrame( animate )
        // textmodel.rotation.y = time / 1000
        scene.add( textmodel )
        renderer.render( scene,camera )
        requestAnimationFrame( animate )
    }
    animate()
},undefined,function ( error ) {
    console.error( error );
} );

let skullmodel
gftlloader.load( './3dmodels/skull_downloadable/scene.gltf',function ( gltf ) {
    skullmodel = gltf.scene
    // const newMaterial = new THREE.MeshPhongMaterial( {  } );
    // skullmodel = new THREE.Mesh( skullmodel,newMaterial )
    // console.log(skullmodel)
    skullmodel.traverse( ( model ) => {
        // console.log(model)
        if ( model.isMesh ) {
            // model.material = newMaterial;
            model.castShadow = true
        }
    } );
    console.log( skullmodel )
    skullmodel.position.set( 0,3,0 )
    // const scale=0
    // skullmodel.scale.set(scale,scale,scale)
    skullmodel.position.x = obj_pos.x
    skullmodel.rotation.y = obj_pos.y
    scene.add( skullmodel )
    renderer.render( scene,camera )
    // var dirlight = gui.addFolder( 'text model' );
    // // dirlight.add( options.directionlight,'position',0,0.0010 ).listen();
    // dirlight.add( skullmodel.rotation,'x',-100,100 ).listen();
    // dirlight.add( skullmodel.rotation,'y',-100,100 ).listen();
    // dirlight.add( skullmodel.rotation,'z',-100,100 ).listen();
    // dirlight.add( obj_pos,'x',-1,1 ).listen();
    // dirlight.open();

    // var skullgui = gui.addFolder( 'skull model' );
    // // model.add( options.directionlight,'position',0,0.0010 ).listen();
    // skullgui.add( skullmodel.rotation,'x',-10,10 ).listen();
    // skullgui.add( skullmodel.rotation,'y',-10,10 ).listen();
    // skullgui.add( skullmodel.rotation,'z',-10,10 ).listen();
    // skullgui.open();

    function animate ( time ) {
        cancelAnimationFrame( animate )
        // skullmodel.rotation.y = time / 1000
        scene.add( skullmodel )
        renderer.render( scene,camera )
        requestAnimationFrame( animate )
    }
    animate()
},undefined,function ( error ) {
    console.error( error );
} );


// light

// ambient
const ambientlight = new THREE.AmbientLight( 0x222222 )
scene.add( ambientlight )

// directionsl (sun light)
const directionlight = new THREE.DirectionalLight( 0xFFeeee );
directionlight.position.set( 0,10,0 )
directionlight.shadow.camera.near = 0
directionlight.shadow.camera.far = 100
directionlight.castShadow = true
scene.add( directionlight )
// directionlight.shadow.camera.bottom = 0

// spot
const spotlight = new THREE.SpotLight( 0xffffff )
spotlight.position.set( 10,10,20 )
spotlight.shadow.camera.near = 100;
spotlight.shadow.camera.far = 0;
// scene.add( spotlight )
spotlight.castShadow = true
spotlight.angle = .2

// fog
// scene.fog = new THREE.Fog( '0xffffffff',10,100 ) // or
// scene.fog = new THREE.FogExp2( '0xffffffff',0.02 )




// step 5 (add to scene)

// hepler
const gridhelper = new THREE.GridHelper( 5 )
// scene.add( gridhelper )
const axeshelper = new THREE.AxesHelper( 5 )
// scene.add( axeshelper )
const directionlighthelper = new THREE.DirectionalLightHelper( directionlight )
// scene.add( directionlighthelper )
const directionshadowhelper = new THREE.CameraHelper( directionlight.shadow.camera )
// scene.add( directionshadowhelper )
const spotlighthelper = new THREE.SpotLightHelper( spotlight )
// scene.add( spotlighthelper )

// step 3
// renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.shadowMap.enabled = true
renderer.setClearColor( 0x005050 )
renderer.render( scene,camera )

// camera
// spotlight.position = new THREE.Vector3(10,10,20 );
// camera.add( spotlight );

// camera.updateMatrixWorld();
// var vector = camera.position.clone();
// vector.applyMatrix( camera.matrixWorld );



const mouseposition = new THREE.Vector2()
const raycaster = new THREE.Raycaster()

const ajust = { x: 0,y: 10,z: 10 }

const cursor = document.querySelector( '#cursor' )
window.addEventListener( 'mousemove',( e ) => {
    mouseposition.x = ( e.clientX / window.innerWidth ) * 2 - 1
    mouseposition.y = -( e.clientY / window.innerHeight ) * 2 + 1
    raycaster.setFromCamera( mouseposition,camera )
    const intersects = raycaster.intersectObjects( scene.children,true )
    cursor.style.top = e.clientY - 25 + 'px'
    cursor.style.left = e.clientX - 25 + 'px'
    // intersects.map( ( val ) => {
    //     console.log( val.object.id,textmodel.id );
    //     if ( val.object.id === textmodel.id ) {
    //         console.log( val.object.id )
    //         val.object.position.x = 2
    //     }
    // } )
    // console.log(spotlight)
    spotlight.angle = mouseposition.x
    directionlight.position.x = Math.round( Math.sin( mouseposition.x ) * 100 ) + ajust.x
    directionlight.position.y = ajust.y
    directionlight.position.z = -Math.round( Math.sin( mouseposition.y ) * 50 ) + ajust.z

    if ( skullmodel ) {
        skullmodel.rotation.x = - Math.sin( mouseposition.y )/2
        skullmodel.rotation.y =  Math.sin( mouseposition.x )
        // textmodel.rotation.z =  Math.sin( mouseposition.y ) 
    }

    // camera.position.set( -Math.sin( mouseposition.x ) + 1,3,Math.sin( mouseposition.y ) + 5 )

} )


window.addEventListener( 'resize',() => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth,window.innerHeight,true )
} )



// Options to be added to the GUI

// DAT.GUI Related Stuff


// var cam = gui.addFolder( 'Camera' );
// // cam.add( options.camera,'speed',0,0.0010 ).listen();
// cam.add( camera.position,'x',-10,10 ).listen();
// cam.add( camera.position,'y',-10,10 ).listen();
// cam.add( camera.position,'z',-10,10 ).listen();
// cam.add( camera.rotation,'x',-10,10 ).listen();
// cam.add( camera.rotation,'y',-10,10 ).listen();
// cam.add( camera.rotation,'z',-10,10 ).listen();
// cam.open();
// var adjustcam = gui.addFolder( 'ajust Camera' );
// // adjustcam.add( options.camera,'speed',0,0.0010 ).listen();
// adjustcam.add( ajust,'x',-50,50 ).listen();
// adjustcam.add( ajust,'y',-50,50 ).listen();
// adjustcam.add( ajust,'z',-50,50 ).listen();
// adjustcam.open();

// var dirlight = gui.addFolder( 'Direction Light' );
// // dirlight.add( options.directionlight,'position',0,0.0010 ).listen();
// dirlight.add( directionlight.position,'x',-100,100 ).listen();
// dirlight.add( directionlight.position,'y',-100,100 ).listen();
// dirlight.add( directionlight.position,'z',-100,100 ).listen();
// dirlight.open();






// // cube properties
// const cubeProps = {
//     width: 1,
//     height: 1,
//     depth: 1,
//     widthSegments: 1,
//     heightSegments: 1,
//     depthSegments: 1,
//     wireframe: true
// }
// // GUI for exporimenting cube properties
// const props = gui.addFolder( 'Properties' )
// props.add( cubeProps,'width',-30,30 ).step( .5 ).onChange( redraw ).onFinishChange( () => console.dir( cube.geometry ) )
// props.add( cubeProps,'height',-30,30 ).step( .5 ).onChange( redraw )
// props.add( cubeProps,'depth',-30,30 ).step( .5 ).onChange( redraw )
// props.add( cube.position,'x',-30,30 ).step( .5 ).onChange( redraw )
// props.add( cube.position,'y',-30,30 ).step( .5 ).onChange( redraw )
// props.add( cube.position,'z',-30,30 ).step( .5 ).onChange( redraw )
// props.open()
// function redraw () {
//     let newGeometry = new THREE.BoxGeometry(
//         cubeProps.width,
//         cubeProps.height,
//         cubeProps.depth,
//     )
//     cube.geometry.dispose()
//     cube.geometry = newGeometry
// }


// var velocity = gui.addFolder( 'Velocity' );
// velocity.add( options,'velx',-0.2,0.2 ).name( 'X' ).listen();
// velocity.add( options,'vely',-0.2,0.2 ).name( 'Y' ).listen();
// velocity.open();

// var box = gui.addFolder( 'Cube' );
// box.add( cube.scale,'x',0,3 ).name( 'Width' ).listen();
// box.add( cube.scale,'y',0,3 ).name( 'Height' ).listen();
// box.add( cube.scale,'z',0,3 ).name( 'Length' ).listen();
// box.add( cube.material,'wireframe' ).listen();
// box.open();

// gui.add( options,'stop' );
// gui.add( options,'reset' );