import './index.scss';
export default function Test() {
	const flexItem = new Array(10).fill(undefined).map((_, index) => {
		return (
			<div className="item" key={index}>
				{index}
			</div>
		);
	});

	return (
		<>
			<div className="flex-wrapper">{flexItem}</div>
		</>
	);
}
