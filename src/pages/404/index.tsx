import { useRouteError } from 'react-router-dom';
import './index.scss';

export default function ErrorPage() {
	const error: any = useRouteError();
	return (
		<div id="error-page" className='w-full h-100vh'>
			<h1 className='text-[tomato] text-5rem'>Oh shit !</h1>
			<p>404 not found !</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}
