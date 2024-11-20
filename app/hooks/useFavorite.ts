/** @format */

import {useRouter} from "next/navigation";
import {TSafeUser} from "../types";
import useLoginModal from "./useLoginModal";
import React, {useCallback, useMemo} from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface IUseFavorite {
	listingId: string;
	currentUser?: TSafeUser | null;
}

const useFavorite = ({listingId, currentUser}: IUseFavorite) => {
	const router = useRouter();
	const loginModal = useLoginModal();

	const hasFavorited = useMemo(() => {
		const list = currentUser?.favoriteIds || [];
		return list.includes(listingId);
	}, [listingId, currentUser]);

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			if (!currentUser) {
				return loginModal.onOpen();
			}

			try {
				let request;
				if (hasFavorited) {
					request = async () =>
						await axios.delete(`/api/favorites/${listingId}`);
				} else {
					request = async () => await axios.post(`/api/favorites/${listingId}`);
				}
				await request();
				router.refresh();
				toast.success("Success");
			} catch (e) {
				toast.error(`${"Something went wrong."}`);
			}
		},
		[loginModal, currentUser, hasFavorited, listingId, router],
	);

	return {hasFavorited, toggleFavorite};
};

export default useFavorite;
