import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as dat from 'lil-gui'
import gsap from 'gsap'



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

  const gui = new dat.GUI({ title: 'shadowcamera' })
  
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

  camera.position.z = 15;
  camera.position.y = 4;

  gui.add(camera.position, 'x').min(-10).max(10).step(0.01)
  gui.add(camera.position, 'y').min(-10).max(10).step(0.01)
  gui.add(camera.position, 'z').min(-10).max(10).step(0.01)

  const renderer = new THREE.WebGLRenderer({
    canvas: el,
  });

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.type = THREE.PCFSoftShadowMap // 更改阴影贴图类型


  // 打开阴影贴图
  // renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  //创建几个几何体

  const sphere = new THREE.Mesh(
		new THREE.SphereGeometry(1, 32, 32),
		new THREE.MeshStandardMaterial({roughness: 0.1})
  )

  sphere.position.x = 3
  // 打开投射阴影
  sphere.castShadow = true

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({roughness: 0.1, })
  )
  // 打开投射阴影
  cube.castShadow = true
  gui.add(cube.position,'x',-10,10,0.001).name('cube positon x')

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.5, 16, 32),
    new THREE.MeshStandardMaterial({roughness: 0.1})
  )
  torus.position.x = -3
  /* 打开投射阴影 */
  torus.castShadow = true

  // 字体
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


  const matcapTexture = new THREE.TextureLoader().load('/public/textures/matcaps/8.png')

  const textGeometry = new TextGeometry('you can move cube of a s d w', {
    font: font as Font,
    size: 1.2,
    depth: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5
  })

  textGeometry.center()

  const textModel = new THREE.Mesh(textGeometry, new THREE.MeshMatcapMaterial({ matcap: matcapTexture }));
  textModel.castShadow = true
  textModel.position.y = 6
  
  scene.add(textModel)

  // baking shadow
  const shadow = new THREE.TextureLoader().load('/public/textures/shadow/bakedShadow.jpg')


  // 创建一个平面
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({ side: THREE.DoubleSide})
  )

  plane.rotateX(Math.PI / 2)

  plane.position.y = -1.6

  // 创建一个阴影平面
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      alphaMap: new THREE.TextureLoader().load('/public/textures/shadow/simpleShadow.jpg')
    })
  )
  shadowPlane.rotation.x = -Math.PI / 2
  shadowPlane.position.y = plane.position.y + 0.01
  scene.add(shadowPlane)


  // gui.add()
  const aniObj = {
    translate() {
      // shadowPlane.position.x = 3
      // cube.position.x = shadowPlane.position.x + 0.01
      gsap.to(shadowPlane.position, {
        x: 3,
        z:3,
        duration: 1,
        onUpdate: () => {
          cube.position.x = shadowPlane.position.x + 0.01
          cube.position.z = shadowPlane.position.z + 0.01
        }
      })
    },

    fullscreen() {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        el.requestFullscreen()
      }
      
    }
  }
  gui.add(aniObj, 'translate')
  gui.add(aniObj, 'fullscreen')
 
  // 打开接收阴影
  plane.receiveShadow = true

  const group = new THREE.Group()

  group.add(sphere, cube, torus, plane)

  scene.add(group)

  //定向光
  const directionalLight = new THREE.DirectionalLight(new THREE.Color('white'), 1)
  directionalLight.position.set(5, 5, 0)
  const dirhelper = new THREE.DirectionalLightHelper(directionalLight, 2)
  const dirShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
  // scene.add(dirhelper)

  // 打开阴影投射
  directionalLight.castShadow = true
  directionalLight.shadow.camera.near = 1
  directionalLight.shadow.camera.far = 20

  directionalLight.shadow.camera.top = 10
  directionalLight.shadow.camera.right = 2
  directionalLight.shadow.camera.bottom = - 5
  directionalLight.shadow.camera.left = - 2 
  directionalLight.shadow.radius = 1 // 设置这个属性没啥用 ，why
  
  gui.add(directionalLight.shadow.camera, 'top', -20, 20, 0.001).onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
  })
  gui.add(directionalLight.shadow.camera, 'right', -20, 20, 0.001).onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
  })
    
  gui.add(directionalLight.shadow.camera, 'bottom', -20, 20, 0.001).onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
  })
  gui.add(directionalLight.shadow.camera, 'left', -20, 20, 0.001).onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
  })

  gui.add(directionalLight.shadow,'radius',0 , 100, 0.001).onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
  })
  

  // scene.add(directionalLight)
  // scene.add(dirShadowHelper)
  // 环境光
  const ambientLight = new THREE.AmbientLight(new THREE.Color('white'), 0.5)
  // scene.add(ambientLight)

  // directionalLight.shadow.camera.top = 10

  // 聚光灯
  const spotLight = new THREE.SpotLight(new THREE.Color('yellow'), 5, 15, Math.PI * 0.2, 0.25, 1)
  spotLight.position.set(-5, 5, 5)
  spotLight.castShadow = true
  // scene.add(spotLight)
  // scene.add(new THREE.SpotLightHelper(spotLight))
  // console.log(spotLight.shadow, '聚光灯shadow');
  // spotLight.shadow.mapSize.set(1024 * 2, 1024 * 2)
  spotLight.shadow.mapSize.width = 1024 * 2;
  spotLight.shadow.mapSize.height = 1024 * 2;
  // spotLight.shadow.radius = 100
  

  spotLight.shadow.mapSize.width = 512 *2; // default
  spotLight.shadow.mapSize.height = 512 *2; // default
  spotLight.shadow.camera.near = 4; // default
  spotLight.shadow.camera.far = 10 // default
  spotLight.shadow.camera.fov = 100;
  gui.add(spotLight.shadow.camera,'fov',0 , 100, 0.001).onChange(() => {
    spotLight.shadow.camera.updateProjectionMatrix()
  })
  gui.add(spotLight.shadow.camera,'near',0 , 100, 0.001).onChange(() => {
    spotLight.shadow.camera.updateProjectionMatrix()
  })
  gui.add(spotLight.shadow.camera,'far',0 , 100, 0.001).onChange(() => {
    spotLight.shadow.camera.updateProjectionMatrix()
  })



  const helper = new THREE.CameraHelper(spotLight.shadow.camera);
  // scene.add(helper);

  // 点光源
  const pointLight = new THREE.PointLight(new THREE.Color('red'), 20)
  // scene.add(new THREE.PointLightHelper(pointLight))

  pointLight.position.set(0, 2, -3) 
  pointLight.castShadow = true
  pointLight.shadow.camera.near = 1
  pointLight.shadow.camera.far = 20
  scene.add(pointLight)
  // scene.add(new THREE.CameraHelper(pointLight.shadow.camera))




  const control = new OrbitControls(camera, el);
  // control.enableDamping = true;


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

  // 写一个用asdw控制cube移动的逻辑
  window.addEventListener('keydown', (e) => {
    
    if (e.key === 'w') {
      // cube.position.z -= 1
      // shadowPlane.position.z -= 1 
      gsap.to(shadowPlane.position, {
        z: shadowPlane.position.z -1,
        duration: 0.1,
        onUpdate: () => {
          cube.position.z = shadowPlane.position.z + 0.01
        }
      })

    }
    if (e.key === 's') {
      // cube.position.z += 1
      // shadowPlane.position.z += 1
      gsap.to(shadowPlane.position, {
        z: shadowPlane.position.z +1,
        duration: 0.1,
        onUpdate: () => {
          cube.position.z = shadowPlane.position.z + 0.01
        }
      })
    }
    if (e.key === 'a') {
      // cube.position.x -= 1
      // shadowPlane.position.x -= 1
      gsap.to(shadowPlane.position, {
        x: shadowPlane.position.x -1,
        duration: 0.1,
        onUpdate: () => {
          cube.position.x = shadowPlane.position.x + 0.01
        }
      })
    }
    if (e.key === 'd') {
      // cube.position.x += 1
      // shadowPlane.position.x += 1
      gsap.to(shadowPlane.position, {
        x: shadowPlane.position.x +1,
        duration: 0.1,
        onUpdate: () => {
          cube.position.x = shadowPlane.position.x + 0.01
        }
      })
   }
  })

  
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