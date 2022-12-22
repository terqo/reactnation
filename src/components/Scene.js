import {useRef, useEffect} from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const Scene = () => {

  const mountRef = useRef(null)
  useEffect(() => {
      const currentMount = mountRef.current

      //scene
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        25,
        currentMount.clientWidth / currentMount.clientHeight,
        0.1,
        1000
    )

    camera.position.z = 12
    scene.add(camera)
    
    //renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(currentMount.clientWidth,currentMount.clientHeight)
    currentMount.appendChild(renderer.domElement)

    //Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    //controls.target = new THREE.Vector3(3,3,3)
    controls.enableDamping = true 


    //cube
    const cube = new THREE.Mesh(
      new THREE.BoxBufferGeometry(1,1,1),
      new THREE.MeshBasicMaterial({
        color:0xff0000,
        transparent:true,
        opacity: 0.3,
        wireframe: true,

      })
    )
    scene.add(cube)
    console.log('se mostro el objeto')

    //Sphere
    const textureLoader = new THREE.TextureLoader()
    const matcap = textureLoader.load('./textures/matcap3.png')

    const geometry = new THREE.SphereGeometry( 0.8, 32, 16 );
    const material = new THREE.MeshMatcapMaterial( { 
        matcap : matcap
     } );
    const sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
    sphere.position.y = 1.5

    //torus
    const geometry1 = new THREE.TorusKnotGeometry( 0.5, 0.18, 100, 16 );
    const material1 = new THREE.MeshNormalMaterial( { 
        flatShading: true,
    } );
    const torusKnot = new THREE.Mesh( geometry1, material1 );
    scene.add( torusKnot );
    //torusKnot.position.set(-2,-0.5,0)
    //torusKnot.scale.set(2,2,1)
    torusKnot.position.y = -1.5
    
    //Donut xd
    const textureLoader2 = new THREE.TextureLoader()
    const matcap2 = textureLoader2.load('./textures/matcap1.png')

    const geometry2 = new THREE.TorusGeometry( 0.65, 0.15, 20, 100 );
    const material2 = new THREE.MeshMatcapMaterial( { 
      matcap: matcap2
    } );
    const torus = new THREE.Mesh( geometry2, material2 );
    scene.add( torus );
    torus.position.x = 2

    //octahedron
    const textureLoader3 = new THREE.TextureLoader()
    const map = textureLoader3.load('./grass/basecolor.png')
    const aoMap = textureLoader3.load('./grass/AO.png')
    const roughnessMap = textureLoader3.load('./grass/roughness.png')
    const normalMap = textureLoader3.load('./grass/normal.png')
    const heightMap = textureLoader3.load('./grass/height.png')

    const geometry3 = new THREE.OctahedronGeometry( 0.65, 2);
    const material3 = new THREE.MeshStandardMaterial({
      map: map,
      aoMap: aoMap,
      roughnessMap: roughnessMap,
      normalMap: normalMap,
      displacementMap: heightMap
    });
    const octahedron = new THREE.Mesh( geometry3, material3 );
    scene.add( octahedron );
    octahedron.position.x = -2

    //lights
    const AO = new THREE.AmbientLight('white', 1)
    scene.add(AO)

    //render the scene 
    const animate = () => {
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)

    }
    animate()
    
    //clean up scene 
    return () => {
      currentMount.removeChild(renderer.domElement)
    }

  }, [])

  return (
    <div 
      className='Contenedor3D'
      ref={mountRef}
      style={{width: '100%', height:'100vh'}}
    >

    </div>
  )
}

export default Scene