import { useRef } from "react";
import { onMounted, onBeforeUnmount} from '@/hooks/utils'
import { initThree } from './three'
import type { Dat } from './three'
import './index.scss'



const webGL: React.FC = () => {
	const canvasEl = useRef<HTMLCanvasElement>(null)
	let guiel: Dat

	onMounted(() => {
		const { gui } = initThree(canvasEl.current as HTMLCanvasElement)
		guiel = gui
	})
	onBeforeUnmount(() => {
		guiel.hide()
	})
	return (
			<div>
			<canvas id='webgl' ref={canvasEl} className="w-full h-full" width={800} height={800}></canvas>
			</div>
	);
};

export default webGL;
