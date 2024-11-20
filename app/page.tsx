/** @format */

import getCurrentUser from "./actions/getCurrentUser";
import getListings, {IListingParams} from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import {TSafeUser} from "./types";

interface IProps {
	searchParams: IListingParams;
}
const Home = async ({searchParams}: IProps) => {
	const listings = await getListings(searchParams);
	const currentUser = await getCurrentUser();

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState showReset />
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<Container>
				<div className='pt-24 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
					{listings.map((listing) => (
						<ListingCard
							key={listing.id}
							currentUser={currentUser as TSafeUser}
							data={listing}
						/>
					))}
				</div>
			</Container>
		</ClientOnly>
	);
};

export default Home;
