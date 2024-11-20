/** @format */

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import {TSafeListing, TSafeUser} from "../types/index";
interface IProps {
	favoritesListings: TSafeListing[];
	currentUser?: TSafeUser | null;
}

const FavoritesClient: React.FC<IProps> = ({
	favoritesListings,
	currentUser,
}) => {
	return (
		<Container>
			<Heading
				title='Favorites'
				subtitle="List of places you've favorited!"
			/>
			<div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6'>
				{favoritesListings.map((favoritesListing) => (
					<ListingCard
						key={favoritesListing.id}
						data={favoritesListing}
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
};

export default FavoritesClient;
