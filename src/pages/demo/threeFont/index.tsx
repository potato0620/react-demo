import { useRef } from "react";
import { onMounted } from '@/hooks/utils'
import { initThree } from './three'
 

const ThreeFont: React.FC = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null)
	onMounted(() => {
		initThree(canvasEl.current as HTMLCanvasElement)
		return () => {
			console.log('unmount')
		}
	})
	return (
			<div>
			<canvas id='webgl' ref={canvasEl} className="w-full h-full" width={800} height={800}></canvas>
			</div>
	);
};

export default ThreeFont;
