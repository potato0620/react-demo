import './index.scss';
export default function Home() {
	const flexItem = new Array(10).fill(undefined).map((_, index) => {
		return (
			<div className="item text-3xl font-bold underline" key={index}>
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
