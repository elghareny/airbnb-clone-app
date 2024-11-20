/** @format */

import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";
import {TSafeUser} from "../types";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
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

	const listings = await getListings({userId: currentUser.id});

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					center
					title='No properties found'
					subtitle='Looks like you have no properties.'
				/>
			</ClientOnly>
		);
	}
	return (
		<ClientOnly>
			<PropertiesClient
				listings={listings}
				currentUser={currentUser as TSafeUser}
			/>
		</ClientOnly>
	);
};

export default PropertiesPage;
