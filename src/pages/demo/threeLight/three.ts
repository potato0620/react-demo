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

  // 环境光 消耗性能最低
  const ambientLight = new THREE.AmbientLight(0xffffff, .1)
  // scene.add(ambientLight)

  // 定向光 消耗性能适中
  const directionalLight = new THREE.DirectionalLight(new THREE.Color('white'), 2)
  directionalLight.position.set(0, 5, 0)
  // scene.add(directionalLight)
  // 定向光helper
  const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1)
  scene.add(directionalLightHelper)

  // 半秋光 消耗性能最低
  const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1)
  // scene.add(hemisphereLight)

  // 半球光hepler
  const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 1)
  // scene.add(hemisphereLightHelper)

  // 点光源 消耗性能适中
  const pointLight = new THREE.PointLight(0xff9000, 10, 10, 2) // 颜色，强度，距离，变暗的量
  pointLight.position.set(0, 2, 0);
  scene.add(pointLight)
  // 点光源hepler
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
  scene.add(pointLightHelper)


  // 广告灯 消耗性能最大
  const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 5, 10, 10)
  rectAreaLight.position.set(0, 0, 2);
  rectAreaLight.lookAt(new THREE.Vector3(0,0,0))
  // scene.add(rectAreaLight)
  // // 广告灯helper
  const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
  scene.add(rectAreaLightHelper)

  // 聚光灯 消耗性能最大
  const spotLight = new THREE.SpotLight(0x78ff00, 10, 10, Math.PI * 0.2, 0.25, 1)
  spotLight.position.set(5, 4, 0);
  spotLight.target.position.set(0, 0, 0); // 旋转聚光灯
  scene.add(spotLight, spotLight.target)

  // 聚光灯helper
  const spotLightHelper = new THREE.SpotLightHelper(spotLight)
  scene.add(spotLightHelper)
  







  
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