/** @format */

"use client";

import useCountries from "@/app/hooks/useCountries";
import {TSafeUser} from "@/app/types";
import {IconType} from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), {ssr: false});

interface IProps {
	user: TSafeUser;
	category:
		| {
				icon: IconType;
				label: string;
				description: string;
		  }
		| undefined;
	description: string;
	roomCount: number;
	guestCount: number;
	bathroomCount: number;
	locationValue: string;
}

const ListingInfo: React.FC<IProps> = ({
	user,
	category,
	description,
	roomCount,
	guestCount,
	bathroomCount,
	locationValue,
}) => {
	const {getCountryByValue} = useCountries();

	const location = getCountryByValue(locationValue);
	return (
		<div className='col-span-4 flex flex-col gap-4'>
			<div className='flex flex-col gap-2'>
				<div className='text-xl font-semibold flex flex-row items-center gap-2'>
					<div>Hosted by {user?.name}</div>
					<Avatar src={user?.image} />
				</div>
				<div className='flex items-center gap-2 font-light text-neutral-500'>
					<div>{guestCount} guests</div>
					<div>{roomCount} rooms</div>
					<div>{bathroomCount} bathrooms</div>
				</div>
			</div>
			<hr />
			{category && (
				<ListingCategory
					icon={category.icon}
					label={category.label}
					description={category.description}
				/>
			)}
			<hr />
			<div className='text-lg font-light text-neutral-500'>{description}</div>
			<hr />
			<Map
				center={location?.latlng}
				locationLabel={location?.label}
				locationRegion={location?.region}
			/>
		</div>
	);
};

export default ListingInfo;
