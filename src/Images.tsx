import React, {useEffect, useState} from 'react'
import {useQuery, UseQueryResult} from 'react-query'

// interface Variables {
// 		images: string;
// 		setImages: React.Dispatch<React.SetStateAction<string>>;

// }
const Images:React.FC = ()=>{
	const { Configuration, OpenAIApi } = require("openai");

	const configuration = new Configuration({
	});

	const openai = new OpenAIApi(configuration);

const { data, isLoading, error }:UseQueryResult<any[], Error> = useQuery<any[], Error>('images', async () => {
		const response = await openai.createImage({
		prompt: 'Car parking',
		n: 2,
		size: "1024x1024",
		});
		console.log(response.data.data);
		return response.data.data
}, {
	enabled: true,
	refetchOnWindowFocus: false,
	keepPreviousData:true,
});

if (isLoading) return <div>Loading...</div>
if (error) return <div>Error: {error.message}</div>

return (
	<div>
		{data?.map((image:any, index: number) => (
			<img key={index} src={image.url} alt="genimage"/>
		))}
	</div>
)
}

export default Images;