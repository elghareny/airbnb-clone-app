/** @format */

import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";
import {TSafeUser} from "../types";

const TripsPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState
					center
					title='Unauthorized'
					subtitle='Please login'
				/>
			</ClientOnly>
		);
	}

	const reservations = await getReservations({userId: currentUser.id});

	if (reservations.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					center
					title='No trips found'
					subtitle='Looks like you have not reserved any trips yet'
				/>
			</ClientOnly>
		);
	}
	return (
		<ClientOnly>
			<TripsClient
				reservations={reservations}
				currentUser={currentUser as TSafeUser}
			/>
		</ClientOnly>
	);
};

export default TripsPage;
