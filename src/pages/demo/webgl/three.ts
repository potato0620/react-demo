import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui';
import gsap from 'gsap';

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

	const TextureLoader = new THREE.TextureLoader(loadingManager)
	const	texture = TextureLoader.load('/public/imgs/StoneBricksSplitface001_COL_2K.jpg')
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
	texture.generateMipmaps = false
	texture.minFilter = THREE.NearestFilter
	// texture.minFilter = THREE.LinearFilter
	// texture.magFilter = THREE.NearestFilter

	

	
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

	scene.add(group);

	const cube1 = new THREE.Mesh(
		new THREE.SphereGeometry(1, 32, 32),
		new THREE.MeshBasicMaterial({
			map: texture,

		})
	);
	// cube1.position.x = -1.5;
	console.log(new THREE.SphereGeometry(1, 32, 32).attributes.uv);
	

	const cube2 = new THREE.Mesh(
		new THREE.BoxGeometry(2, 2, 2),
		new THREE.MeshBasicMaterial({
			map: texture,

		})
	);
	cube2.position.x = -3.5;

	const cube3 = new THREE.Mesh(
		new THREE.TorusGeometry(1, 0.35, 32, 100),
		new THREE.MeshBasicMaterial({
			map: texture,
		})
	);

	cube3.position.x = 3.5;

	const myGeometry = new THREE.BufferGeometry();

	const myVertices = new Float32Array([
		0,0,0, // First vertex
		0,1,0, // Second vertex
		1,0,0, // Third vertex
	]);

	const positionsArr = new THREE.BufferAttribute(myVertices, 3);
	myGeometry.setAttribute('position', positionsArr);

	const cube4 = new THREE.Mesh(
		myGeometry,
		new THREE.MeshBasicMaterial({
			color: 'red',
			wireframe: true,
		})
	)

	// cube4.position.x = 5.5

	group.add(cube1, cube2, cube3, cube4);

	// gui.add(group.position, 'x', -10, 10, 0.01);
	/* 添加控制UI debugUI */
	// const folder1 =  gui.addFolder('哈哈哈');
	gui.add(group.position, 'y').min(-10).max(10).step(0.001);
	gui.add(group.position, 'x').min(-10).max(10).step(0.001);
	gui.add(group.position, 'z').min(-10).max(10).step(0.001).name('z轴位置');
	gui.add(cube1, 'visible').name('是否显示cube1');
	gui.add(cube2, 'visible').name('是否显示cube2');
	gui.add(cube3, 'visible').name('是否显示cube3');
	gui.add(cube1.material, 'wireframe').name('cube1`s wireframe')
	gui.addColor(parameters, 'color').onChange(() => {
		cube1.material.color.set(parameters.color);
	}).name('cube1`s color')

	gui.add(parameters, 'spin')


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
	};
};

export { initThree };
