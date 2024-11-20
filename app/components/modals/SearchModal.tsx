/** @format */
"use client";

import qs from "query-string";
import useSearchModal from "@/app/hooks/useSearchModal";
import React, {useCallback, useMemo, useState} from "react";
import Modal from "./Modal";
import {useRouter, useSearchParams} from "next/navigation";
import {TCountrySelectValue} from "../inputs/CountrySelect";
import {Range} from "react-date-range";
import dynamic from "next/dynamic";
import {formatISO} from "date-fns";
import Heading from "../Heading";
import CountrySelect from "../inputs/CountrySelect";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
	LOCATION = 0,
	DATE = 1,
	INFO = 2,
}
const SearchModal = () => {
	const router = useRouter();
	const params = useSearchParams();
	const searchModal = useSearchModal();

	const [location, setLocation] = useState<TCountrySelectValue>();
	const [step, setStep] = useState(STEPS.LOCATION);
	const [guestCount, setGuestCount] = useState(1);
	const [roomCount, setRoomCount] = useState(1);
	const [bathroomCount, setBathroomCount] = useState(1);
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	const Map = useMemo(
		() =>
			dynamic(() => import("../Map"), {
				ssr: false,
			}),
		[location],
	);

	const onBack = useCallback(() => {
		setStep((prevStep) => prevStep - 1);
	}, []);
	const onNext = useCallback(() => {
		setStep((prevStep) => prevStep + 1);
	}, []);

	const onSubmit = useCallback(() => {
		if (step !== STEPS.INFO) {
			return onNext();
		}

		let currentQuery = {};

		if (params) {
			currentQuery = qs.parse(params.toString());
		}

		const updatedQuery = {
			...currentQuery,
			locationValue: location?.value,
			guestCount,
			roomCount,
			bathroomCount,
		};

		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate);
		}

		if (dateRange.endDate) {
			updatedQuery.endDate = formatISO(dateRange.endDate);
		}

		const url = qs.stringifyUrl(
			{
				url: "/",
				query: updatedQuery,
			},
			{
				skipNull: true,
			},
		);

		setStep(STEPS.LOCATION);
		searchModal.onClose();
		router.push(url);
	}, [
		router,
		params,
		onNext,
		step,
		searchModal,
		location,
		guestCount,
		roomCount,
		bathroomCount,
		dateRange,
	]);

	const actionLabel = useMemo(() => {
		if (step === STEPS.INFO) {
			return "Search";
		}
		return "Next";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.LOCATION) {
			return undefined;
		}
		return "Back";
	}, [step]);

	// RENDER

	let bodyContent = (
		<div className='flex flex-col gap-4'>
			<Heading
				title='Where do you wanna go?'
				subtitle='Find the perfect location!'
			/>
			<CountrySelect
				value={location}
				onChange={(value) => setLocation(value as TCountrySelectValue)}
			/>
			<hr />
			<Map
				center={location?.latlng}
				locationLabel={location?.label}
				locationRegion={location?.region}
			/>
		</div>
	);

	if (step === STEPS.DATE) {
		bodyContent = (
			<div className='flex flex-col gap-4'>
				<Heading
					title='When do you plan to go?'
					subtitle='Make sure everyone is free!'
				/>
				<Calendar
					value={dateRange}
					onChange={(value) => setDateRange(value.selection)}
				/>
			</div>
		);
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className='flex flex-col gap-4'>
				<Heading
					title='More information'
					subtitle='Find your perfect place!'
				/>
				<Counter
					title='Guests'
					subtitle='How many guests are coming?'
					value={guestCount}
					onChange={(value) => setGuestCount(value)}
				/>
				<Counter
					title='Rooms'
					subtitle='How many rooms do yor need?'
					value={roomCount}
					onChange={(value) => setRoomCount(value)}
				/>
				<Counter
					title='Bathrooms'
					subtitle='How many bathrooms do yor need?'
					value={bathroomCount}
					onChange={(value) => setBathroomCount(value)}
				/>
			</div>
		);
	}

	return (
		<Modal
			isOpen={searchModal.isOpen}
			onClose={searchModal.onClose}
			onSubmit={onSubmit}
			title='Filters'
			actionLabel={actionLabel}
			secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
			secondaryActionLabel={secondaryActionLabel}
			body={bodyContent}
		/>
	);
};

export default SearchModal;
