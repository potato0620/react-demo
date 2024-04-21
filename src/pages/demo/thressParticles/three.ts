import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import ThreddHouse from '../threeHouse'


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
  render.setClearColor('#000000')
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  const controler = new OrbitControls(camera, canvas)
  camera.position.set(2, 2, 0)
  
  const particlesGeometry = new THREE.SphereGeometry(1, 32, 32)

  // 创建自己的几何图形
  const particlesgeometry = new THREE.BufferGeometry()
  const count = 20000
  const positions = new Float32Array(count * 3)
  const color = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10 // 随机位置
    color[i] = Math.random() // 随机颜色
  }

  particlesgeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  )
  particlesgeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(color, 3)
  )

  const particlesTexture = textureLoader.load('/public/textures/particles/2.png')

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,// 打开粒子的透视关系
    map: particlesTexture,
    // color: '#11e7c7',
    transparent: true,
    alphaMap: particlesTexture,
    // alphaTest: 0.001,
    // depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  })

  const particles = new THREE.Points(particlesgeometry, particlesMaterial)

  // 来个球
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)

  const spherer = new THREE.Mesh(
    sphereGeometry,
    new THREE.MeshBasicMaterial({
      color: '#a74525',
      wireframe: false,
    })
  )

  scene.add(particles)
  
  // 双击全屏
  window.addEventListener('dblclick', () => {
      if (!document.fullscreenElement) {
        canvas.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  )
  const clock = new THREE.Clock()
  
  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    render.render(scene, camera)
    controler.update()
    window.requestAnimationFrame(tick)
    particles.rotation.y = elapsedTime * 0.2
    
  }
  
  tick()
}

export {
  initThree
}