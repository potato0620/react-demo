import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

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

  const textureLoader = new THREE.TextureLoader(loadingManager)
  
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

  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
		canvas: el,
  });

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const group = new THREE.Group()
  
  const control = new OrbitControls(camera, el);
  control.enableDamping = true;

  const fontLoader = new FontLoader()
  const font = await new Promise((resolve,reject) => {
    try {
      fontLoader.load(
        '/public/threeFont/fonts/CozetteVector_Regular.json',
        (font) => {
          console.log('font加载完毕', font);
          resolve(font)
        }
      );
    } catch (error) {
      reject(error)
    }
  })

  const matcapTexture = textureLoader.load('/public/textures/matcaps/8.png')
  // matcapTexture.generateMipmaps = false
	// matcapTexture.minFilter = THREE.NearestFilter
  // matcapTexture.magFilter = THREE.NearestFilter


  const textGeometry = new TextGeometry('Potato and everything', {
    font: font as Font,
    size: .6,
    depth: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5
  })

  textGeometry.computeBoundingBox() /* 计算box边界 */
  console.log(textGeometry.boundingBox);

  // 移动几何体以居中
  // textGeometry.translate(
  //   -textGeometry.boundingBox!.max.x * 0.5,
  //   -textGeometry.boundingBox!.max.y * 0.5,
  //   -textGeometry.boundingBox!.max.z * 0.5
  // )

  /* 调用api以居中 */
  textGeometry.center()
  
  


  const textMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture
  });



  const textModel = new THREE.Mesh(textGeometry, textMaterial);
    // Donuts
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64)

  for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(donutGeometry, textMaterial)
    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10
    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI
    const scale = Math.random() * 2
    donut.scale.set(scale, scale, scale)

    group.add(donut)
  }

  group.add(textModel);

  scene.add(group);


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