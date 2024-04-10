import { useRef } from "react";
import { onMounted } from '@/hooks/utils'

const webGL: React.FC = () => {
	const caEl = useRef<HTMLCanvasElement>(null)
	onMounted(() => {
		console.log(caEl.current)
		return () => {
			console.log('unmount')
		}
	})
	return (
			<div>
				<canvas id='webgl' ref={caEl}  className="w-full h-full"></canvas>
			</div>
	);
};

export default webGL;
