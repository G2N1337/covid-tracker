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
	width: 275px;
	height: 50px;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
	border-radius: 1.3rem;
	padding: 0.6rem 1.5rem;
	margin: 2em;
`;

const MegaDiv = styled.div`
	display: flex;
	flex-direction: column;
	padding-right: 30px;
	padding-left: 30px;
	align-items: center;
	justify-content: center;
`;
const Switch = styled.div`
	display: flex;
	flex-direction: column;
`;
export default function MainPage({ data }) {
	const [search, setSearch] = useState('');
	const router = useRouter();
	return (
		<MainPageStyles>
			<MainBanner>
				<h1 style={{ fontSize: '5rem' }}>COVID TRACKER</h1>

				<BannerRow>
					<>
						<MegaDiv>
							<h2>Today's Cases</h2>
							<Paragraph>{data.Global.NewConfirmed}</Paragraph>
						</MegaDiv>
						<MegaDiv>
							<h2>Today's Deaths</h2>
							<Paragraph>{data.Global.NewDeaths}</Paragraph>
						</MegaDiv>
						<MegaDiv>
							<h2>Today's Recovered</h2>
							<Paragraph>{data.Global.NewRecovered}</Paragraph>
						</MegaDiv>
					</>
					<>
						<MegaDiv>
							<h2>Total Cases</h2>
							<Paragraph>{data.Global.TotalConfirmed}</Paragraph>
						</MegaDiv>
						<MegaDiv>
							<h2>Total Deaths</h2>
							<Paragraph>{data.Global.TotalDeaths}</Paragraph>
						</MegaDiv>
						<MegaDiv>
							<h2>Totals Recovered</h2>
							<Paragraph>{data.Global.TotalRecovered}</Paragraph>
						</MegaDiv>
					</>
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
