import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


const initThree = (canvas: HTMLCanvasElement) => {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  const textureLoader = new THREE.TextureLoader()
  const scene = new THREE.Scene()
  const render = new THREE.WebGLRenderer({
    canvas: canvas,
  })

  render.shadowMap.enabled = true
  render.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  render.setSize(sizes.width, sizes.height)
  render.setClearColor('#262837')

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  const controler = new OrbitControls(camera, canvas)

  camera.position.set(2, 2, 6)
  
  const house = new THREE.Group()
  scene.add(house)

  // 灯光
  const ambientLight = new THREE.AmbientLight('#b9d5ff', .15)
  // scene.add(ambientLight)

  const spotLight = new THREE.SpotLight('#b9d5ff', 20, 35, Math.PI * 0.2, 0.25, 1)
  // const spotLightHelper = new THREE.SpotLightHelper(spotLight)
  spotLight.castShadow = true
  spotLight.position.set(15, 20, 0)
  spotLight.target.position.set(0, 0, 0); // 旋转聚光灯
  // scene.add(spotLight, spotLight.target)
  
  // scene.add(spotLight)
  // scene.add(spotLightHelper)

  const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
  doorLight.position.set(0, 2.2, 2.7)
  house.add(doorLight)

  // 加一点雾
  const fog = new THREE.Fog('#262837', 1, 15)
  scene.fog = fog


  // 地板
  const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
  grassColorTexture.repeat.set(5, 5)
  grassColorTexture.wrapS = THREE.RepeatWrapping
  grassColorTexture.wrapT = THREE.RepeatWrapping
  const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
  grassAmbientOcclusionTexture.repeat.set(5, 5)
  grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
  grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
  const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
  grassNormalTexture.repeat.set(5, 5)
  grassNormalTexture.wrapS = THREE.RepeatWrapping
  grassNormalTexture.wrapT = THREE.RepeatWrapping
  const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')
  grassRoughnessTexture.repeat.set(5, 5)
  grassRoughnessTexture.wrapS = THREE.RepeatWrapping
  grassRoughnessTexture.wrapT = THREE.RepeatWrapping
  

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({
      map: grassColorTexture,
      aoMap: grassAmbientOcclusionTexture,
      normalMap: grassNormalTexture,
      roughnessMap: grassRoughnessTexture
    })
  )
  floor.rotation.x = - Math.PI * 0.5
  floor.position.y = 0
  floor.receiveShadow = true
  house.add(floor)
  // 墙壁
  const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
  const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
  const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
  const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
      map: bricksColorTexture,
      aoMap: bricksAmbientOcclusionTexture,
      normalMap: bricksNormalTexture,
      roughnessMap: bricksRoughnessTexture
    })
  )
  wall.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(wall.geometry.attributes.uv.array, 2))
  wall.position.y = 1.25
  wall.castShadow = true
  house.add(wall)

  // 屋顶
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({
      color: '#b35f45',
    })
  )
  roof.castShadow = true
  roof.position.y = 2.5 + 0.5
  roof.rotation.y = Math.PI * 0.25
  house.add(roof)

  //门
  const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
  const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
  const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
  const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
  const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
  const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
  const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

  const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100,100),
    new THREE.MeshStandardMaterial({
      map: doorColorTexture,
      transparent: true,
      alphaMap: doorAlphaTexture,
      aoMap: doorAmbientOcclusionTexture,
      displacementMap: doorHeightTexture,
      displacementScale: 0.1,
      normalMap: doorNormalTexture,
      metalnessMap: doorMetalnessTexture,
      roughnessMap: doorRoughnessTexture
    })
  )
  door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))

  door.position.y = 1
  door.position.z = 2 + 0.01
  house.add(door)

  // 灌木丛 
  const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
  const bushMaterial = new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture
  })
  const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
  bush1.scale.set(0.5, 0.5, 0.5)
  bush1.position.set(1.2, 0.2, 2.2)
  house.add(bush1)
  const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
  bush2.scale.set(0.25, 0.25, 0.25)
  bush2.position.set(2, 0.1, 2.6)
  house.add(bush2)
  const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
  bush3.scale.set(0.4, 0.4, 0.4)
  bush3.position.set(-1.4, 0.1, 2.2)
  house.add(bush3)
  const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
  bush4.scale.set(0.25, 0.25, 0.25)
  bush4.position.set(-1.5, 0.05, 2.7)
  house.add(bush4)

  // 坟墓
  const graves = new THREE.Group()
  const gravesMeterial = new THREE.MeshStandardMaterial({
    color: '#b2b6b1',
  })
  const gravesGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
  

  for (let index = 0; index < 50; index++) {
    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 3 + Math.random() * 6      // Random radius
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus

    // Create the mesh
    const grave = new THREE.Mesh(gravesGeometry, gravesMeterial)
    grave.castShadow = true

    // Position
    grave.position.set(x, 0.3, z)                              

    // Rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4

    // Add to the graves container
    graves.add(grave)
  }

  scene.add(graves)
  

  window.addEventListener('resize', () =>{
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
  
      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
  
      // Update renderer
      render.setSize(sizes.width, sizes.height)
      render.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
  )

  // 双击全屏
  window.addEventListener('dblclick', () => {
      if (!document.fullscreenElement) {
        canvas.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  )
  
  
  const tick = () => {
    render.render(scene, camera)
    controler.update()
    window.requestAnimationFrame(tick)

  }
  
  tick()
}

export {
  initThree
}