/** @format */

import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";

export default async function getFavoritesListings() {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) return [];
		const favorites = await prisma.listing.findMany({
			where: {
				id: {
					in: [...(currentUser.favoriteIds || [])],
				},
			},
		});

		const safeFavorites = favorites.map((favorite) => ({
			...favorite,
			createdAt: favorite.createdAt.toISOString(),
		}));

		return safeFavorites;
	} catch (error) {
		throw new Error(error);
	}
}
