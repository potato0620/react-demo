import React, { useEffect } from 'react';
import './index.scss';

let canvasEl: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let startX = 0;
let startY = 0;
let left = 0;
let top = 0;
let isDrawing = false;

const initCanvans = () => {
	const canvas = document.getElementById('signaTurePad') as HTMLCanvasElement;
	canvasEl = canvas;
	context = canvas.getContext('2d')!;
	left = canvas.getBoundingClientRect().left;
	top = canvas.getBoundingClientRect().top;

	window.addEventListener('resize', () => {
		left = canvas.getBoundingClientRect().left;
		top = canvas.getBoundingClientRect().top;
	});
};

const drawLine = (
	context: CanvasRenderingContext2D,
	x1: number,
	y1: number,
	x2: number,
	y2: number
) => {
	context.beginPath();
	context.strokeStyle = 'tomato';
	context.lineWidth = 5;
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
	context.closePath();
};

const getNowSpace = (e: MouseEvent) => {
	const { clientX, clientY } = e;
	return {
		newX: clientX - left,
		newY: clientY - top,
	};
};

const canvasStart = (e: any) => {
	console.log('开始了');
	startX = e.clientX - left;
	startY = e.clientY - top;
	isDrawing = true;
};

const canvasMove = (e: any) => {
	// 开始创建一个路径
	if (isDrawing) {
		drawLine(
			context as CanvasRenderingContext2D,
			startX,
			startY,
			getNowSpace(e).newX,
			getNowSpace(e).newY
		);
		startX = getNowSpace(e).newX;
		startY = getNowSpace(e).newY;
	}
};

const canvasEnd = (e: any) => {
	console.log('结束了');
	if (isDrawing) {
		drawLine(
			context as CanvasRenderingContext2D,
			startX,
			startY,
			getNowSpace(e).newX,
			getNowSpace(e).newY
		);
		startX = 0;
		startY = 0;
	}
	isDrawing = false;
};

const clearCanvas = () => {
	context.clearRect(0, 0, canvasEl.width, canvasEl.height);
};

const SignaturePad: React.FC = () => {
	useEffect(() => {
		initCanvans();
		document.body.style.overflow = 'hidden';
		return () => {
			context = null as unknown as CanvasRenderingContext2D;
			document.body.style.overflow = 'auto';
		};
	}, []);

	return (
		<>
			<div className="canvas-wrapper bg-[#d3d0d0] mx-auto mt-10vh p-20px rounded-8px overflow-hidden">
				<header className="inline-flex justify-between w-1/1">
					<div>签名板</div>
					<div onClick={clearCanvas} className="cursor-pointer">
						清空
					</div>
				</header>
				<canvas
					id="signaTurePad"
					width={'500px'}
					height={'500px'}
					className="w-500px h-500px mx-auto  bg-light-100 rounded-8px mt-10px cursor-pointer"
					onMouseDown={canvasStart}
					onMouseMove={canvasMove}
					onMouseUp={canvasEnd}
					onMouseLeave={() => (isDrawing = false)}
				/>
			</div>
		</>
	);
};

export default SignaturePad;
