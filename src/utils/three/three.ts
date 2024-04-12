import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function createScene() {
  return new THREE.Scene()
}

function createPerspectiveCamera(aspect: number) {
  const camera = new THREE.PerspectiveCamera(50, aspect, 0.01, 1000)
  camera.position.set(0, 0, 10)
  return camera
}

function createRenderer(root: HTMLElement) {
  const dpr = Math.max(window.devicePixelRatio, 2)

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  })
  renderer.setPixelRatio(dpr)
  renderer.setSize(root.offsetWidth, root.offsetHeight)

  renderer.toneMapping = THREE.NoToneMapping
  root.appendChild(renderer.domElement)

  return renderer
}

export function presetThree(root: HTMLElement) {
  const scene = createScene()
  const camera = createPerspectiveCamera(root.offsetWidth / root.offsetHeight)
  const renderer = createRenderer(root)

  scene.add(camera)

  return {
    camera,
    scene,
    renderer,
  }
}

export function presetFullThree(
  canvas: HTMLCanvasElement,
  cameraParams: {
    fov?: number
    near?: number
    far?: number
  } = {
    far: 10000,
    near: 0.01,
    fov: 45,
  },
) {
  const w = canvas.offsetWidth
  const h = canvas.offsetHeight

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(cameraParams.fov, w / h, cameraParams.near, cameraParams.far)
  scene.add(camera)

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas,
    alpha: true,
  })

  renderer.toneMapping = THREE.NoToneMapping

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.zoomSpeed = 1

  renderer.setPixelRatio(2)
  renderer.setSize(w, h)
  renderer.setClearColor(new THREE.Color(0x000000))

  window.addEventListener('resize', () => {
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(2)
    renderer.setSize(w, h)
  })

  return {
    camera,
    scene,
    renderer,
    controls,
  }
}
