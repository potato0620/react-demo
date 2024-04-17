import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui';
import gsap from 'gsap';

export type Dat =  dat.GUI;

const initThree = (canvas: HTMLCanvasElement) => {
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
	const doorColorTexture = textureLoader.load('/public/textures/door/color.jpg')
	const doorAlphaTexture = textureLoader.load('/public/textures/door/alpha.jpg')
	const doorAmbientOcclusionTexture = textureLoader.load('/public/textures/door/ambientOcclusion.jpg')
	const doorHeightTexture = textureLoader.load('/public/textures/door/height.jpg')
	const doorNormalTexture = textureLoader.load('/public/textures/door/normal.jpg')
	const doorMetalnessTexture = textureLoader.load('/public/textures/door/metalness.jpg')
	const doorRoughnessTexture = textureLoader.load('/public/textures/door/roughness.jpg')

	
	/* 设置允许纹理重复 */
	// texture.wrapS = THREE.RepeatWrapping
	// texture.wrapT = THREE.RepeatWrapping
	/* 镜像 */
	// texture.wrapS = THREE.MirroredRepeatWrapping
	// texture.wrapT = THREE.MirroredRepeatWrapping
	/* 设置纹理偏移 */
	// texture.offset.x = 0.5
	// texture.offset.y = 0.5
	/* 设置纹理重复次数 */
	// texture.repeat.x = 2
	// texture.repeat.y = 2
	/* 缩小纹理过滤器 */
	/* That will slightly offload the GPU */
	doorColorTexture.generateMipmaps = false
	doorColorTexture.minFilter = THREE.NearestFilter
		/*纹理放大过滤器 当纹理像素小于渲染像素而造成模糊时可以用texture.magFilter 贴像素风图的时候如果模糊了可以用这个来处理 NeatestFilter 默认为 LinearFilter*/
	doorColorTexture.magFilter = THREE.NearestFilter

	/* 创建一个基础材质 */
	// const material = new THREE.MeshBasicMaterial({
	// 	color: new THREE.Color('pink'),
	// 	map: texture,
	// 	wireframe: false,
	// 	transparent: true, /* 透明 on */
	// 	opacity: 0.4,
	// 	alphaMap: texture, /* 带有纹理的透明度(可以看到后面模型的纹理) */
	// 	side: THREE.DoubleSide, /* 控制渲染面 默认双面 */
	// });
	/* 创建一个Normal材质 */
	// const material = new THREE.MeshNormalMaterial({
	// 	// flatShading: true,
	// 	side: THREE.DoubleSide,
	// 	bumpMap:texture
	// })

	/* 创建一个 Matcap 材质 */
/* 	const material = new THREE.MeshMatcapMaterial({
		matcap: texture
	}) */
	/* 创建一个MeshDepth材质 离相机越近的颜色越浅 */
	// const material = new THREE.MeshDepthMaterial({
	// })

	// const material = new THREE.MeshLambertMaterial()

	// const material = new THREE.MeshPhongMaterial({
	// 	shininess: 1000,
	// 	map: texture,
	// 	specular: new THREE.Color('skyblue'),
	// 	side: THREE.DoubleSide
	// })

	// const material = new THREE.MeshToonMaterial({
	// 	gradientMap: texture
	// })

	const material = new THREE.MeshStandardMaterial({
		map: doorColorTexture,
		side: THREE.DoubleSide,
		aoMap: doorAmbientOcclusionTexture,
		displacementMap: doorHeightTexture,
		aoMapIntensity: 1,
		displacementScale: 0.05,
		normalMap: doorNormalTexture,
		normalScale: new THREE.Vector2(0.5, 0.5),
		metalnessMap: doorMetalnessTexture,
		roughnessMap: doorRoughnessTexture,
		transparent: true,
		alphaMap: doorAlphaTexture,
	})
	// material.roughness = 0 /* 粗糙度 0 - 1 光滑-粗糙*/
	// material.metalness = 1 /* 金属度 0 - 1 */



	const envTextureLoader = new THREE.CubeTextureLoader()
	const envTexture = envTextureLoader.load([
		'/textures/environmentMaps/0/px.jpg',
		'/textures/environmentMaps/0/nx.jpg',
		'/textures/environmentMaps/0/py.jpg',
		'/textures/environmentMaps/0/ny.jpg',
		'/textures/environmentMaps/0/pz.jpg',
		'/textures/environmentMaps/0/nz.jpg',
	])

		/* 环境贴图 */
		const envMaterial = new THREE.MeshStandardMaterial({
			metalness: 1,
			roughness: 0,
			envMap: envTexture,
			side: THREE.DoubleSide,
		})

	
	// img.onload = () => {
	// 	console.log('图片加载成功')
	// 	/* 创建一个纹理 */
	// 	texture.needsUpdate = true
	// }
	// img.src = phoneImg
	

	
	const sizes = {
		width: window.innerWidth,
		height: window.innerHeight,
	};
	const parameters = {
		color: 0xff0000,
		spin: () => {
			gsap.to(group.rotation, { duration: 2, y: group.rotation.y + Math.PI * 2 })
			gsap.to(group.rotation, { duration: 2, x: group.rotation.x + Math.PI * 1 })
		},
		fullScreen: () => {
			if (!document.fullscreenElement) {
				canvas.requestFullscreen();
			} else {
				document.exitFullscreen();
			}
		}
	};
	/* 创建一个场景 */
	const scene = new THREE.Scene(); 
	/* 实例化一个debugui */
	const gui = new dat.GUI({title:'哈哈哈fuck you'});
	// scene.position.x =-5
	/* 创建一个对象 */
	const group = new THREE.Group(); /* 创建一个组 */
	// group.position.x = 5
	/* 创建一点灯光 */
	const ambientLight = new THREE.AmbientLight(0xffffff, 1);

	const pointLight = new THREE.PointLight(0xffffff, 10)
	pointLight.position.x = 2
	pointLight.position.y = 3
	pointLight.position.z = 4

	scene.add(group);
	scene.add(ambientLight);
	scene.add(pointLight);

	const cube1 = new THREE.Mesh(
		new THREE.SphereGeometry(0.5, 64, 64),
		envMaterial
	);
	// cube1.position.x = -1.5;
	cube1.geometry.setAttribute('uv2', new THREE.BufferAttribute(cube1.geometry.attributes.uv.array, 2))
	
	const cube2 = new THREE.Mesh(
		new THREE.PlaneGeometry(1, 1, 100, 100),
		envMaterial
	);
	cube2.position.x = -1.5;
	cube2.geometry.setAttribute('uv2', new THREE.BufferAttribute(cube2.geometry.attributes.uv.array, 2))

	const cube3 = new THREE.Mesh(
		new THREE.TorusGeometry(0.3, 0.2, 64, 128),
		envMaterial
	);

	cube3.position.x = 1.5;
	cube3.geometry.setAttribute('uv2', new THREE.BufferAttribute(cube3.geometry.attributes.uv.array, 2))

	const myGeometry = new THREE.BufferGeometry();

	const myVertices = new Float32Array([
		0,0,0, // First vertex
		0,1,0, // Second vertex
		1,0,0, // Third vertex
	]);

	const positionsArr = new THREE.BufferAttribute(myVertices, 3);
	myGeometry.setAttribute('position', positionsArr);

	// const cube4 = new THREE.Mesh(
	// 	myGeometry,
	// 	new THREE.MeshBasicMaterial({
	// 		color: 'red',
	// 		wireframe: true,
	// 	})
	// )

	// cube4.position.x = 5.5

	group.add(cube2, cube1, cube3);

	// gui.add(group.position, 'x', -10, 10, 0.01);
	/* 添加控制UI debugUI */
	// const folder1 =  gui.addFolder('哈哈哈');
	gui.add(group.position, 'y').min(-10).max(10).step(0.001);
	gui.add(group.position, 'x').min(-10).max(10).step(0.001);
	gui.add(material, 'roughness').min(0).max(1).step(0.00001).name('粗糙度');
	gui.add(material, 'metalness').min(0).max(1).step(0.00001).name('金属度');
	gui.add(group.position, 'z').min(-10).max(10).step(0.001).name('z轴位置');
	gui.add(cube1, 'visible').name('是否显示cube1');
	gui.add(cube2, 'visible').name('是否显示cube2');
	gui.add(cube3, 'visible').name('是否显示cube3');
	gui.add(envMaterial, 'metalness').min(0).max(1).step(0.00001).name('金属度');
	gui.add(envMaterial, 'roughness').min(0).max(1).step(0.00001).name('金属度');
	// gui.add(cube1.material, 'wireframe').name('cube1`s wireframe')
	// gui.addColor(parameters, 'color').onChange(() => {
	// 	cube1.material.color.set(parameters.color);
	// }).name('cube1`s color')

	gui.add(parameters, 'spin')
	gui.add(parameters, 'fullScreen')
	// gui.hide()


	// const geometry = new THREE.BoxGeometry(1, 1, 1);
	/* 创建一个材质 */
	// const material = new THREE.MeshBasicMaterial({ color: 'skyblue' });
	/* 创建一个网格 */
	// const mesh = new THREE.Mesh(geometry, material);
	/* 缩放对象 */
	// mesh.scale.set(2, 2, 2);

	/* 对象位置的操作 */
	// mesh.position.x = Math.PI * 0.5
	// mesh.position.y = Math.PI * 0.5
	// mesh.position.x = 0.7;
	// mesh.position.y = -0.6;
	// mesh.position.z = 1;
	// mesh.scale.x = 2;
	// mesh.scale.y = 0.25;
	// mesh.scale.z = 0.5;
	// mesh.rotation.x = Math.PI * 0.25;
	// mesh.rotation.y = Math.PI * 0.25;

	/* 轴线 */
	// const Axes = new THREE.AxesHelper(6);
	// scene.add(mesh);
	// scene.add(Axes);

	// const aspectRatio = sizes.width / sizes.height;

	/* 创建一个透视相机 */
	const camera = new THREE.PerspectiveCamera(
		75,
		sizes.width / sizes.height,
		0.1,
		100
	);
	/* 创建一个正交相机 */
	// const camera = new THREE.OrthographicCamera(
	// 	-1 * aspectRatio,
	// 	1 * aspectRatio,
	// 	1,
	// 	-1,
	// 	0.1,
	// 	100
	// );

	camera.position.set(0, 0, 10);
	// camera.position.x = 1;
	// camera.position.y = 1;

	camera.lookAt(new THREE.Vector3(0, 0, 10));

	const renderer = new THREE.WebGLRenderer({
		canvas: canvas,
	});

	renderer.setSize(window.innerWidth, window.innerHeight);

	renderer.render(scene, camera);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	// const clock = new THREE.Clock();

	// gsap.to(group.position, { duration: 1, delay: 1, x: 2, y: 5 });

	const cursor = {
		x: 0,
		y: 0,
	};
	/* 添加控制器 */
	window.addEventListener('mousemove', (e) => {
		cursor.x = e.clientX / sizes.width - 0.5;
		cursor.y = -(e.clientY / sizes.height - 0.5);
		// console.log(e.clientX, e.clientY);
	});

	window.addEventListener('resize', () => {
		sizes.height = window.innerHeight;
		sizes.width = window.innerWidth;
		// Update camera
		camera.aspect = sizes.width / sizes.height;
		camera.updateProjectionMatrix();

		// Update rendererer
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
		console.log('window resize');
	});

	window.addEventListener('dblclick', () => {
		console.log('双击了');
		/* 双击全屏 */
		// if (!document.fullscreenElement) {
		// 	canvas.requestFullscreen();
		// } else {
		// 	document.exitFullscreen();
		// }
	});

	const controls = new OrbitControls(camera, canvas);
	controls.enableDamping = true;

	const tick = () => {
		// const elapsedTime = clock.getElapsedTime();

		// group.rotation.x = elapsedTime;
		// group.rotation.y = elapsedTime;

		// group.position.x = Math.cos(elapsedTime) * 2
		// group.position.y = Math.sin(elapsedTime) * 2
		// camera.position.x = Math.cos(elapsedTime) * 2;
		// camera.position.y = Math.sin(elapsedTime) * 2;
		// camera.position.z = elapsedTime;
		// camera.lookAt(group.position);
		// camera.position.x = cursor.x * 5;
		// camera.position.y = cursor.y * 5;
		// camera.position.x = Math.sin(cursor.x * Math.PI * 2);
		// camera.position.z = Math.cos(cursor.x * Math.PI * 2);
		// camera.position.y = cursor.y;

		// camera.lookAt(group.position);
		controls.update();

		renderer.render(scene, camera);

		window.requestAnimationFrame(tick);
	};
	tick();

	return {
		camera,
		renderer,
		gui
	};
};

export { initThree };
