/** @format */
"use client";
import useCountries from "@/app/hooks/useCountries";
import {TSafeListing, TSafeReservation, TSafeUser} from "@/app/types";
import {useRouter} from "next/navigation";
import React, {useCallback, useMemo} from "react";

import {format} from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface IProps {
	data: TSafeListing;
	reservation?: TSafeReservation;
	onAction?: (id: string) => void;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
	currentUser?: TSafeUser | null;
}
const ListingCard: React.FC<IProps> = ({
	data,
	currentUser,
	actionId = "",
	actionLabel,
	disabled,
	onAction,
	reservation,
}) => {
	const router = useRouter();

	const {getCountryByValue} = useCountries();

	const location = getCountryByValue(data.locationValue);

	const handelCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			if (disabled) {
				return;
			}
			onAction?.(actionId);
		},
		[onAction, actionId, disabled],
	);

	const price = useMemo(() => {
		if (reservation) {
			return reservation.totalPrice;
		}
		return data.price;
	}, [reservation, data.price]);

	const reservationDate = useMemo(() => {
		if (!reservation) {
			return null;
		}
		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);

		return `${format(start, "PP")} - ${format(end, "PP")}`;
	}, [reservation]);

	return (
		<div
			className='col-span-1 cursor-pointer group'
			onClick={() => router.push(`/listings/${data.id}`)}>
			<div className='flex flex-col gap-2 w-full'>
				<div className='aspect-square w-full relative overflow-hidden rounded-xl'>
					<Image
						fill
						alt='Listing'
						src={data.imageSrc}
						className='object-cover w-full h-full group-hover:scale-110 transition'
					/>
					<div className='absolute top-3 right-3'>
						<HeartButton
							listingId={data.id}
							currentUser={currentUser as TSafeUser}
						/>
					</div>
				</div>
				<div className='font-semibold text-lg'>
					{location?.region}, {location?.label}
				</div>
				<div className='font-light text-neutral-500'>
					{reservationDate || data.category}
				</div>
				<div className='flex items-center gap-1'>
					<div className='font-semibold'>$ {price}</div>
					{!reservation && <div className='font-light'>night</div>}
				</div>
				{onAction && actionLabel && (
					<Button
						disabled={disabled}
						small
						label={actionLabel}
						onClick={handelCancel}
					/>
				)}
			</div>
		</div>
	);
};

export default ListingCard;
