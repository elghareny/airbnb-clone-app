/** @format */

import React from "react";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import getReservations from "../actions/getReservations";
import getCurrentUser from "../actions/getCurrentUser";
import {TSafeUser} from "../types";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
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

	const reservations = await getReservations({authorId: currentUser.id});

	if (reservations.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					center
					title='No reservations found'
					subtitle='Looks like you have not reservations on your properties'
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<ReservationsClient
				reservations={reservations}
				currentUser={currentUser as TSafeUser}
			/>
		</ClientOnly>
	);
};

export default ReservationsPage;
