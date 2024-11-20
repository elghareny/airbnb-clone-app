/** @format */

"use client";

import useCountries from "@/app/hooks/useCountries";
import {TSafeUser} from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface IProps {
	title: string;
	imageSrc: string;
	locationValue: string;
	id: string;
	currentUser?: TSafeUser | null;
}

const ListingHead: React.FC<IProps> = ({
	title,
	imageSrc,
	locationValue,
	id,
	currentUser,
}) => {
	const {getCountryByValue} = useCountries();

	const location = getCountryByValue(locationValue);
	return (
		<>
			<Heading
				title={title}
				subtitle={`${location?.region}, ${location?.label}`}
			/>
			<div className='group w-full h-[75vh] overflow-hidden rounded-xl relative'>
				<Image
					alt='Image'
					src={imageSrc}
					fill
					className='object-cover w-full group-hover:scale-110 transition'
				/>
				<div className='absolute top-5 right-5'>
					<HeartButton
						listingId={id}
						currentUser={currentUser}
					/>
				</div>
			</div>
		</>
	);
};

export default ListingHead;
