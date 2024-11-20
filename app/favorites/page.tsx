/** @format */

import React from "react";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoritesListings from "../actions/getFavoritesListings";
import {TSafeUser} from "../types";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
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

	const favoritesListings = await getFavoritesListings();

	if (favoritesListings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					center
					title='No favorites found'
					subtitle='Looks like you have no favorites listings.'
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<FavoritesClient
				favoritesListings={favoritesListings}
				currentUser={currentUser as TSafeUser}
			/>
		</ClientOnly>
	);
};

export default FavoritesPage;
