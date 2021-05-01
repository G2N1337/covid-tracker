import { useRouter } from 'next/router';
import styled from 'styled-components';
import CardBox from '../components/CardBox';
import CardInfo from '../components/CardInfo';
import Link from 'next/link';
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
const BoxWrapper = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	flex-basis: 3em;
`;

const AText = styled.div`
	background-color: #223;
	width: 100%;
	color: white;
`;
export default function SlugPage({ data }) {
	const router = useRouter();
	const short = data.Countries.filter((item) =>
		item.Slug.includes(router.query.slug)
	)[0];

	return (
		<div>
			<Link href='/'>
				<AText style={{ backgroundColor: '#223' }}>Go Back</AText>
			</Link>
			<MainBanner>
				<h1>Info about {short.Country}</h1>
			</MainBanner>{' '}
			<BoxWrapper>
				<CardInfo name={'Total Deaths'} data={short.TotalDeaths}></CardInfo>
				<CardInfo
					name={'Total Recovered'}
					data={short.TotalRecovered}
				></CardInfo>
				<br />
				<CardInfo name={'Total Cases'} data={short.TotalConfirmed}></CardInfo>
				<CardInfo name={'Today Deaths'} data={short.NewDeaths}></CardInfo>
				<CardInfo name={'Today Recovered'} data={short.NewRecovered}></CardInfo>
				<CardInfo name={'Today Cases'} data={short.NewConfirmed}></CardInfo>
			</BoxWrapper>
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
