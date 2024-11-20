/** @format */

import {NextResponse} from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import {TSafeUser} from "@/app/types";

interface IParams {
	listingId?: string;
}

export async function POST(request: Request, {params}: {params: IParams}) {
	const currentUser = (await getCurrentUser()) as TSafeUser;
	if (!currentUser) {
		return NextResponse.error();
	}

	const {listingId} = params;

	if (!listingId || typeof listingId !== "string") {
		throw new Error("Invalid ID");
	}

	const favoriteIds = [...(currentUser?.favoriteIds || [])];

	favoriteIds.push(listingId);

	let response;

	const user = await prisma.user
		.update({
			where: {id: currentUser.id},
			data: {
				favoriteIds,
			},
		})
		.then(() => {
			response = NextResponse.json(user);
		})
		.catch(() => {
			response = NextResponse.error();
		});

	return response;
}

export async function DELETE(request: Request, {params}: {params: IParams}) {
	const currentUser = (await getCurrentUser()) as TSafeUser;
	if (!currentUser) {
		return NextResponse.error();
	}

	const {listingId} = params;

	if (!listingId || typeof listingId !== "string") {
		throw new Error("Invalid ID");
	}

	let favoriteIds = [...(currentUser?.favoriteIds || [])];

	favoriteIds = favoriteIds.filter((id) => id !== listingId);

	const user = await prisma.user.update({
		where: {id: currentUser.id},
		data: {
			favoriteIds,
		},
	});

	return NextResponse.json(user);
}
