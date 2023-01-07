import React, {useState} from 'react'
import {useQuery, UseQueryResult} from 'react-query';
import styled from 'styled-components';



const Images:React.FC = ()=>{
const [inputValue, setInputValue] = useState<string | undefined>();

	const { Configuration, OpenAIApi } = require("openai");

	const configuration = new Configuration({
				apiKey: process.env.REACT_APP_OPENAI_API_KEY
	});

	const openai = new OpenAIApi(configuration);

const { data, isLoading, error }:UseQueryResult<any[], Error> = useQuery<any[], Error>('images', fetchImages,{
	enabled: false,
});

async function fetchImages(value:any):Promise<any[]>{
	console.log("second" ,value)
	const response = await openai.createImage({
		prompt: value,
		n: 2,
		size: "1024x1024",
		});
		return response.data.data
}


const handleSearch = (value:string | undefined)=>{
	console.log("first" ,value)
	fetchImages(value)
}

if (isLoading) return <div>Loading...</div>
if (error) return <div>Error: {error.message}</div>

return (
	<>
	<FormSearchbar>
		<input type="text" placeholder="Search for images" onChange={
			(e) => setInputValue(e.target.value)
		} />
		<button onClick={
			() => handleSearch(inputValue)
		}>Search</button>
</FormSearchbar>
	<div>
		{/* {data?.map((image:any, index: number) => (
			<img key={index} src={image.url} alt="genimage"/>
		))} */}
	</div>
	</>
)
}

export default Images;

const FormSearchbar = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 20px 0;
	input {
		width: 300px;
		height: 30px;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 0 10px;
	}
	button {
		width: 100px;
		height: 30px;
		border: 1px solid #ccc;
		border-radius: 5px;
		margin-left: 10px;
	}
`;