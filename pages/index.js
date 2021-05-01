import styled from 'styled-components';
import CardBox from '../components/CardBox';
import { useState } from 'react';
import { useRouter } from 'next/router';
const MainPageStyles = styled.div`
	display: flex;
	flex-direction: column;
`;
const BoxWrapper = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
`;
const Paragraph = styled.p`
	margin: 15px;
	font-size: 36px;
`;
const BannerRow = styled.div`
	display: flex;
	flex-direction: row;
`;
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

const InputStyle = styled.input`
	width: 250px;
	height: 50px;

	border-radius: 25px;
`;
export default function MainPage({ data }) {
	const [search, setSearch] = useState('');
	const router = useRouter();
	return (
		<MainPageStyles>
			<MainBanner>
				<h1>COVID TRACKER</h1>

				<BannerRow>
					<Paragraph style={{ margin: '15px' }}>
						{data.Global.TotalConfirmed}
					</Paragraph>
					<Paragraph style={{ margin: '15px' }}>
						{data.Global.TotalDeaths}
					</Paragraph>
				</BannerRow>
				<InputStyle
					type='text'
					value={search}
					onChange={(e) => setSearch(e.target.value.toLowerCase())}
					placeholder='type in to search through all countries'
				></InputStyle>
			</MainBanner>

			<BoxWrapper>
				{data.Countries.filter(
					(item) =>
						item.Country.toLowerCase().includes(search) ||
						item.CountryCode.toLowerCase().includes(search)
				).map((item) => (
					<CardBox name={item.Country} slug={item.Slug}></CardBox>
				))}
			</BoxWrapper>
		</MainPageStyles>
	);
}

export async function getStaticProps() {
	const res = await fetch('https://api.covid19api.com/summary');
	const data = await res.json();
	return {
		props: {
			data,
		},
	};
}
