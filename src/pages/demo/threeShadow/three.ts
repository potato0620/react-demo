import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

const initThree = async (el: HTMLCanvasElement) => {
  	// const img = new Image()
	/* 多个图片加载 */
	const loadingManager = new THREE.LoadingManager()
	loadingManager.onStart = () => {
		console.log('开始加载')
	}
	loadingManager.onLoad = () => {
		console.log('加载完成');
		
	}
	loadingManager.onError = () => {
		console.log('加载出错');
		
	}

  
  const sizes = {
		width: window.innerWidth,
		height: window.innerHeight,
  };

  const scene = new THREE.Scene();
  

  const camera = new THREE.PerspectiveCamera(
		75,
		sizes.width / sizes.height,
		0.1,
		1000
  );

  camera.position.z = 10;
  camera.position.y = 2;

  const renderer = new THREE.WebGLRenderer({
		canvas: el,
  });

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  //创建几个几何体

  const sphere = new THREE.Mesh(
		new THREE.SphereGeometry(1, 32, 32),
		new THREE.MeshStandardMaterial({roughness: 0.1})
  )

  sphere.position.x = 3

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({roughness: 0.1})
  )

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.5, 16, 32),
    new THREE.MeshStandardMaterial({roughness: 0.1})
  )
  torus.position.x = -3
  

  // 创建一个平面
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 10),
    new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide})
  )

  plane.rotateX(Math.PI / 2)

  plane.position.y = -1.6

  const group = new THREE.Group()

  group.add(sphere, cube, torus, plane)

  scene.add(group)

  const directionalLight = new THREE.DirectionalLight(new THREE.Color('white'), 2)
  directionalLight.position.set(0, 5, 0)
  scene.add(directionalLight)





  const control = new OrbitControls(camera, el);
  control.enableDamping = true;


  window.addEventListener('resize', () =>
  {
    
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }
  )
  
  const tick = () => {
    control.update();
    renderer.render(scene, camera);

		window.requestAnimationFrame(tick);
  };

	tick();
}


export {
  initThree
}