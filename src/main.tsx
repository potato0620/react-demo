import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/index.scss';
import 'virtual:windi.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
let time = 0
let timer: NodeJS.Timeout

const handleLeave = () => {
	if (document.visibilityState === "visible") {
		time = 0;
		clearInterval(timer);
		console.log("页面已被切换到");
		document.title = "欢迎回来~";
	} else {
		console.log("页面已被切换出去");
		 timer = setInterval(() => {
			 document.title = `你已经离开了：${time}s`;
			 time++
		}, 1000);
	}
}

document.addEventListener("visibilitychange",handleLeave);
