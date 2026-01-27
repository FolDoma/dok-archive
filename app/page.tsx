'use client'

import { useEffect, useState } from 'react';
import AlbumPreview from "../components/AlbumPreview";
import { ScrollShadow } from "@heroui/react";
import { SiInstagram } from "react-icons/si";
import { SiFacebook } from "react-icons/si";

export default function Home() {

	const [data, setData] = useState([]);

	useEffect(() => {
		fetch('/api/fetchSheets')
			.then(res => res.json())
			.then(json => {
				const data = json.data.map((row: { url: string }) => row.url);
				setData(data);
			})
			.catch(err => console.error(err));
	}, []);

	return (
		<div className="h-dvh w-full flex flex-col items-center">
			<div className='text-2xl font-semibold text-center p-6 flex space-x-4'>
				<div>Jedlik DÖK arhív</div>
				<a href='https://www.instagram.com/jedlikdok/' target='_blank' className='self-center'><SiInstagram className='w-6 h-6'/></a>
				<a href='https://www.facebook.com/jedlik.dok 'target='_blank' className='self-center'><SiFacebook className='w-6 h-6'/></a>
			</div>
			<ScrollShadow hideScrollBar className="pb-5">
				<div className='flex flex-col space-y-2 self-center md:grid md:grid-cols-2 md:gap-2 md:space-y-0 md:w-screen p-2'>
					{data.map((item, index) => (
						<div className="max-w-lg w-full odd:md:justify-self-end" key={index} >
							<AlbumPreview url={item} />
						</div>
					))}
				</div>
			</ScrollShadow>
			<a href='https://www.instagram.com/foldoma/' className='p-1 text-[8px] text-text-lighter absolute bottom-0'>Made by FolDoma</a>
		</div>
	);
}

