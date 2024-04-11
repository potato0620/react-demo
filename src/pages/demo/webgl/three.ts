import * as THREE from 'three';
import gsap from 'gsap';

const initThree = (canvas: HTMLCanvasElement) => {
	const size = {
		width: 800,
		height: 800,
	};
	/* 创建一个场景 */
	const scene = new THREE.Scene();
	/* 创建一个对象 */
	const group = new THREE.Group(); /* 创建一个组 */

	scene.add(group);

	const cube1 = new THREE.Mesh(
		new THREE.BoxGeometry(3, 3, 3),
		new THREE.MeshBasicMaterial({
			color: 'tomato',
		})
	);
	// cube1.position.x = -1.5;

	const cube2 = new THREE.Mesh(
		new THREE.BoxGeometry(2, 2, 2),
		new THREE.MeshBasicMaterial({
			color: 'red',
		})
	);
	cube2.position.x = 1.5;

	const cube3 = new THREE.Mesh(
		new THREE.BoxGeometry(1, 1, 1),
		new THREE.MeshBasicMaterial({
			color: 'skyblue',
		})
	);

	cube3.position.x = 2.5;

	group.add(cube1, cube2, cube3);

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
	const Axes = new THREE.AxesHelper(2);
	// scene.add(mesh);
	scene.add(Axes);

	// const aspectRatio = size.width / size.height;

	/* 创建一个透视相机 */
	const camera = new THREE.PerspectiveCamera(
		75,
		size.width / size.height,
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

	const render = new THREE.WebGLRenderer({
		canvas: canvas,
	});

	render.setSize(window.innerWidth, window.innerHeight);

	render.render(scene, camera);
	const clock = new THREE.Clock();

	// gsap.to(group.position, { duration: 1, delay: 1, x: 2, y: 5 });

	const cursor = {
		x: 0,
		y: 0,
	};
	/* 添加控制器 */
	window.addEventListener('mousemove', (e) => {
		cursor.x = e.clientX / size.width - 0.5;
		cursor.y = -(e.clientY / size.height - 0.5);
		// console.log(e.clientX, e.clientY);
	});

	const tick = () => {
		const elapsedTime = clock.getElapsedTime();

		group.rotation.x = elapsedTime;
		group.rotation.y = elapsedTime;

		// group.position.x = Math.cos(elapsedTime) * 2
		// group.position.y = Math.sin(elapsedTime) * 2
		// camera.position.x = Math.cos(elapsedTime) * 2;
		// camera.position.y = Math.sin(elapsedTime) * 2;
		// camera.position.z = elapsedTime;
		// camera.lookAt(group.position);
		camera.position.x = cursor.x;
		camera.position.y = cursor.y;

		render.render(scene, camera);

		window.requestAnimationFrame(tick);
	};
	tick();

	return {
		camera,
		render,
	};
};

export { initThree };
