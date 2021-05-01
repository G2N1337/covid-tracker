import styled from 'styled-components';
import { useRouter } from 'next/router';

const InnerBox = styled.div`
	background-color: #344;
	width: 100%;
	display: flex;
	justify-content: center;
	border-radius: 25px 25px 0px 0px;
`;
const Box = styled.div`
	-webkit-box-shadow: 10px 10px 41px 6px rgba(0, 0, 0, 0.32);
	-moz-box-shadow: 10px 10px 41px 6px rgba(0, 0, 0, 0.32);
	box-shadow: 10px 10px 41px 6px rgba(0, 0, 0, 0.32);
	height: 300px;
	width: 300px;
	background-color: #223;
	color: #fff;
	margin: 43px;
	display: flex;
	align-items: center;
	flex-direction: column;
	border-radius: 25px;
	transition: 0.2s ease;
	:hover {
		transform: scale(1.03);
	}
`;
const CenterDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
export default function CardBox({ name, data }) {
	const router = useRouter();

	return (
		<Box>
			<InnerBox>
				<h1>{name}</h1>
			</InnerBox>
			<CenterDiv>
				<p style={{ fontSize: '4rem' }}>{data}</p>
			</CenterDiv>
		</Box>
	);
}
