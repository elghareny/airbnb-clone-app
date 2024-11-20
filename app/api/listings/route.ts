/** @format */

import getCurrentUser from "@/app/actions/getCurrentUser";
import {NextResponse} from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();
	const {
		title,
		description,
		category,
		roomCount,
		guestCount,
		bathroomCount,
		imageSrc,
		price,
		location,
	} = body;

	Object.keys(body).forEach((key) => {
		if (!body[key]) {
			NextResponse.error();
		}
	});

	const listing = await prisma.listing.create({
		data: {
			title,
			description,
			category,
			roomCount,
			guestCount,
			bathroomCount,
			imageSrc,
			price: parseInt(price, 10),
			locationValue: location.value,
			userId: currentUser.id,
		},
	});

	return NextResponse.json(listing);
}
