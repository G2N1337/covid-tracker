import { useRouter } from 'next/router';
import styled from 'styled-components';

const MainBanner = styled.div`
	height: 450px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: #fff;
	background-color: #223;
	-webkit-box-shadow: 10px 10px 41px 6px rgba(0, 0, 0, 0.32);
	-moz-box-shadow: 10px 10px 41px 6px rgba(0, 0, 0, 0.32);
	box-shadow: 10px 10px 41px 6px rgba(0, 0, 0, 0.32);
`;
export default function SlugPage({ data }) {
	const router = useRouter();
	const short = data.Countries.filter((item) =>
		item.Slug.includes(router.query.slug)
	)[0];
	console.log(
		data.Countries.filter((item) => item.Slug.includes(router.query.slug))[0]
			.Country
	);
	return (
		<div>
			<MainBanner>
				<h1>Info about {short.Country}</h1>
			</MainBanner>
		</div>
	);
}

export async function getServerSideProps() {
	const res = await fetch('https://api.covid19api.com/summary');
	const data = await res.json();
	return {
		props: {
			data,
		},
	};
}
