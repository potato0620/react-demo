import { useRef } from "react";
import { onMounted } from '@/hooks/utils'
import { initThree } from './three'

import './index.scss'

const webGL: React.FC = () => {
	const canvasEl = useRef<HTMLCanvasElement>(null)
	onMounted(() => {
		initThree(canvasEl.current as HTMLCanvasElement)

		return () => {
			console.log('unmount')
		}
	})
	return (
			<div onLoad={() => { console.log('load') }}>
			<canvas id='webgl' ref={canvasEl} className="w-full h-full" width={800} height={800}></canvas>
			</div>
	);
};

export default webGL;
