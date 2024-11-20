/** @format */
"use client";
import {IconType} from "react-icons";

interface IProps {
	icon: IconType;
	label: string;
	description: string;
}

const ListingCategory: React.FC<IProps> = ({
	icon: Icon,
	label,
	description,
}) => {
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-center gap-2'>
				<Icon
					size={40}
					className='text-neutral-600'
				/>
				<div className='flex flex-col'>
					<div className='text-lg font-semibold'>{label}</div>
					<div className='font-light text-neutral-500'>{description}</div>
				</div>
			</div>
		</div>
	);
};

export default ListingCategory;
