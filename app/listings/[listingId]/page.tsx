/** @format */

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import {TSafeListing, TSafeUser} from "@/app/types";
import getReservations from "@/app/actions/getReservations";

interface IParams {
	listingId?: string;
}
const ListingPage = async ({params}: {params: IParams}) => {
	const listing = await getListingById(params);
	const reservations = await getReservations(params);
	const currentUser = await getCurrentUser();

	if (!listing) {
		return (
			<ClientOnly>
				<EmptyState center />
			</ClientOnly>
		);
	}
	return (
		<ClientOnly>
			<ListingClient
				listing={
					listing as TSafeListing & {
						user: TSafeUser;
					}
				}
				reservations={reservations}
				currentUser={currentUser as TSafeUser}
			/>
		</ClientOnly>
	);
};

export default ListingPage;
